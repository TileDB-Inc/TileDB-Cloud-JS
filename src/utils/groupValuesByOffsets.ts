/**
 * Group values together according to offsets
 * @param vals [1, 2, 3, 4]
 * @param offsets e.g. [0, 3, 4]
 * @returns [[1,2,3], 4]
 */
const groupValuesByOffsets = <T>(vals: T[], offsets: number[]): Array<T[]> => {
  let arrWithOffsets = [];
  const valueArray = vals;
  if (offsets.length) {
    offsets.forEach((offset, i) => {
      const offsetDiffWithNext = offsets[i + 1] - offset;
      if (offsetDiffWithNext) {
        arrWithOffsets.push(valueArray.slice(0, offsetDiffWithNext));
        valueArray.splice(0, offsetDiffWithNext);
      } else {
        arrWithOffsets.push(valueArray);
      }
    });
  }

  return arrWithOffsets;
};

export default groupValuesByOffsets;
