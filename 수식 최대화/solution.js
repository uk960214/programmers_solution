function solution(exp) {
  // 모든 순서 경우의 수
  const order = [
    ['*', '+', '-'],
    ['*', '-', '+'],
    ['+', '*', '-'],
    ['+', '-', '*'],
    ['-', '*', '+'],
    ['-', '+', '*'],
  ];

  // 수식을 배열로 쪼개기
  const arr = customSplit(exp);

  // 각 순서 가능성 맵
  const results = order.map((signs) => {
    return Math.abs(
      // 각 순서 별로 한 연산자씩 수식에서 모두 계산하고 결과 값의 절댓값 반환
      signs.reduce((result, sign) => calcOneSign(result, sign), arr)[0],
    );
  });

  // 최댓값 반환
  return Math.max(...results);
}

// 문자열로 주어진 연산자로 계산
const calc = (a, b, x) => {
  return x === '*' ? 1 * a * b : x === '+' ? 1 * a + 1 * b : 1 * a - 1 * b;
};

// 수식에 포함된 한 연산자 모두 계산하기 (앞에서부터)
const calcOneSign = (arr, sign) => {
  let result = [...arr];
  while (result.indexOf(sign) >= 0) {
    const i = result.indexOf(sign);
    const calcResult = calc(result[i - 1], result[i + 1], sign);
    result = [...result.slice(0, i - 1), calcResult, ...result.slice(i + 2)];
  }
  return result;
};

// 수식을 연산자, 피연산자로 구성된 배열로 자르기
const customSplit = (str) => {
  let temp = '';
  const arr = [];
  for (let c of str) {
    if (Number.isInteger(c * 1)) {
      temp += c;
    } else {
      arr.push(temp);
      arr.push(c);
      temp = '';
    }
  }
  arr.push(temp);
  return arr;
};
