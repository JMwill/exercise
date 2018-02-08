/**
 * 问题：
 * Given a string, find the length of the longest substring without repeating characters.
 *
 * 例子：
 * Given "abcabcbb", the answer is "abc", which the length is 3.
 * Given "bbbbb", the answer is "b", with the length of 1.
 * Given "pwwkew", the answer is "wke", with the length of 3. Note that the answer must be a substring, "pwke" is a subsequence and not a substring.
 *
 * 这个问题的解决可以使用暴力搜索，一个一个地遍历所有字符，实际的复杂度会达到 n 的 3 次方。
 * 而这种问题一般是通过滑动窗口来解决，所谓的滑动窗口也就是在最开始时，有两个位置标识 i，j
 * 两者相等，程序运行时，j 先增加，增加后检查所属范围内的内容是否重复，如果不重复则继续递增
 * 如果重复，则可以得出即使是最开始的 i 所处位置的内容跟 j 所处位置的内容相同，两者同时向远处
 * 移动也不会错过最大子串，因此将两者同时增加一，这个过程就像窗口滑动一样。
 * 滑动窗口算法适合使用于字符串以及数组等序列形式的数据中。
 */

var isRepeat = function(data) {
    let storage = new Set(data || '')
    return storage.size != data.length
  }

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let i = j = 0;
  let longest = 0
  while (j < s.length) {
    if (isRepeat(s.slice(i, j))) {
      i++
      j++
    } else {
      j++
    }
  }
  if (isRepeat(s.slice(i, j))) {
    j--
  }
  longest = j - i

  return longest
};

console.log(lengthOfLongestSubstring(process.argv[2]))
console.log(lengthOfLongestSubstring(process.argv[2]))
console.log(lengthOfLongestSubstring(process.argv[2]))