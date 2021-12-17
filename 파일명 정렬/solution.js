// 답안 출처: https://after-newmoon.tistory.com/82

/* 
사용된 정규 표현식
1. 시작부터 숫자가 나오기 전까지의 문자열 "/^\D+/"
2. head 뒤에 나오는 연속된 숫자 문자열 "/\d+/"

시작 부분에 0이 있는 숫자로 된 문자열은 `* 1`를 사용해서 숫자로 바꿔주면 자동으로 사라짐

문자를 비교할 때는 크기 비교를 사용하지만, 숫자도 같은 방식으로 하면 유니코드 순서로 반환
*/

function solution(files) {
  return files.sort((a, b) => {
    // head 부분을 먼저 추출 후 비교
    const headA = a.match(/^\D+/)[0].toLowerCase();
    const headB = b.match(/^\D+/)[0].toLowerCase();

    if (headA < headB) return -1;
    if (headA > headB) return 1;

    // 숫자 부분 비교
    const numA = a.match(/\d+/)[0] * 1;
    const numB = b.match(/\d+/)[0] * 1;

    return numA - numB;
  });
}
