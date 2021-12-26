function solution(N, road, K) {
  return traverse(createRoads(road), K).length;
}

// 그래프 생성
const createRoads = (arr) => {
  return arr.reduce((list, [a, b, w]) => {
    if (!list[a]) list[a] = {};
    if (!list[b]) list[b] = {};
    // 동일한 두 도시를 연결하는 길 중 짧은 것만 저장
    list[a][b] = Math.min(w, list[a][b] || Infinity);
    list[b][a] = Math.min(w, list[b][a] || Infinity);
    return list;
  }, {});
};

const traverse = (roads, max) => {
  const map = { ...roads }; // 복사
  const queue = ['1']; // 시작점
  const mins = { 1: 0 }; // 1번에서 1번까지 거리는 0

  let town;

  while (queue.length) {
    town = queue.shift();
    const neighbors = map[town];
    Object.keys(neighbors).forEach((n) => {
      const duration = mins[town] + map[town][n];
      if (duration <= max) {
        // 걸리는 시간이 최대 가능 시간보다 적은 경우만 추가
        // 사용한 길 삭제, 양방향 중 일방향만, 추후 더 짧은 경로로 갈 수 있을 가능성 유지
        delete map[town][n];
        mins[n] = mins[n] ? Math.min(mins[n], duration) : duration;
        queue.push(n);
      }
    });
  }

  return Object.keys(mins);
};
