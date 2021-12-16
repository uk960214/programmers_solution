function solution(n, count, players, turn) {
  const tubeTurns = getTurns(players, turn, count);
  let string = '';
  let num = 0;
  while (string.length < tubeTurns[tubeTurns.length - 1]) {
    string += num.toString(n);
    num++;
  }
  const answer = tubeTurns.reduce((a, t) => a + string[t - 1], '');

  return answer.toUpperCase();
}

const getTurns = function getTubeTurns(players, turn, count) {
  const turns = [turn];
  while (turns.length !== count) turns.push(turns[turns.length - 1] + players);
  return turns;
};
