function solution(msg) {
  const answer = [];
  const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const dict = Object.fromEntries(alpha.split('').map((c, i) => [c, i + 1]));
  const msgArray = msg.split('');
  let index = 27;

  while (msgArray.length) {
    let current = msgArray.shift();
    while (msgArray[0] && current + msgArray[0] in dict) {
      current += msgArray.shift();
    }
    answer.push(dict[current]);
    const newEntry = current + msgArray[0];
    dict[newEntry] = index++;
  }

  return answer;
}
