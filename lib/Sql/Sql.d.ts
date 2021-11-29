import { Configuration, ConfigurationParameters, SqlApi } from "../v1";
declare class Sql {
    config: Configuration;
    API: SqlApi;
    constructor(params: ConfigurationParameters);
    exec(namespace: string, query: string): Promise<import("axios").AxiosResponse<object[]>>;
}
export default Sql;
