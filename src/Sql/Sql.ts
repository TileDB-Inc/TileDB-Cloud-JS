import {
  Configuration,
  ConfigurationParameters,
  SqlApi,
  SQLParameters,
} from "../v1";

class Sql {
  config: Configuration;
  API: SqlApi;

  constructor(params: ConfigurationParameters) {
    const config = new Configuration(params);
    this.config = config;
    this.API = new SqlApi(config);
  }

  exec(namespace: string, query: string) {
    const sql: SQLParameters = {
      query,
    };
    return this.API.runSQL(namespace, sql);
  }
}

export default Sql;
