function solution(cacheSize, cities) {
  if (cacheSize === 0) return cities.length * 5;
  let cache = [];

  const runtime = cities.reduce((time, c) => {
    let newTime = time;
    const city = c.toLowerCase();
    const idx = cache.indexOf(city);
    if (idx >= 0) {
      newTime += 1;
      cache = [...cache.slice(0, idx), ...cache.slice(idx + 1), city];
    } else {
      newTime += 5;
      cache.push(city);
      if (cache.length > cacheSize) cache = cache.slice(1);
    }
    return newTime;
  }, 0);

  return runtime;
}
