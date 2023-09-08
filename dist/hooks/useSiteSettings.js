"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("hooks/helper");
const react_query_1 = require("react-query");
const services_1 = require("services");
const SITE_SETTINGS_STALE_TIME = 1500;
const useSiteSettings = ({ options } = {}) => (0, react_query_1.useQuery)('useSiteSettings', () => (0, helper_1.wrapServiceWithCatch)(services_1.SiteSettingsService.get()), Object.assign({ staleTime: SITE_SETTINGS_STALE_TIME, refetchOnMount: false, notifyOnChangeProps: ['data'], select: (query) => query.data }, options));
exports.default = useSiteSettings;
