function solution(m, n, board) {
  // 2차원 배열로 쪼개기
  const boardArr = board.map((line) => line.split(''));
  return processRound(boardArr, m, n);
}

// 지울 블록이 없을 때까지 재귀적으로 리플레이
const processRound = (boardArr, m, n) => {
  // 지울 사각형을 왼쪽 위 블록 배열
  const list = getTarget(boardArr, m, n);
  // 지울 사각형이 없는 경우 재귀함수 종료 (베이스 케이스)
  if (list.length === 0) return countZeros(boardArr);
  // 지울 사각형 배열을 기반으로 지우고 새로 채운 보드 반환
  const newBoard = makeNewBoard(boardArr, list, m, n);
  // 재귀함수 호출
  return processRound(newBoard, m, n);
};

// 보드의 0의 갯수 계산
const countZeros = (arr) => {
  return arr.reduce(
    (count, line) => count + line.filter((b) => b === 0).length,
    0,
  );
};

// 지울 사각형 구하기
const getTarget = (arr, m, n) => {
  return arr.reduce((result, line, i, origin) => {
    // 마지막 줄은 시작점이 될 수 없음
    if (i < m - 1) {
      return [
        ...result,
        ...line
          .map((b, j) => {
            // 마지막 줄은 시작점이 될 수 없음
            if (j < n - 1) {
              // 우, 하, 우하의 블록이 0이 아닌 값으로 동일한 블록
              if (checkSquare(origin, i, j)) {
                return [i, j];
              }
            }
            return null; // 마지막 줄이거나 정사각형 아닌 경우 null 반환
          })
          .filter((c) => c), // 맵 함수는 모든 값 반환하므로 다시 한 번 필터
      ];
    } else return result;
  }, []);
};

const checkSquare = (arr, i, j) => {
  return (
    arr[i][j] !== 0 &&
    arr[i][j + 1] === arr[i][j] &&
    arr[i + 1][j] === arr[i][j] &&
    arr[i + 1][j + 1] === arr[i][j]
  );
};

const makeNewBoard = (board, list, m, n) => {
  const erased = list.reduce((arr, [i, j]) => {
    // 타겟 블록 기준 본인, 우, 하, 우하 블록을 0으로 변경
    arr[i][j] = 0;
    arr[i + 1][j] = 0;
    arr[i][j + 1] = 0;
    arr[i + 1][j + 1] = 0;
    return arr;
  }, board);

  return dropBlocks(erased, m, n); // 지운 블록을 다시 채워서 반환
};

const dropBlocks = (arr, m, n) => {
  const newArr = [...arr];
  for (let i = m - 1; i > 0; i--) {
    if (newArr[i].every((b) => b !== 0)) continue; // 해당 줄에 0 없으면 패스
    for (let j = 0; j < n; j++) {
      findReplace(newArr, i, j); // 값이 0이면 대체할 블록 찾기
    }
  }
  return newArr;
};

const findReplace = (arr, i, j) => {
  if (arr[i][j] === 0) {
    // 바로 윗 줄부터 역순으로 검사
    for (let k = i - 1; k >= 0; k--) {
      // 0 아닌 값을 찾으면 그 값을 내림
      if (arr[k][j] !== 0) {
        arr[i][j] = arr[k][j];
        arr[k][j] = 0;
        break;
      }
    }
  }
};
