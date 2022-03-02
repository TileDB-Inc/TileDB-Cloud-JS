import {
  Configuration,
  ConfigurationParameters,
  SqlApi,
  SQLParameters,
} from "../v1";
import globalAxios, { AxiosInstance } from "axios";

class Sql {
  config: Configuration;
  API: SqlApi;

  constructor(params: ConfigurationParameters, axios: AxiosInstance = globalAxios) {
    const config = new Configuration(params);
    this.config = config;
    this.API = new SqlApi(config, undefined, axios);
  }

  exec(namespace: string, query: string) {
    const sql: SQLParameters = {
      query,
    };
    return this.API.runSQL(namespace, sql);
  }
}

export default Sql;
