/**
  * 680. 验证回文字符串 Ⅱ
  * 给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。
  */
// 判断是否是回文字符串，如果是返回空数组，如果不是，返回不匹配的位置
var checkPalindrome = function(s, low, high) {
  while (low < high) {
    if (s[low] !== s[high]) {
      return [low, high];
    }
    low++;
    high--;
  }
  return [];
}

var validPalindrome = function(s) {
  let c1 = checkPalindrome(s, 0, s.length - 1);
  if (
    c1.length
    && checkPalindrome(s, c1[0] + 1, c1[1]).length
    && checkPalindrome(s, c1[0], c1[1] - 1).length
  ) {
    return false;
  }
  return true;
};