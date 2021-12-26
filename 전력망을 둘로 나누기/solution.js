function solution(n, wires) {
  return Math.min(
    ...wires.map((wire, i) => {
      // 모든 전선 끊는 경우 순회
      const twoTree = [...wires.slice(0, i), ...wires.slice(i + 1)];
      const withOne = countSeparation(twoTree); // 분리된 배열에서 1이 포함된 쪽의 수
      return Math.abs(n - 2 * withOne); // 1이 포함된 쪽과 아닌 쪽의 차
    }),
  );
}

const countSeparation = (arr) => {
  const withOne = [1];
  const stack = [1];

  while (stack.length !== 0) {
    const curr = stack.pop();
    const connections = arr
      // 현재 탑을 포함하는 방문하지 않은 탑 필터
      .filter((w) => w.includes(curr) && !w.every((t) => withOne.includes(t)))
      .map((w) => (w[0] !== curr ? w[0] : w[1]));

    // 찾은 탑은 1이 포함된 쪽
    connections.forEach((t) => {
      withOne.push(t);
      stack.push(t);
    });
  }
  return withOne.length;
};
