import {
  Configuration,
  ConfigurationParameters,
  GenericUDF,
  UdfApi,
  UDFInfoUpdate,
  UDFSharing,
  UDFType,
} from "../v1";
import globalAxios, { AxiosInstance } from "axios";

class UDF {
  config: Configuration;
  API: UdfApi;

  constructor(params: ConfigurationParameters, axios: AxiosInstance = globalAxios) {
    const config = new Configuration(params);
    this.config = config;
    this.API = new UdfApi(config, undefined, axios);
  }

  //NOTE: TDB: We could use `btoa` to encode64 the `exec` field.
  public registerUdf(namespace: string, name: string, udf: UDFInfoUpdate) {
    return this.API.registerUDFInfo(namespace, name, udf);
  }

  public registerGenericUdf(
    namespace: string,
    name: string,
    udf: Omit<UDFInfoUpdate, "type">
  ) {
    const udfObject = {
      ...udf,
      type: UDFType.Generic,
    };
    return this.API.registerUDFInfo(namespace, name, udfObject);
  }

  public registerSingleArrayUdf(
    namespace: string,
    name: string,
    udf: Omit<UDFInfoUpdate, "type">
  ) {
    const udfObject = {
      ...udf,
      type: UDFType.SingleArray,
    };
    return this.API.registerUDFInfo(namespace, name, udfObject);
  }

  public updateUdf(namespace: string, name: string, udf: UDFInfoUpdate) {
    return this.API.updateUDFInfo(namespace, name, udf);
  }

  public updateGenericUdf(
    namespace: string,
    name: string,
    udf: Omit<UDFInfoUpdate, "type">
  ) {
    const udfObject = {
      ...udf,
      type: UDFType.Generic,
    };
    return this.API.updateUDFInfo(namespace, name, udfObject);
  }

  public updateSingleArrayUdf(
    namespace: string,
    name: string,
    udf: Omit<UDFInfoUpdate, "type">
  ) {
    const udfObject = {
      ...udf,
      type: UDFType.SingleArray,
    };
    return this.API.updateUDFInfo(namespace, name, udfObject);
  }

  public exec(namespace: string, udf: GenericUDF) {
    return this.API.submitGenericUDF(namespace, udf);
  }

  public info(namespace: string, udfName: string) {
    return this.API.getUDFInfo(namespace, udfName);
  }

  public share(namespace: string, udfName: string, udfSharing: UDFSharing) {
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
