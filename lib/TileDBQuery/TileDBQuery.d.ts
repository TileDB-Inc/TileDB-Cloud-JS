import { ConfigurationParameters } from "../v2";
declare class TileDBQuery {
    configurationParams: ConfigurationParameters;
    constructor(params: ConfigurationParameters);
    SubmitQuery(namespace: string, arrayName: string, body: ArrayBuffer): Promise<{}>;
}
export default TileDBQuery;
