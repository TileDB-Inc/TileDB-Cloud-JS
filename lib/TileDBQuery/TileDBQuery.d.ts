import { ConfigurationParameters, Query } from "../v2";
declare class TileDBQuery {
    configurationParams: ConfigurationParameters;
    constructor(params: ConfigurationParameters);
    SubmitQuery(namespace: string, arrayName: string, body: Partial<Query>): Promise<{}>;
}
export default TileDBQuery;
