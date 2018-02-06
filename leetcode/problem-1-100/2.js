/**
 * 问题：
 * You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.
 * You may assume the two numbers do not contain any leading zero, except the number 0 itself.
 *
 *
 * 例子：
 * Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
 * Output: 7 -> 0 -> 8
 * Explanation: 342 + 465 = 807.
 *
 *
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {Number} overflow
 * @return {Function} function (n1, n2)
 */
var calRemainderFactory = function(overflow) {
  overflow = overflow || 0
  return function(n1, n2) {
    n1 = n1 || 0
    n2 = n2 || 0
    let total = n1 + n2 + overflow
    overflow = Math.floor(total / 10)
    return total % 10
  }
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  let resultNode = new ListNode(0)
  let tmpNode = resultNode
  let calRemainder = calRemainderFactory(0)

  while (l1 && l2) {
    tmpNode.val = calRemainder(l1.val, l2.val)

    if (l1.next && l2.next) {
      tmpNode.next = new ListNode(0)
      tmpNode = tmpNode.next
    }

    l1 = l1.next
    l2 = l2.next
  }

  while (l1) {
    tmpNode.next = new ListNode(0)
    tmpNode = tmpNode.next
    tmpNode.val = calRemainder(l1.val)
    l1 = l1.next
  }

  while (l2) {
    tmpNode.next = new ListNode(0)
    tmpNode = tmpNode.next
    tmpNode.val = calRemainder(l2.val)
    l2 = l2.next
  }

  let lastRemainder = calRemainder(0)
  if (lastRemainder) {
    tmpNode.next = new ListNode(lastRemainder)
  }

  return resultNode
};

// 尝试解法二
/**
 * @param {Number} overflow
 * @return {Function} function (n1, n2)
 */
var calRemainderFactory = function(overflow) {
  overflow = overflow || 0
  return function(n1, n2) {
    n1 = n1 || 0
    n2 = n2 || 0
    let total = n1 + n2 + overflow
    overflow = Math.floor(total / 10)
    return total % 10
  }
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  let tmpL1 = l1
  let tmpL2 = l2
  let calRemainder = calRemainderFactory(0)

  // sum one by one
  while (tmpL1 && tmpL2) {
    tmpL1.val = tmpL1.val + tmpL2.val

    if (!tmpL1.next && tmpL2.next) {
      tmpL1.next = tmpL2.next
      break
    }
    tmpL1 = tmpL1.next
    tmpL2 = tmpL2.next
  }

  // calculate
  tmpL1 = l1
  while (tmpL1) {
    tmpL1.val = calRemainder(tmpL1.val)
    if (!tmpL1.next) { break }
    tmpL1 = tmpL1.next
  }

  let lastRemainder = calRemainder(0)
  if (lastRemainder) {
    tmpL1.next = new ListNode(lastRemainder)
  }

  return l1
}