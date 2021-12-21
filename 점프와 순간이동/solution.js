function solution(n) {
  return n
    .toString(2)
    .split('')
    .reduce((a, c) => a + 1 * c, 0);
}
