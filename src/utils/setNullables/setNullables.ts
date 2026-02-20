/**
 * Set nullables on an array (mutates in place)
 * @param vals [12, 15, 22, 34, 8]
 * @param nullables [0, 1, 1, 0, 1]
 * @returns [NULL, 15, 22, NULL, 8]
 */
const setNullables = <T>(
  values: Array<T>,
  nullables: number[]
): Array<T | null> => {
  const result = values as Array<T | null>;
  for (let i = 0; i < result.length; i++) {
    if (!nullables[i]) {
      result[i] = null;
    }
  }
  return result;
};

export default setNullables;
