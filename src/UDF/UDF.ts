import {
  Configuration,
  ConfigurationParameters,
  V1API
} from "../v1";
import globalAxios, { AxiosInstance } from "axios";

class UDF {
  config: Configuration;
  API: V1API.UdfApi;

  constructor(
    params: ConfigurationParameters,
    axios: AxiosInstance = globalAxios
  ) {
    const config = new Configuration(params);
    this.config = config;
    this.API = new V1API.UdfApi(config, undefined, axios);
  }

  //NOTE: TDB: We could use `btoa` to encode64 the `exec` field.
  public registerUdf(namespace: string, name: string, udf: V1API.UDFInfoUpdate) {
    return this.API.registerUDFInfo(namespace, name, udf);
  }

  public registerGenericUdf(
    namespace: string,
    name: string,
    udf: Omit<V1API.UDFInfoUpdate, "type">
  ) {
    const udfObject = {
      ...udf,
      type: V1API.UDFType.Generic,
    };
    return this.API.registerUDFInfo(namespace, name, udfObject);
  }

  public registerSingleArrayUdf(
    namespace: string,
    name: string,
    udf: Omit<V1API.UDFInfoUpdate, "type">
  ) {
    const udfObject = {
      ...udf,
      type: V1API.UDFType.SingleArray,
    };
    return this.API.registerUDFInfo(namespace, name, udfObject);
  }

  public updateUdf(namespace: string, name: string, udf: V1API.UDFInfoUpdate) {
    return this.API.updateUDFInfo(namespace, name, udf);
  }

  public updateGenericUdf(
    namespace: string,
    name: string,
    udf: Omit<V1API.UDFInfoUpdate, "type">
  ) {
    const udfObject = {
      ...udf,
      type: V1API.UDFType.Generic,
    };
    return this.API.updateUDFInfo(namespace, name, udfObject);
  }

  public updateSingleArrayUdf(
    namespace: string,
    name: string,
    udf: Omit<V1API.UDFInfoUpdate, "type">
  ) {
    const udfObject = {
      ...udf,
      type: V1API.UDFType.SingleArray,
    };
    return this.API.updateUDFInfo(namespace, name, udfObject);
  }

  public async exec(
    namespaceAndUdf: string,
    args?: Array<any>,
    options?: Omit<V1API.GenericUDF, "argument" | "udf_info_name">
  ) {
    if (!namespaceAndUdf.includes('/')) {
      throw new Error("First argument should include namespace and the udf name separated by a '/' e.g. TileDB/myUDF");
    }

    if (args && !Array.isArray(args)) {
      throw new Error("Arguments should be contained in an array");
    }
    const [namespace] = namespaceAndUdf.split("/");
    const udf: V1API.GenericUDF = {
      udf_info_name: namespaceAndUdf,
      ...(args ? { argument: JSON.stringify(args) } : {}),
      ...options,
    };
    const result = await this.API.submitGenericUDF(namespace, udf);
    return result.data;
  }

  public info(namespace: string, udfName: string) {
    return this.API.getUDFInfo(namespace, udfName);
  }

  public share(namespace: string, udfName: string, udfSharing: V1API.UDFSharing) {
    return this.API.shareUDFInfo(namespace, udfName, udfSharing);
  }

  public unshare(
    namespace: string,
    udfName: string,
    namespaceToUnshare: string
  ) {
    const noActions = {
      namespace: namespaceToUnshare,
      actions: [],
    };
    return this.API.shareUDFInfo(namespace, udfName, noActions);
  }

  public delete(namespace: string, udfName: string) {
    return this.API.deleteUDFInfo(namespace, udfName);
  }
}

export default UDF;
