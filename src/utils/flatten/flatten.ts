/**
 * Flatten nested arrays to a single array
 */
const flatten = <T extends Array<unknown>>(list: T) => list.flat();

export default flatten;
