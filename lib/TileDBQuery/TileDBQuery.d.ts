import { Attribute, Dimension } from "../v1";
import { AttributeBufferHeader, ConfigurationParameters } from "../v2";
import { Query } from "../v2";
export interface QueryData extends Pick<Query, "layout"> {
    ranges: Array<number[] | Array<number[]>>;
    bufferSize: number;
}
interface AttributeValue {
    validity?: number[];
    offsets?: number[];
    values: any[];
}
export declare type AttributeValues = Record<string, AttributeValue>;
export interface QueryWrite extends Pick<Query, "layout"> {
    values: AttributeValues;
}
export declare class TileDBQuery {
    configurationParams: ConfigurationParameters;
    constructor(params: ConfigurationParameters);
    WriteQuery(namespace: string, arrayName: string, data: QueryWrite): Promise<ArrayBuffer>;
    SubmitQuery(namespace: string, arrayName: string, body: QueryData): Promise<{}>;
}
export default TileDBQuery;
/**
 * Convert an ArrayBuffer to a map of attributes with their results
 * @param arrayBuffer The slice ArrayBuffer that contains the results
 * @param attributes
 * @param attributesSchema
 * @returns A map of attribute names with the results of every attribute
 */
export declare const getResults: (arrayBuffer: ArrayBuffer, attributes: AttributeBufferHeader[], attributesSchema: Array<Dimension | Attribute>) => {};
/**
 * Set nullables on an array
 * @param vals [12, 15, 22, 34, 8]
 * @param nullables [0, 1, 1, 0, 1]
 * @param offsets []
 * @returns [NULL, 15, 22, NULL, 8]
 */
export declare const setNullables: <T>(vals: T[], nullables: number[], offsets: number[]) => any[];
/**
 * Group values together according to offsets
 * @param vals [1, 2, 3, 4]
 * @param offsets e.g. [0, 3, 4]
 * @returns [[1,2,3], 4]
 */
export declare const setOffsets: (vals: any[], offsets: number[]) => any[];
