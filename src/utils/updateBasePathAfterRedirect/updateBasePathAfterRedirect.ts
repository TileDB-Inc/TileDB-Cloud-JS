import { AxiosInstance } from 'axios';
import { BaseAPI as BaseAPIV1 } from '../../v1';
import { BaseAPI as BaseAPIV2 } from '../../v2';
import { BaseAPI as BaseAPIV3 } from '../../v3';
import { BaseAPI as BaseAPIV4 } from '../../v4';

const updateBasePathAfterRedirect = (
  axios: AxiosInstance,
  BASE_PATH: string,
  baseAPI: BaseAPIV1 | BaseAPIV2 | BaseAPIV3 | BaseAPIV4
) => {
  axios.interceptors.response.use(
    response => {
      /**
       * Get responseURL from the response object
       * For browsers it's located in response.request.responseURL
       * For NodeJS it's located in response.request.res.responseUrl
       */
      const responseURL =
        response?.request.responseURL ||
        (response?.request.res?.responseUrl as string | undefined);
      if (responseURL) {
        const url = new URL(responseURL);
        const version = new URL(BASE_PATH).pathname;
        const REDIRECTED_BASE_PATH = url.origin + version;

        // @ts-expect-error: `basePath` is protected
        baseAPI.basePath = REDIRECTED_BASE_PATH;
        // @ts-expect-error: `configuration` is protected
        if (baseAPI.configuration) {
          // @ts-expect-error: `configuration` is protected
          baseAPI.configuration.basePath = REDIRECTED_BASE_PATH;
        } else {
          // @ts-expect-error: `configuration` is protected
          baseAPI.configuration = { basePath: REDIRECTED_BASE_PATH };
        }
      }
      return response;
    },
    error => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );
};

export default updateBasePathAfterRedirect;
