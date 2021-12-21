function solution(dirs) {
  let curr = [0, 0];
  const move = { U: [0, 1], D: [0, -1], R: [1, 0], L: [-1, 0] };
  // 방향 돌면서 길 저장
  const roads = dirs.split('').reduce((set, dir) => {
    const instruction = move[dir];
    // 새 좌표
    const newCurr = [curr[0] + instruction[0], curr[1] + instruction[1]];
    // 필드 범위 안에서만
    if (
      newCurr[0] <= 5 &&
      newCurr[0] >= -5 &&
      newCurr[1] <= 5 &&
      newCurr[1] >= -5
    ) {
      // 길에 대한 X,Y 좌표 각각 저장, 오름차순으로
      const xRoad =
        '' + Math.min(curr[0], newCurr[0]) + Math.max(curr[0], newCurr[0]);
      const yRoad =
        '' + Math.min(curr[1], newCurr[1]) + Math.max(curr[1], newCurr[1]);

      // 길을 세트에 저장 => 중복 없음
      set.add('' + xRoad + yRoad);
      curr = newCurr;
    }

    return set;
  }, new Set());

  return roads.size;
}
