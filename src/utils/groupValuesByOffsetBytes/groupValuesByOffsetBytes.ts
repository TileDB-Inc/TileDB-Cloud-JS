// import Parallel from 'paralleljs';
// import range from '../range';

/**
 * Group values together according to offsets
 * @param vals [1, 2, 3, 4]
 * @param offsets e.g. [0, 3, 4]
 * @returns [[1,2,3], 4]
 */
const groupValuesByOffsetBytes = <T>(
  values: T[],
  offsets: number[]
): Promise<any> => {
  const offsetsBigInt = offsets.map(n => BigInt(n));
  // import init, { slice_data } from '../../../wasm-slicer/pkg/wasm_slicer.js';
  return import('../../../wasm-slicer/pkg/wasm_slicer.js').then(module => {
    module.slice_data;
    const data = new Uint8Array(values as any);

    // const offsets = new BigUint64Array([2n, 4n]);

    const slicedData = module.slice_data(
      data,
      new BigUint64Array(offsetsBigInt)
    );
    // const slices = slicedData.slices;

    return slicedData;
    // const sizes = slicedData.sizes;

    // // return [slices, sizes];

    // const result = [];
    // let start = 0;

    // for (const size of sizes) {
    //   // console.log(slices);
    //   const end = start + Number(size);
    //   result.push(slices.slice(start, end));
    //   start = end;
    // }
    // return result;
  });

  // async function run() {
  //   await init();

  //   const data = new Uint8Array(values as any);

  //   // const offsets = new BigUint64Array([2n, 4n]);

  //   const slicedData = slice_data(data, offsetsBigInt);
  //   const slices = slicedData.slices();
  //   const sizes = slicedData.sizes();

  //   const result = [];
  //   let start = 0;

  //   for (const size of sizes) {
  //     const end = start + Number(size);
  //     result.push(slices.slice(start, end));
  //     start = end;
  //   }
  //   return result;
  //   // console.log(result);
  // }

  // return run();

  // const offsetsLength = offsets.length;
  // if (!offsetsLength) {
  //   return Promise.resolve([values]);
  // }
  // const offsetIndex = range(0, offsetsLength - 1);
  // const offsetIndexTuple: [number, number][] = offsets.map((off, i) => [
  //   off,
  //   offsetIndex[i]
  // ]);

  // const offsetsP = new Parallel(offsetIndexTuple, {
  //   env: {
  //     values,
  //     offsets
  //   }
  // });
  // return new Promise(resolve => {
  //   offsetsP
  //     .map(([offset, i]: [number, number]) => {
  //       const vals = globalThis.env.values as T[];
  //       const globalOffsets = globalThis.env.offsets;
  //       const nextOffset = globalOffsets[i + 1];
  //       // Note: Array.prototype.slice doesn't accept BigInt
  //       const grpoupedValues = vals.slice(offset, nextOffset);
  //       return grpoupedValues;
  //     })
  //     .then(resolve);
  // });
};

export default groupValuesByOffsetBytes;
