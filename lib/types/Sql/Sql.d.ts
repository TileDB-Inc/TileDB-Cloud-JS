import { Configuration, ConfigurationParameters, SqlApi, SQLParameters } from "../v1";
import { AxiosInstance } from "axios";
declare class Sql {
    config: Configuration;
    API: SqlApi;
    constructor(params: ConfigurationParameters, axios?: AxiosInstance);
    exec(namespace: string, query: string, options?: Omit<SQLParameters, "query">): Promise<import("axios").AxiosResponse<object[]>>;
}
export default Sql;
