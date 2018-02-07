/**
 * 问题：
 * Given an array of integers, return indices of the two numbers such that they add up to a specific target.
 * You may assume that each input would have exactly one solution, and you may not use the same element twice.
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  let temp, second, first = 0
  while (first < nums.length) {
    temp = nums[first]
    second = nums.indexOf(target - temp, first + 1)
    if (second > -1) {
      return [first, second]
    } else {
      first ++
    }
  }
  return []
}