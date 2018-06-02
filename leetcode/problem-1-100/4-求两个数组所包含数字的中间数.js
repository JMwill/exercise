/**
 * 问题：
 * There are two sorted arrays nums1 and nums2 of size m and n respectively.
 * Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).
 *
 * 例子：
 * Example 1:
 * nums1 = [1, 3]
 * nums2 = [2]
 *
 * The median is 2.0
 *
 * Example 2:
 * nums1 = [1, 2]
 * nums2 = [3, 4]
 *
 * The median is (2 + 3)/2 = 2.5
 */

var findMiddle = function(nums1, nums2) {

}

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
  const totalLength = nums1.length + nums2.length
  const isOdd = !!(totalLength % 2)
  const middle = Math.floor(totalLength / 2)
  let i = index1 = index2 = 0
  let result

  for (; i < middle; i++) {
    if (nums1[index1] < nums2[index2]) {
      index1++
      result = nums2[index2]
    } else {
      index2++
      result = nums1[index1]
    }
  }

  if (isOdd) {
    let next
    if (nums1[index1] > nums2[index2]) {
      next = nums2[index2 + 1] >= nums1[index1] ? nums2[index2 + 1] : nums1[index1 + 1]
    } else {
      next = nums1[index1 + 1] >= nums2[index2] ? nums1[index1 + 1] : nums2[index2 + 1]
    }
    result = (result + next) / 2
  }
  return result
};

console.log(findMedianSortedArrays([1, 3], [2]))