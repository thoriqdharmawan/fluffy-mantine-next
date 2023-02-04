export const getCoord = (arr1: string[], arr2: string[]) => {
  if (arr2?.[0]) {
    return arr1.flatMap((y, i) => arr2.map((x, j) => [i, j]));
  }

  return arr1.map((y, i) => [i]);
};
