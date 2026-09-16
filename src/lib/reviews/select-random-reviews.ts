export const selectRandomReviews = <T>(
  reviews: readonly T[],
  count: number,
  random = Math.random,
) => {
  const pool = [...reviews];

  for (let index = pool.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(random() * (index + 1));

    [pool[index], pool[randomIndex]] = [pool[randomIndex], pool[index]];
  }

  return pool.slice(0, Math.max(0, Math.min(count, pool.length)));
};
