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
  public registerUdf(workspace: string, name: string, udf: UDFInfoUpdate) {
    return this.API.registerUDFInfo(workspace, name, udf);
  }

  public registerGenericUdf(
    workspace: string,
    name: string,
    udf: Omit<UDFInfoUpdate, 'type'>
  ) {
    const udfObject = {
      ...udf,
      type: UDFType.Generic
    };
    return this.API.registerUDFInfo(workspace, name, udfObject);
  }

  public registerSingleArrayUdf(
    workspace: string,
    name: string,
    udf: Omit<UDFInfoUpdate, 'type'>
  ) {
    const udfObject = {
      ...udf,
      type: UDFType.SingleArray
    };
    return this.API.registerUDFInfo(workspace, name, udfObject);
  }

  public updateUdf(workspace: string, name: string, udf: UDFInfoUpdate) {
    return this.API.updateUDFInfo(workspace, name, udf);
  }

  public updateGenericUdf(
    workspace: string,
    name: string,
    udf: Omit<UDFInfoUpdate, 'type'>
  ) {
    const udfObject = {
      ...udf,
      type: UDFType.Generic
    };
    return this.API.updateUDFInfo(workspace, name, udfObject);
  }

  public updateSingleArrayUdf(
    workspace: string,
    name: string,
    udf: Omit<UDFInfoUpdate, 'type'>
  ) {
    const udfObject = {
      ...udf,
      type: UDFType.SingleArray
    };
    return this.API.updateUDFInfo(workspace, name, udfObject);
  }

  public async exec(
    workspace: string,
    teamspace: string,
    name: string,
    args?: Array<any>,
    options?: Omit<GenericUDF, 'argument' | 'udf_info_name'>
  ) {
    if (args && !Array.isArray(args)) {
      throw new Error('Arguments should be contained in an array');
    }

    const udf: GenericUDF = {
      udf_info_name: workspace + '/' + name,
      ...(args ? { argument: JSON.stringify(args) } : {}),
      ...options
    };
    const result = await this.API.submitGenericUDF(workspace, teamspace, udf);
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
