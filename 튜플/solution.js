function solution(s) {
  var answer = [];
  const copyStr = s.slice(2, s.length - 2);
  const arr = copyStr.split("},{");
  const sorted = arr.sort((a, b) => a.length - b.length);
  const filtered = sorted.map((x, i) => {
    if (i > 0) {
      const prev = sorted[i - 1].split(",");
      const curr = x.split(",").filter((e) => !prev.includes(e));
      return curr[0];
    } else return x;
  });
  return filtered.map((x) => x * 1);
}
