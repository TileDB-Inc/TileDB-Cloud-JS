/**
 * Group values together according to offsets
 * @param vals [1, 2, 3, 4]
 * @param offsets e.g. [0, 3, 4]
 * @returns [[1,2,3], 4]
 */
const groupValuesByOffsetBytes = <T>(
  vals: T[],
  offsets: number[]
): Array<T[] | T> => {
  const valueArray: Array<T[] | T> = vals;
  const offsetsLength = offsets.length;

  if (offsetsLength) {
    for (let i = 0; i <= offsetsLength; i++) {
      const nextOffset = offsets[i + 1];
      if (!nextOffset) {
        const restItems = vals.slice(i);
        valueArray.splice(i, restItems.length, restItems);
        break;
      }
      const offsetDifference = nextOffset - offsets[i];
      const valuesWithinOffset = vals.slice(i, i + offsetDifference);
      valueArray.splice(i, offsetDifference, valuesWithinOffset);
    }
  }

  return valueArray;
};

export default groupValuesByOffsetBytes;
