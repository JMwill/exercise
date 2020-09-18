/**
 * 滑动窗口，通过 Set 来进行去重以及判断字符是否重复出现
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  const occ = new Set();
  const len = s.length;
  let rk = -1, ans = 0;

  for (let i = 0; i < len; i++) {
    if (i != 0) { occ.delete(s[i - 1]); } // 逐个删除

    // 当发现重复字符时无需找出重复字符位置
    // 只需要不断步进 i 来删除即可，不会进入 while 循环
    while (rk + 1 < len && !occ.has(s[rk + 1])) {
      occ.add(s[rk + 1]);
      rk += 1; // 只有字符不重复出现时 rk 才步进
    }
    ans = Math.max(ans, rk - i + 1);
  }
  return ans;
}