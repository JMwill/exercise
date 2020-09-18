/**
 * @param {number[]} customers
 * @param {number[]} grumpy
 * @param {number} X
 * @return {number}
 */
var maxSatisfied = function(customers, grumpy, X) {
  const len = customers.length;
  const cTotal = customers.reduce((acc, cur, i) => grumpy[i] === 0 ? acc + cur : acc, 0);
  let l = 0, r = X, additional = 0;

  while (r <= len) {
    additional = Math.max(additional, customers.slice(l, r).reduce((acc, cur, i) => grumpy[l + i] === 1 ? acc + cur : acc, 0));
    r++;
    l++;
  }
  return cTotal + additional;
};