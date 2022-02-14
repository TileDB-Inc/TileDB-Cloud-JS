import Parallel from "paralleljs";

function range(start: number, end: number): number[] {
  return new Array(end - start + 1).fill(undefined).map((_, i) => i + start);
}

/**
 * Group values together according to offsets
 * @param vals [1, 2, 3, 4]
 * @param offsets e.g. [0, 3, 4]
 * @returns [[1,2,3], 4]
 */
const groupValuesByOffsetBytes = <T>(
  values: T[],
  offsets: number[]
): Promise<T[][]> => {
  const offsetsLength = offsets.length;
  if (!offsetsLength) {
    return Promise.resolve([values]);
  }
  const offsetIndex = range(0, offsetsLength);
  const offsetIndexTuple = offsets.map((off, i) => [off, offsetIndex[i]]);
  const offsetsP = new Parallel(offsetIndexTuple, {
    env: {
      values,
      offsets,
    },
  });
  return new Promise((resolve) => {
    offsetsP
      .map(([offset, i]) => {
        const vals = global.env.values as T[];
        const globalOffsets = global.env.offsets;
        const nextOffset = globalOffsets[i + 1];

        const grpoupedValues = vals.slice(offset, nextOffset);
        return grpoupedValues;
      })
      .then(resolve);
  });
};

export default groupValuesByOffsetBytes;
