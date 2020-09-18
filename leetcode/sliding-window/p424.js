/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function(s, k) {
  const charCount = {};
  let l = 0, r = 0, maxCount = 0;
  while (r < s.length) {
    charCount[s[r]] = charCount[s[r]] ? charCount[s[r]] + 1 : 1
    maxCount = Math.max(charCount[s[r]], maxCount);

    if (r - l + 1 > maxCount + k) {
      charCount[s[l]] -= 1;
      l++;
    }
    r++;
  }
  return s.length - l;
};