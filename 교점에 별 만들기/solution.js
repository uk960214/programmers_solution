function solution(line) {
  const cross = getCross(line); // 모든 교점 구하기
  const newCross = getNewCross(cross); // 교점의 시작점을 [0, 0] 기준으로 이동

  const { width, length } = getSize(cross); // 양 극단의 교점 간 차이
  const graph = new Array(length).fill('.'.repeat(width)); // 빈 그래프

  return newCross
    .reduce((base, [x, y]) => {
      base[y] = base[y].slice(0, x) + '*' + base[y].slice(x + 1); // 교점의 값을 *로 치환
      return base;
    }, graph)
    .reverse();
}

// 평행
const isParallel = ([a, b, e], [c, d, f]) => {
  return a * d - b * c === 0;
};

// 교점 반환
const returnCross = ([a, b, e], [c, d, f]) => {
  // 평행이 아닌 경우에만 교점이 존재
  if (!isParallel([a, b, e], [c, d, f])) {
    return [
      (b * f - e * d) / (a * d - b * c),
      (e * c - a * f) / (a * d - b * c),
    ];
  } else return ['x', 'y']; // 임의의 문자열 x, y 반환, 숫자가 아니므로 다음 단계에서 걸러짐
};

// 모든 직선에 대해서 교점들 반환
const getCross = (line) => {
  return line.reduce((arr, l, i, origin) => {
    const allCross = origin.slice(i + 1).map((m) => returnCross(l, m)); // 나머지 변들과 교점
    // 정수인 교점만 필터
    const intCross = allCross.filter(
      (c) => Number.isInteger(c[0]) && Number.isInteger(c[1]),
    );
    return [...arr, ...intCross];
  }, []);
};

// 총 그려야 하는 면적
const getSize = (cross) => {
  const xs = cross.map((p) => p[0]);
  const ys = cross.map((p) => p[1]);

  // x, y의 최댓값과 최솟값의 차 + 1
  const width = Math.max(...xs) - Math.min(...xs) + 1;
  const length = Math.max(...ys) - Math.min(...ys) + 1;
  return { width, length };
};

// 모든 교점을 최하단, 최좌측의 교점이 각각 [0, 0]이 되도록 이동
const getNewCross = (cross) => {
  const xs = cross.map((p) => p[0]);
  const ys = cross.map((p) => p[1]);
  const xMove = -1 * Math.min(...xs);
  const yMove = -1 * Math.min(...ys);

  return cross.map(([x, y]) => {
    return [x + xMove, y + yMove];
  });
};
