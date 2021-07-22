import { QueryData } from '../utils/dataToQuery';
import { Attribute, Dimension } from "../v1";
import { AttributeBufferHeader, ConfigurationParameters } from "../v2";
export declare class TileDBQuery {
    configurationParams: ConfigurationParameters;
    constructor(params: ConfigurationParameters);
    SubmitQuery(namespace: string, arrayName: string, body: QueryData): Promise<{}>;
}
export default TileDBQuery;
export declare const getResults: (arrayBuffer: ArrayBuffer, attributes: AttributeBufferHeader[], attributesSchema: Array<Dimension | Attribute>) => {};
