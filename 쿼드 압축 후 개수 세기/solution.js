function solution(arr) {
  // 배열을 압축 후 0과 1 갯수 세기
  return zip(arr).reduce(
    (result, e) => {
      e === 0 ? result[0]++ : result[1]++;
      return result;
    },
    [0, 0],
  );
}

// 정사각형 배열을 4개의 정사각형 배열로 쪼개기
const sliceToQuad = (arr) => {
  const len = arr.length;
  return arr.reduce(
    (base, curr, i) => {
      const left = curr.slice(0, len / 2); // 전반부
      const right = curr.slice(len / 2); // 후반부
      if (i < len / 2) {
        // 상단부
        base[0].push(left);
        base[1].push(right);
      } else {
        // 하단부
        base[2].push(left);
        base[3].push(right);
      }
      return base;
    },
    [[], [], [], []],
  );
};

// 압축 함수
const zip = (arr) => {
  if (allSameVal(arr)) return [arr[0][0]]; // 입력된 배열의 모든 요소가 동일한 경우
  if (arr.flat().length === 4) return arr.flat(); // 입력된 배열의 요소가 4개인 경우
  return sliceToQuad(arr) // 작은 정사각형으로 쪼개기
    .map((sq) => {
      if (allSameVal(sq)) {
        // 모든 요소가 동일한 경우
        return [sq[0][0]]; // 첫 요소 반환
      } else {
        return zip(sq); // 재귀적으로 재호출
      }
    })
    .flat(); // 1차원 배열로 반환
};

const allSameVal = (arr) => {
  return arr.flat().every((e) => e === arr[0][0]);
};
