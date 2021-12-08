function solution(s) {
  const repeatBinary = (string, count, zeros) => {
    const s = string;
    const nonZero = s.replace(/0/g, "");
    const del = s.length - nonZero.length;
    const newBinary = Number(nonZero.length).toString(2);
    return newBinary === "1"
      ? [count + 1, zeros + del]
      : repeatBinary(newBinary, count + 1, zeros + del);
  };
  return repeatBinary(s, 0, 0);
}
