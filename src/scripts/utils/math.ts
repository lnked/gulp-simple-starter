export const randomInteger = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);

  return Math.round(rand);
};
