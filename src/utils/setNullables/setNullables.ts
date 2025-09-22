/**
 * Set nullables on an array
 * @param vals [12, 15, 22, 34, 8]
 * @param nullables [0, 1, 1, 0, 1]
 * @param offsets []
 * @returns [NULL, 15, 22, NULL, 8]
 */
const setNullables = <T>(
  values: Array<T>,
  nullables: number[]
): Array<T | null> => {
  // We explicitly set as NULL index where nullable array is 0
  return values.map((val, i) => (nullables[i] ? val : null));
};

export default setNullables;
