import Parallel from 'paralleljs';
import range from './range';

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
  const offsetIndex = range(0, offsetsLength - 1);
  const offsetIndexTuple: [number, number][] = offsets.map((off, i) => [
    off,
    offsetIndex[i]
  ]);
  const offsetsP = new Parallel(offsetIndexTuple, {
    env: {
      values,
      offsets
    }
  });
  return new Promise(resolve => {
    offsetsP
      .map(([offset, i]: [number, number]) => {
        const vals = global.env.values as T[];
        const globalOffsets = global.env.offsets;
        const nextOffset = globalOffsets[i + 1];

        // Note: Array.prototype.slice doesn't accept BigInt
        const grpoupedValues = vals.slice(offset, nextOffset);
        return grpoupedValues;
      })
      .then(resolve);
  });
};

export default groupValuesByOffsetBytes;
