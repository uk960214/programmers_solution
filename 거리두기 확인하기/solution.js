// 풀이법 출처: https://velog.io/@wlgns5376/Programers-Javascript-%EA%B1%B0%EB%A6%AC%EB%91%90%EA%B8%B0-%ED%99%95%EC%9D%B8%ED%95%98%EA%B8%B0-2021-%EC%B9%B4%EC%B9%B4%EC%98%A4-%EC%9D%B8%ED%84%B4%EC%89%BD

/* 
풀이의 핵심적인 개념은 각 자리를 기준으로 그 주변이 거리두기가 지켜지고 있는지를
확인한다는 점이다.
모든 좌석을 확인하면서 루프를 돌면서 아래를 확인한다:
1. 만약 좌석에 벽이 있으면 패스한다.
2. 만약 좌석에서 사람이 앉아 있다면, 상하좌우에 다른 사람이 하나라도 앉아 있으면
거리두기가 지켜지지 않음을 의미한다.
3. 만약 빈 좌석이라면, 상하좌우로 사람이 2인 이상 있다면 맨해튼 거리가 2 이하지만 사이에
벽이 없는 것이므로 거리두기가 지켜지지 않음을 의미한다.

만약 각 대기실에서 이 중 2, 3번 중 한 가지라도 지켜지지 않으면 대기실의 나머지 좌석은
확인할 필요 없이 거리두기가 지켜지지 않는 것이므로 every를 이용해 각 줄, 각 좌석에서
거리두기가 지켜지는 지를 확인한다.
*/

function solution(places) {
  // 각 대기실 순회
  return places.reduce((result, place) => {
    // 참조하기 용이하도록 2차원 배열로 변환
    const grid = place.map((line) => line.split(''));
    const stat = grid.every((line, i) =>
      line.every((seat, j) => {
        // 좌석 당 상태 확인
        // 사람인 경우 상하좌우에 사람이 없어야 함
        if (seat === 'P') return neighbors(grid, i, j).every((n) => n !== 'P');
        // 빈 자리인 경우 상하좌우에 사람이 2명 이상 없어야 함
        if (seat === 'O') {
          return neighbors(grid, i, j).filter((n) => n === 'P').length < 2;
        } else return true; // 벽인 경우 패스
      }),
    );
    return [...result, stat ? 1 : 0];
  }, []);
}

// 상하좌우 중 존재하는 좌표를 배열에 담아 반환
const neighbors = (grid, i, j) => {
  const arr = [];
  if (grid[i + 1]) arr.push(grid[i + 1][j]);
  if (grid[i][j + 1]) arr.push(grid[i][j + 1]);
  if (grid[i - 1]) arr.push(grid[i - 1][j]);
  if (grid[i][j - 1]) arr.push(grid[i][j - 1]);
  return arr;
};
