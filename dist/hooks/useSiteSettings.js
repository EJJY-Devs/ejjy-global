"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_query_1 = require("react-query");
const services_1 = require("../services");
const helper_1 = require("./helper");
const SITE_SETTINGS_STALE_TIME = 5000;
const useSiteSettings = (data = {}) => {
    const { params, options, serviceOptions } = data;
    return (0, react_query_1.useQuery)(['useSiteSettings', params], () => (0, helper_1.wrapServiceWithCatch)(services_1.SiteSettingsService.retrieve({ branch_id: params === null || params === void 0 ? void 0 : params.branchId }, serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.baseURL, serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.type)), Object.assign({ refetchOnMount: 'always', staleTime: SITE_SETTINGS_STALE_TIME }, options));
};
exports.default = useSiteSettings;
