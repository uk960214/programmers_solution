function solution(s) {
  let answer = 0;
  const double = s + s;

  for (let i = 0; i < s.length; i++) {
    answer = isCorrectStr(double.slice(i, i + s.length)) ? answer + 1 : answer;
  }

  return answer;
}

const isCorrectStr = (s) => {
  const arr = [];
  const pair = { "{": "}", "[": "]", "(": ")" };
  for (let c of s) {
    if (c in pair) {
      arr.push(pair[c]);
    } else {
      let last = arr.pop();
      if (last !== c) return false;
    }
  }
  return arr.length === 0;
};
