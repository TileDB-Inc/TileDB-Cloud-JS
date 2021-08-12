/**
 * Flatten nested arrays to a single array
 */
const flatten = <T extends any[]>(list: T) => (list as any).flat();


export default flatten;