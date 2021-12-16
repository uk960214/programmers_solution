function solution(n, a, b) {
  let round = 1;
  let aPlayerNum = a;
  let bPlayerNum = b;

  while (!arePartners(aPlayerNum, bPlayerNum)) {
    round += 1;
    aPlayerNum = getNextNum(aPlayerNum);
    bPlayerNum = getNextNum(bPlayerNum);
  }

  return round;
}

const arePartners = function checkForPartners(a, b) {
  return getMatchNum(a) === getMatchNum(b);
};

const getNextNum = function getNextPlayerNumber(a) {
  return getMatchNum(a);
};

const getMatchNum = function getMatchNumberForPlayer(a) {
  return Math.floor((a - 1) / 2) + 1;
};
