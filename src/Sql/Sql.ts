import {
  Configuration,
  ConfigurationParameters,
  SqlApi,
  SQLParameters
} from '../v1';
import globalAxios, { AxiosInstance } from 'axios';

class Sql {
  config: Configuration;
  API: SqlApi;

  constructor(
    params: ConfigurationParameters,
    axios: AxiosInstance = globalAxios
  ) {
    const config = new Configuration(params);
    this.config = config;
    this.API = new SqlApi(config, undefined, axios);
  }

  exec(
    workspace: string,
    teamspace: string,
    query: string,
    options?: Omit<SQLParameters, 'query'>
  ) {
    const sql: SQLParameters = {
      query,
      ...options
    };
    return this.API.runSQL(workspace, teamspace, sql);
  }
}

export default Sql;
