import { Configuration, ConfigurationParameters, QueryApi } from "../v2";

class TileDBQuery {
  configurationParams: ConfigurationParameters;

  constructor(params: ConfigurationParameters) {
    this.configurationParams = params;
  }

  async SubmitQuery(namespace: string, arrayName: string, body: ArrayBuffer) {
    const config = new Configuration(this.configurationParams);
    const queryAPI = new QueryApi(config);

    const response = await queryAPI.submitQuery(
      namespace,
      arrayName,
      "read",
      "application/capnp",
      body as any,
      undefined,
      undefined,
      undefined,
      {
        headers: {
          "Content-Type": "application/capnp",
        },
      }
    );

    return response;
  }
}

export default TileDBQuery;
