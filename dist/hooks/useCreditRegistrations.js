"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ejjy_global_1 = require("ejjy-global");
const helper_1 = require("hooks/helper");
const react_query_1 = require("react-query");
const services_1 = require("services");
const useCreditRegistrations = ({ params, options } = {}) => (0, react_query_1.useQuery)(['useCreditRegistrations', params === null || params === void 0 ? void 0 : params.search], () => (0, helper_1.wrapServiceWithCatch)(services_1.CreditRegistrationsService.list({
    search: params === null || params === void 0 ? void 0 : params.search,
    page: ejjy_global_1.DEFAULT_PAGE,
    page_size: ejjy_global_1.MAX_PAGE_SIZE,
})), Object.assign({ cacheTime: 30000, initialData: { data: { results: [], count: 0 } }, select: (query) => ({
        creditRegistrations: query.data.results,
        total: query.data.count,
    }) }, options));
exports.default = useCreditRegistrations;
