/* tslint:disable */
/* eslint-disable */
/**
 * Tiledb Storage Platform API
 * TileDB Storage Platform REST API
 *
 * The version of the OpenAPI document: 1.4.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { Configuration } from "./configuration";
// Some imports not used depending on template conditions
// @ts-ignore
import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';

export const BASE_PATH = "https://api.tiledb.com/v2".replace(/\/+$/, "");

/**
 *
 * @export
 */
export const COLLECTION_FORMATS = {
    csv: ",",
    ssv: " ",
    tsv: "\t",
    pipes: "|",
};

/**
 *
 * @export
 * @interface RequestArgs
 */
export interface RequestArgs {
    url: string;
    options: AxiosRequestConfig;
}

/**
 *
 * @export
 * @class BaseAPI
 */
export class BaseAPI {
    protected configuration: Configuration | undefined;

    constructor(configuration?: Configuration, protected basePath: string = BASE_PATH, protected axios: AxiosInstance = globalAxios) {
        if (configuration) {
            this.configuration = configuration;
            this.basePath = configuration.basePath || this.basePath;
        }

        axios.interceptors.response.use(
          (response) => {
            const responseURL = response?.request.responseURL as string | undefined;
            if (responseURL) {
              const url = new URL(responseURL);
              const version = new URL(BASE_PATH).pathname;
              const REDIRECTED_BASE_PATH = url.origin + version;
              this.basePath = REDIRECTED_BASE_PATH;

              if (this.configuration) {
                this.configuration.basePath = REDIRECTED_BASE_PATH;
              } else {
                this.configuration = { basePath: REDIRECTED_BASE_PATH }
              }
              
            }
            return response;
          },
          function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            return Promise.reject(error);
          }
        );
    }
};

/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export class RequiredError extends Error {
    name: "RequiredError" = "RequiredError";
    constructor(public field: string, msg?: string) {
        super(msg);
    }
}
