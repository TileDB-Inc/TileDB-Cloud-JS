import { Configuration, ConfigurationParameters, SqlApi } from "../v1";
import { AxiosInstance } from "axios";
declare class Sql {
    config: Configuration;
    API: SqlApi;
    constructor(params: ConfigurationParameters, axios?: AxiosInstance);
    exec(namespace: string, query: string): Promise<import("axios").AxiosResponse<object[]>>;
}
export default Sql;
