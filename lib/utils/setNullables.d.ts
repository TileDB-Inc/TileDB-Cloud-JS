/**
 * Set nullables on an array
 * @param vals [12, 15, 22, 34, 8]
 * @param nullables [0, 1, 1, 0, 1]
 * @param offsets []
 * @returns [NULL, 15, 22, NULL, 8]
 */
declare const setNullables: <T>(vals: T[], nullables: number[], offsets: number[]) => (T | T[])[];
export default setNullables;
