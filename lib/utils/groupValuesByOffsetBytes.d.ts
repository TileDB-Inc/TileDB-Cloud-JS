/**
 * Group values together according to offsets
 * @param vals [1, 2, 3, 4]
 * @param offsets e.g. [0, 3, 4]
 * @returns [[1,2,3], 4]
 */
declare const groupValuesByOffsetBytes: <T>(values: T[], offsets: number[]) => Promise<unknown>;
export default groupValuesByOffsetBytes;
