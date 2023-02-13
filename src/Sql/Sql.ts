import {
  Configuration,
  ConfigurationParameters,
  V1API,
} from "../v1";
import globalAxios, { AxiosInstance } from "axios";

class Sql {
  config: Configuration;
  API: V1API.SqlApi;

  constructor(params: ConfigurationParameters, axios: AxiosInstance = globalAxios) {
    const config = new Configuration(params);
    this.config = config;
    this.API = new V1API.SqlApi(config, undefined, axios);
  }

  exec(namespace: string, query: string, options?: Omit<V1API.SQLParameters, "query">) {
    const sql: V1API.SQLParameters = {
      query,
      ...options,
    };
    return this.API.runSQL(namespace, sql);
  }
}

export default Sql;
