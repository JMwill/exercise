/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var check = function(m1, m2) {
  for (const key of m2.keys()) {
    if (!m1.has(key) || m1.get(key) < m2.get(key)) {
      return false;
    }
  }
  return true;
}
var strToMap = function(s) {
  // t string's char map
  const m = new Map();
  Array.from(s).forEach((c) => m.set(c, (m.get(c) || 0) + 1));
  return m;
}
var minWindow = function(s, t) {
  const tcm = strToMap(t); // 将子串映射成带有字符计数的 Map
  const scm = new Map(); // 用于装载检查的子串
  const len = s.length;
  let ansLen = Number.POSITIVE_INFINITY;
  let l = 0, r = -1; // 步进的左右指针，r 设定为 -1 是为了统一加一的操作
  let ansL = -1, ansR = -1; // 结果的左右指针

  while (r < len) {
    r++; // 扩大窗口
    if (r < len && tcm.has(s[r])) { // 检查是否目标字符，并加入计数
      scm.set(s[r], (scm.get(s[r]) || 0) + 1); // 将对应字符映射值加 1
    }
    while (check(scm, tcm) && l <= r) { // 检查是否已经包含子串且左右指针位置正确
      if (r - l + 1 < ansLen) { // 如果是更小的子串则替换现有的标记
        ansLen = r - l + 1;
        ansL = l;
        ansR = l + ansLen; // 不使用 r 加减计算，因为不够直观
      }
      if (tcm.has(s[l])) { // 如果当前左指针字符属于子串，则将字符映射值减 1
        scm.set(s[l], (scm.get(s[l]) || 0) - 1);
      }
      l++; // 收缩窗口
    }
  }
  return ansL < 0 ? '' : s.slice(ansL, ansR);
};