import { Configuration, ConfigurationParameters, GenericUDF, UdfApi, UDFInfoUpdate, UDFSharing } from "../v1";
import { AxiosInstance } from "axios";
declare class UDF {
    config: Configuration;
    API: UdfApi;
    constructor(params: ConfigurationParameters, axios?: AxiosInstance);
    registerUdf(namespace: string, name: string, udf: UDFInfoUpdate): Promise<import("axios").AxiosResponse<void>>;
    registerGenericUdf(namespace: string, name: string, udf: Omit<UDFInfoUpdate, "type">): Promise<import("axios").AxiosResponse<void>>;
    registerSingleArrayUdf(namespace: string, name: string, udf: Omit<UDFInfoUpdate, "type">): Promise<import("axios").AxiosResponse<void>>;
    updateUdf(namespace: string, name: string, udf: UDFInfoUpdate): Promise<import("axios").AxiosResponse<void>>;
    updateGenericUdf(namespace: string, name: string, udf: Omit<UDFInfoUpdate, "type">): Promise<import("axios").AxiosResponse<void>>;
    updateSingleArrayUdf(namespace: string, name: string, udf: Omit<UDFInfoUpdate, "type">): Promise<import("axios").AxiosResponse<void>>;
    exec(namespaceAndUdf: string, args?: Array<any>, options?: Omit<GenericUDF, "argument" | "udf_info_name">): Promise<any>;
    info(namespace: string, udfName: string): Promise<import("axios").AxiosResponse<import("../v1").UDFInfo>>;
    share(namespace: string, udfName: string, udfSharing: UDFSharing): Promise<import("axios").AxiosResponse<void>>;
    unshare(namespace: string, udfName: string, namespaceToUnshare: string): Promise<import("axios").AxiosResponse<void>>;
    delete(namespace: string, udfName: string): Promise<import("axios").AxiosResponse<void>>;
}
export default UDF;
