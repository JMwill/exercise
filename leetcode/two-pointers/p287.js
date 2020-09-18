/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (nums[i] === nums[j]) return nums[i];
    }
  }
};

// 快慢指针，Floyd 判圈算法。具体解释：
// https://leetcode-cn.com/problems/find-the-duplicate-number/solution/xun-zhao-zhong-fu-shu-by-leetcode-solution/
var findDuplicate = function(nums) {
  let slow = 0, fast = 0;
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow != fast);
  slow = 0;
  while (slow != fast) {
    slow = nums[slow];
    fast = nums[fast];
  }
  return slow;
};

// 还有个二分法，因为题目的限制才成立。常数个存储空间，因为内部数字一定是 1 到 n
// 因此，取 1 到 n 的中间数，然后统计大于小于这个中间数的数字的个数，如果个数有异常
// 也就是小于中间数的个数不足小于中间数，则 大于的部分一定有重复数字。反之则小于的部分有重复数字
// 而后不断对对应部分二分则可以求得结果。