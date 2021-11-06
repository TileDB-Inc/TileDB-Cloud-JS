/**
 * Group values together according to offsets
 * @param vals [1, 2, 3, 4]
 * @param offsets e.g. [0, 3, 4]
 * @returns [[1,2,3], 4]
 */
declare const groupValuesByOffsets: <T>(vals: T[], offsets: number[]) => (T | T[])[];
export default groupValuesByOffsets;
