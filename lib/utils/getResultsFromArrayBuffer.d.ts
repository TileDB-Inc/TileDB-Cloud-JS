import { AttributeBufferHeader, Attribute, Dimension } from "../v2";
export interface Options {
    /**
     * Results will return without setting nullables, used on big data
     * to avoid expensive calculations
     */
    ignoreNullables?: boolean;
    /**
     * Results will return without setting offsets, used on big data
     * to avoid expensive calculations
     */
    ignoreOffsets?: boolean;
    /**
     * Return only given attributes/dimensions
     */
    attributes?: string[];
    /**
     * Return raw buffers instead of convert to javascript primitives
     */
    returnRawBuffers?: boolean;
}
/**
 * Convert an ArrayBuffer to a map of attributes with their results
 * @param arrayBuffer The slice ArrayBuffer that contains the results
 * @param attributes
 * @param attributesSchema
 * @returns A map of attribute names with the results of every attribute
 */
export declare const getResultsFromArrayBuffer: (arrayBuffer: ArrayBuffer, attributeBufferHeaders: AttributeBufferHeader[], attributesSchema: Array<Dimension | Attribute>, options?: Options) => Promise<{}>;
export default getResultsFromArrayBuffer;
