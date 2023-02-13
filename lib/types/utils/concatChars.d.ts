/**
 * If result is an array of arrays of characters, eg:
 * [['T', 'i', 'l', 'e', 'D', 'B'], ['C', 'l', 'o', 'u', 'd']]
 * We concat characters to create an array of strings
 * ['TileDB', 'Cloud']
 */
declare const concatChars: (strings: string[][]) => string[];
export default concatChars;
