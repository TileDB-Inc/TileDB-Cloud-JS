/**
 * If result is an array of arrays of characters, eg:
 * [['T', 'i', 'l', 'e', 'D', 'B'], ['C', 'l', 'o', 'u', 'd']]
 * We concat characters to create an array of strings
 * ['TileDB', 'Cloud']
 */
const concatChars = (strings: string[][]): string[] =>
  strings.map((s) => s?.join(""));

export default concatChars;
