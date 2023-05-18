/**
 * Flatten nested arrays to a single array
 */
const flatten = <T extends any[]>(list: T) => list.flat();


export default flatten;