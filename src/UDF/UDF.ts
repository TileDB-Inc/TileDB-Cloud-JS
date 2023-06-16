import {
  Configuration,
  ConfigurationParameters,
  GenericUDF,
  UdfApi,
  UDFInfoUpdate,
  UDFSharing,
  UDFType
} from '../v1';
import globalAxios, { AxiosInstance } from 'axios';

class UDF {
  config: Configuration;
  API: UdfApi;

  constructor(
    params: ConfigurationParameters,
    axios: AxiosInstance = globalAxios
  ) {
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
    udf: Omit<UDFInfoUpdate, 'type'>
  ) {
    const udfObject = {
      ...udf,
      type: UDFType.Generic
    };
    return this.API.registerUDFInfo(namespace, name, udfObject);
  }

  public registerSingleArrayUdf(
    namespace: string,
    name: string,
    udf: Omit<UDFInfoUpdate, 'type'>
  ) {
    const udfObject = {
      ...udf,
      type: UDFType.SingleArray
    };
    return this.API.registerUDFInfo(namespace, name, udfObject);
  }

  public updateUdf(namespace: string, name: string, udf: UDFInfoUpdate) {
    return this.API.updateUDFInfo(namespace, name, udf);
  }

  public updateGenericUdf(
    namespace: string,
    name: string,
    udf: Omit<UDFInfoUpdate, 'type'>
  ) {
    const udfObject = {
      ...udf,
      type: UDFType.Generic
    };
    return this.API.updateUDFInfo(namespace, name, udfObject);
  }

  public updateSingleArrayUdf(
    namespace: string,
    name: string,
    udf: Omit<UDFInfoUpdate, 'type'>
  ) {
    const udfObject = {
      ...udf,
      type: UDFType.SingleArray
    };
    return this.API.updateUDFInfo(namespace, name, udfObject);
  }

  public async exec(
    namespaceAndUdf: string,
    args?: Array<any>,
    options?: Omit<GenericUDF, 'argument' | 'udf_info_name'>
  ) {
    if (!namespaceAndUdf.includes('/')) {
      throw new Error(
        "First argument should include namespace and the udf name separated by a '/' e.g. TileDB/myUDF"
      );
    }

    if (args && !Array.isArray(args)) {
      throw new Error('Arguments should be contained in an array');
    }
    const [namespace] = namespaceAndUdf.split('/');
    const udf: GenericUDF = {
      udf_info_name: namespaceAndUdf,
      ...(args ? { argument: JSON.stringify(args) } : {}),
      ...options
    };
    const result = await this.API.submitGenericUDF(namespace, udf);
    return result.data;
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
      actions: []
    };
    return this.API.shareUDFInfo(namespace, udfName, noActions);
  }

  public delete(namespace: string, udfName: string) {
    return this.API.deleteUDFInfo(namespace, udfName);
  }
}

export default UDF;
