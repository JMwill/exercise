#!/usr/bin/env python
# -*- coding: utf-8 -*-
import hashlib
import json
import requests

from textwrap import dedent
from time import time
from uuid import uuid4
from flask import Flask, jsonify, request
from urllib.parse import urlparse

"""
Block look like:

block = {
  'index': 1,
  'timestamp': 1506057125.900785,
  'transactions': [
    {
      'sender': "8527147fe1f5426f9dd545de4b27ee00",
      'recipient': "a77f5cdfa2934df3954a5c7c7da5df1f",
      'amount': 5,
    }
  ],
  'proof': 324984774000,
  'previous_hash': "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
}
"""
class Blockchain(object):
  def __init__(self):
    self.chain = []
    self.current_transactions = []
    self.nodes = set()

    # 创建根区块
    self.new_block(previous_hash=1, proof=100)

  def new_block(self, proof, previous_hash):
    """在区块链中创建新的块

    :param proof: <int> proof 由工作量算法提供证明
    :param previous_hash: (Optional) <str> 前一个区块的 Hash 值
    :return: <dict> 新的区块
    """
    block = {
      'index': len(self.chain) + 1,
      'timestamp': time(),
      'transactions': self.current_transactions,
      'proof': proof,
      'previous_hash': previous_hash or self.hash(self.chain[-1]),
    }

    # 重置当前的事务列表
    self.current_transactions = []
    self.chain.append(block)

    return block

  def new_transaction(self, sender, recipient, amount):
    """创建新的事务到下一个开采区块中

    :param sender: <str> 发送者的地址
    :param recipient: <str> 接收者的地址
    :param amount: <int> 数量
    :return: <int> 拥有这次事物的区块的下标
    """
    self.current_transactions.append({
      'sender': sender,
      'recipient': recipient,
      'amount': amount,
    })

    return self.last_block['index'] + 1

  @property
  def last_block(self):
    return self.chain[-1]

  @staticmethod
  def hash(block):
    """创建区块的 SHA-256 类型的 hash 值

    :param block: <dict> Block
    :return: <str>
    """
    # 需要保证字典是有序的，否则得到的 hash 值会不一致
    block_string = json.dumps(block, sort_keys=True).encode()
    return hashlib.sha256(block_string).hexdigest()

  def proof_of_work(self, last_proof):
    """简单的工作量证明算法（PoW Algorithm）
      - 找一个数字 p` 进行哈希后得到的值 hash(pp`) 最前面包含有 4 个零，这里的 p 是前一个 p`
      - p 是前一个证明，而 p` 是新的证明

    :param last_proof: <int>
    :return: <int>
    """
    proof = 0
    while self.valid_proof(last_proof, proof) is False:
      proof += 1

    return proof

  @staticmethod
  def valid_proof(last_proof, proof):
    """验证证明：是否 hash(last_proof, proof) 最前面包含有 4 个零

    :param last_proof: <int> 前一个证明
    :param proof: <int> 当前的证明
    :return: <bool> 证明验证的结果
    """

    guess = '{last_proof}{proof}'.format(last_proof=last_proof, proof=proof).encode()
    guess_hash = hashlib.sha256(guess).hexdigest()
    return guess_hash[:4] == '0000'

  def register_node(self, address):
    """添加新的节点到节点列表里面去

    :params address: <str> 节点的地址。如：'http://192.168.0.5:5000'
    :return: None
    """
    parsed_url = urlparse(address)
    self.nodes.add(parsed_url.netloc)

  def valid_chain(self, chain):
    """确定给定的区块链是否有效

    :param chain: <list> 区块链
    :return: <bool> 是否有效
    """
    last_block = chain[0]
    current_index = 1

    while current_index < len(chain):
      block = chain[current_index]
      print(str(last_block))
      print(str(block))
      print('\n------------\n')

      # 检查区块的 hash 值是否正确
      if block['previous_hash'] != self.hash(last_block):
        return False

      # 检查工作量证明是否正确
      if not self.valid_proof(last_block['proof'], block['proof']):
        return False

      last_block = block
      current_index += 1

    return True

  def resolve_conflicts(self):
    """共识算法，通过用网络中最长的那个链条来替换
    我们的链来解决冲突

    :return: <bool> 如果链条被成功替换则返回 True，否则返回 False
    """
    neighbours = self.nodes
    new_chain = None

    # 只寻找比自己长的链条
    max_length = len(self.chain)

    # 抓住链条并从我们自己的网络中验证所有的节点
    for node in neighbours:
      response = requests.get('http://{node}/chain'.format(node=node))
      if response.status_code == 200:
        length = response.json()['length']
        chain = response.json()['chain']

        # 检查是否链条的长度更长而且链条是有效的
        if length > max_length and self.valid_chain(chain):
          max_length = length
          new_chain = chain


    # 如果发现新的有效而且长于我们的链则进行替换
    if new_chain:
      self.chain = new_chain
      return True

    return False

# 实例化节点
app = Flask(__name__)

# 为节点生成全局唯一地址
node_identifier = str(uuid4()).replace('-', '')

# 实例化区块链
blockchain = Blockchain()

@app.route('/mine', methods=['GET'])
def mine():
  # 运行工作量证明算法来获得下一个证明
  last_block = blockchain.last_block
  last_proof = last_block['proof']
  proof = blockchain.proof_of_work(last_proof)

  # 必须要接收一个报酬来搜寻证明
  # 发送者是 "0" 来表明这个节点在挖掘新的币
  blockchain.new_transaction(
    sender='0',
    recipient=node_identifier,
    amount=1,
  )

  # 锻造新的区块并添加到链中
  previous_hash = blockchain.hash(last_proof)
  block = blockchain.new_block(proof, previous_hash)

  response = {
    'message': 'New Block Forged',
    'index': block['index'],
    'transactions': block['transactions'],
    'proof': block['proof'],
    'previous_hash': block['previous_hash'],
  }

  return jsonify(response), 200

@app.route('/transactions/new', methods=['POST'])
def new_transaction():
  values = request.get_json()
  if not values:
    return 'post values is {values}'.format(values=values), 400

  # 校验是否需要的字段都在 POST 过来的数据中
  required = ['sender', 'recipient', 'amount']
  if not all(k in values for k in required):
    return 'Missing values', 400

  # 创建新的交易
  index = blockchain.new_transaction(values['sender'], values['recipient'], values['amount'])

  response = {'message': 'Transaction will be added to Block {index}'.format(index=index)}
  return jsonify(response), 201


@app.route('/chain', methods=['GET'])
def full_chain():
  response = {
    'chain': blockchain.chain,
    'length': len(blockchain.chain),
  }
  return jsonify(response), 200

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000)

@app.route('/nodes/register', methods=['POST'])
def register_nodes():
  values = request.get_json()

  nodes = values.get('nodes')
  if nodes is None:
    return 'Error: Please supply a valid list of nodes', 400

  for node in nodes:
    blockchain.register_node(node)

  response = {
    'message': 'New nodes have been added',
    'total_nodes': list(blockchain.nodes),
  }
  return jsonify(response), 201

@app.route('/nodes/resolve', methods=['GET'])
def consensus():
  replaced = blockchain.resolve_conflicts()

  if replaced:
    response = {
      'message': 'Our chain was replaced',
      'new_chain': blockchain.chain,
    }
  else:
    response = {
      'message': 'Our chain is authoritative',
      'chain': blockchain.chain,
    }

  return jsonify(response), 200