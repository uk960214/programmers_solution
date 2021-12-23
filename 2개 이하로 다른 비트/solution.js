function solution(numbers) {
  return numbers.map((n) => getTarget(n));
}

const getTarget = (num) => {
  const bit = num.toString(2);
  if (bit[bit.length - 1] === '0') return num + 1;
  for (let i = bit.length - 1; i >= 0; i--) {
    if (bit[i] === '0')
      return parseInt(bit.slice(0, i) + '10' + bit.slice(i + 2), 2);
  }
  return parseInt('10' + bit.slice(1), 2);
};
