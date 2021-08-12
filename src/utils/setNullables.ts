import groupValuesByOffsets from "./groupValuesByOffsets";

/**
 * Set nullables on an array
 * @param vals [12, 15, 22, 34, 8]
 * @param nullables [0, 1, 1, 0, 1]
 * @param offsets []
 * @returns [NULL, 15, 22, NULL, 8]
 */
const setNullables = <T>(vals: T[], nullables: number[], offsets: number[]) => {
  // If values have offsets we group values together by offset
  const valueArray = offsets.length
    ? groupValuesByOffsets(vals, offsets)
    : vals;
  // We explicitly set as NULL index where nullable array is 0
  return valueArray.map((val, i) => (nullables[i] ? val : null));
};

export default setNullables;
