/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
var longestOnes = function(A, K) {
  const len = A.length;
  let l = 0, r = 0, w = 0; // l = left index; r = right index; w = window size;
  let res = 0;

  while (r < len) {
    // 因为只有 右哨兵 位置为 0 时 w 有机会进一，所以收缩时也就最多在左哨兵处进一
    // 极限情况是右哨兵刚进一，此时 w > K，左哨兵步进到右哨兵的位置，值为 0，w 减一 == K，右哨兵步进一位，退出循环
    // 此时 r - l + 1 恰好等于 0
    if (A[r] === 0) {w++;} // 当右哨兵位置为 0 时扩展窗口
    while (w > K) {
      if (A[l] === 0) {w--;} // 当左哨兵位置为 0 时收缩窗口
      l++; // 左边步进，因为没有限制 l < r，所以会有 l > r，因此计算 r - l + 1 时可以得到 0
      // 因为有 A = [0, 0, 0]; K = 0 这种情况
    }
    res = Math.max(res, r - l + 1);
    r++; // 右边步进
  }
  return res;
};