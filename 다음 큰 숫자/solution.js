function solution(n) {
  let answer = n + 1;
  while (binaryOnes(n) !== binaryOnes(answer)) answer++;
  return answer;
}

const binaryOnes = function countOfOnesInBinaryForm(a) {
  return a
    .toString(2)
    .split('')
    .reduce((a, c) => a + c * 1, 0);
};
