import { Serializable } from 'paralleljs/lib/types';
import range from '../range';
import Parallel from 'paralleljs';

/**
 * Group values together according to offsets
 * @param vals [1, 2, 3, 4]
 * @param offsets e.g. [0, 3, 4]
 * @returns [[1,2,3], 4]
 */
const groupValuesByOffsetBytes = <T>(
  values: Array<T>,
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

  const offsetsP = new Parallel(
    {
      env: {
        values,
        offsets
      }
    },
    offsetIndexTuple
  );

  return offsetsP
    .map<Array<T>>(([offset, i]) => {
      const vals = globalThis.env.values as Array<Serializable<T>>;
      const globalOffsets = globalThis.env.offsets;
      const nextOffset = globalOffsets[i + 1];
      // Note: Array.prototype.slice doesn't accept BigInt
      const grpoupedValues = vals.slice(offset, nextOffset);
      return grpoupedValues;
    })
    .finally(x => x);
};

export default groupValuesByOffsetBytes;
