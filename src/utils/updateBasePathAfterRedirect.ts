import { AxiosInstance } from 'axios';

const updateBasePathAfterRedirect = (
  axios: AxiosInstance,
  BASE_PATH: string,
  baseAPI: any
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
        baseAPI.basePath = REDIRECTED_BASE_PATH;
        if (baseAPI.configuration) {
          baseAPI.configuration.basePath = REDIRECTED_BASE_PATH;
        } else {
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
