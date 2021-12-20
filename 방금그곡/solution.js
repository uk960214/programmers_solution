function solution(m, musicinfos) {
  const newM = replaceSharp(m);
  const musicList = musicinfos.reduce((arr, str) => {
    const [start, end, title, score] = str.split(',');
    let playString = makePlayString(
      getTimeDiff(start, end),
      replaceSharp(score),
    );
    arr.push([title, playString]);
    return arr;
  }, []);
  const result = musicList
    .filter((music) => music[1].includes(newM))
    .sort((a, b) => b[1].length - a[1].length);
  return result.length !== 0 ? result[0][0] : '(None)';
}

const replaceSharp = (str) => {
  let origin = str;
  let result = '';
  while (origin.length !== 0) {
    if (origin[1] === '#') {
      result += origin[0].toLowerCase();
      origin = origin.slice(2);
    } else {
      result += origin[0];
      origin = origin.slice(1);
    }
  }
  return result;
};

const getTimeDiff = (start, end) => {
  const startMin = 60 * start.slice(0, 2) + 1 * start.slice(3);
  const endMin = 60 * end.slice(0, 2) + 1 * end.slice(3);
  return endMin - startMin;
};

const makePlayString = (len, score) => {
  const scoreLen = score.length;
  let playString = '';
  for (let i = 0; i < len; i++) {
    playString += score[i % scoreLen];
  }
  return playString;
};
