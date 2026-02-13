/**
 * Group values together according to offsets
 * @param vals [1, 2, 3, 4]
 * @param offsets e.g. [0, 3, 4]
 * @returns [[1,2,3], [4]]
 */
const groupValuesByOffsetBytes = <T>(
  values: Array<T>,
  offsets: number[]
): T[][] => {
  const offsetsLength = offsets.length;
  if (!offsetsLength) {
    return [values];
  }

  const result: T[][] = new Array(offsetsLength);
  for (let i = 0; i < offsetsLength; i++) {
    const start = offsets[i];
    const end = i + 1 < offsetsLength ? offsets[i + 1] : values.length;
    result[i] = values.slice(start, end);
  }

  return result;
};

export default groupValuesByOffsetBytes;
