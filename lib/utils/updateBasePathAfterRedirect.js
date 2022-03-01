"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const updateBasePathAfterRedirect = (axios, BASE_PATH, baseAPI) => {
    axios.interceptors.response.use((response) => {
        var _a;
        /**
         * Get responseURL from the response object
         * For browsers it's located in response.request.responseURL
         * For NodeJS it's located in response.request.res.responseUrl
         */
        const responseURL = (response === null || response === void 0 ? void 0 : response.request.responseURL) ||
            ((_a = response === null || response === void 0 ? void 0 : response.request.res) === null || _a === void 0 ? void 0 : _a.responseUrl);
        if (responseURL) {
            const url = new URL(responseURL);
            const version = new URL(BASE_PATH).pathname;
            const REDIRECTED_BASE_PATH = url.origin + version;
            baseAPI.basePath = REDIRECTED_BASE_PATH;
            if (baseAPI.configuration) {
                baseAPI.configuration.basePath = REDIRECTED_BASE_PATH;
            }
            else {
                baseAPI.configuration = { basePath: REDIRECTED_BASE_PATH };
            }
        }
        return response;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    });
};
exports.default = updateBasePathAfterRedirect;
//# sourceMappingURL=updateBasePathAfterRedirect.js.map