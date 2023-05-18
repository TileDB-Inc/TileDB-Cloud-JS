/**
 * Flatten nested arrays to a single array
 */
declare const flatten: <T extends any[]>(list: T) => (T extends readonly (infer InnerArr)[] ? InnerArr extends readonly (infer InnerArr)[] ? InnerArr : InnerArr : T)[];
export default flatten;
