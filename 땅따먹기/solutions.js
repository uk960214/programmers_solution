function solution(land) {
  const sum = [];
  land.forEach((row, i) => {
    const previous = sum[sum.length - 1];
    if (i !== 0) {
      const rowSum = getRowSum(previous, row);
      sum.push(rowSum);
    } else {
      sum.push(land[i]);
    }
  });
  return Math.max(...sum[sum.length - 1]);
}

function getRowSum(previous, row) {
  const rowSum = row.map((element, j) => {
    const options = [...previous];
    options.splice(j, 1);
    return element + Math.max(...options);
  });
  return rowSum;
}
