import { Configuration, ConfigurationParameters } from "../v1";

class UDF {
  config: Configuration;

  constructor(params: ConfigurationParameters) {
    const config = new Configuration(params);
    this.config = config;
  }
}

export default UDF;
