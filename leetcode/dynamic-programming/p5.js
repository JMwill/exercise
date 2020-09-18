/**
 * 中心扩展法
 * @param {string} s
 * @return {string}
 */
var expandFromCenter = function(s, l, r) {
  const len = s.length;
  // 从给定左右指针位置进行扩展，直到左右指针所指字符不相等
  while(l >= 0 && r < len && s[l] === s[r]) {
    l = l - 1;
    r = r + 1;
  }
  return [l + 1, r - 1]; // 返回前一次相等的位置
};

var longestPalindrome = function(s) {
  const len = s.length;
  let l = r = 0;
  if (!s || len < 1) return '';
  for (let i = 0; i < len; i++) {
    const [l1, r1] = expandFromCenter(s, i, i); // 以单个字符为中心进行扩展
    const [l2, r2] = expandFromCenter(s, i, i+1); // 以两个字符为中心进行扩展

    if (r1 - l1 > r - l) { // 判断新指针位置的字符串的长度，如果符合则修改
      l = l1; r = r1;
    }
    if (r2 - l2 > r - l) {
      l = l2; r = r2;
    }
  }

  return s.slice(l, r + 1);
};

/**
 * 动态规划法
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  const len = s.length
  // 新建一个二维数组用于存放对应指针位置是否是回文串的信息
  const dp = new Array(len).fill(0).map(() => (new Array(len).fill(false)))

  let j, result = '';
  for (let l = 0; l < len; l++) {
    for (let i = 0; i < len; i++) {
      j = i + l;
      if (j >= len) break;
      if (l === 0) { // 首次迭代当前字符即为回文串
        dp[i][j] = true;
      } else if (l === 1) { // 第二次迭代如果前后两个字符相当则为回文串
        dp[i][j] = (s[i] === s[j]);
      } else { // 后续迭代，如果前一次为回文串，则当次边界字符相等即为回文串
        dp[i][j] = (dp[i + 1][j - 1] && s[i] === s[j]);
      }
      if (dp[i][j] && l + 1 > result.length) { // 如果是回文串，则取第一次遇到的
        result = s.slice(i, j + 1);
      }
    }
  }
  return result;
};
