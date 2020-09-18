var MaxQueue = function() {
  this.deque = [];
  this.queue = [];
};

/**
 * @return {number}
 */
MaxQueue.prototype.max_value = function() {
  return this.deque[0] || -1;
};

/**
 * @param {number} value
 * @return {void}
 */
MaxQueue.prototype.push_back = function(value) {
  const dq = this.deque;
  while (dq[dq.length - 1] && dq[dq.length - 1] < value) {
    dq.pop();
  }
  this.deque.push(value);
  this.queue.push(value);
};

/**
 * @return {number}
 */
MaxQueue.prototype.pop_front = function() {
  if (!this.queue.length) return -1;
  let res = this.queue.shift();
  if (res === this.deque[0]) {
    this.deque.shift();
  }
  return res;
};

/**
 * Your MaxQueue object will be instantiated and called as such:
 * var obj = new MaxQueue()
 * var param_1 = obj.max_value()
 * obj.push_back(value)
 * var param_3 = obj.pop_front()
 */