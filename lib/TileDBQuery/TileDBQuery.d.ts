import { Attribute, Dimension } from "../v1";
import { AttributeBufferHeader, ConfigurationParameters, Query } from "../v2";
declare class TileDBQuery {
    configurationParams: ConfigurationParameters;
    constructor(params: ConfigurationParameters);
    SubmitQuery(namespace: string, arrayName: string, body: Partial<Query>): Promise<{}>;
}
export default TileDBQuery;
export declare const getResults: (arrayBuffer: ArrayBuffer, attributes: AttributeBufferHeader[], attributesSchema: Array<Dimension | Attribute>) => {};
