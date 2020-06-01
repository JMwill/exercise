/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
  const res = [];
  if (!nums.length) return res;
  let l = -1, r = k - 1;
  while (r < nums.length) {
    l++; r++;
    res.push(Math.max(...nums.slice(l, r)));
  }
  return res;
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
  const res = [];
  if (!nums.length) return res;
  let l = 0, r = k;
  res.push(Math.max(...nums.slice(l, r)));

  while (r < nums.length) {
    if (nums[l] === res[res.length - 1]) {
      res.push(Math.max(...nums.slice(l + 1, r + 1)))
    } else if (nums[r] > res[res.length - 1]) {
      res.push(nums[r]);
    } else {
      res.push(res[res.length - 1]);
    }
    r++;
    l++;
  }
  return res;
};