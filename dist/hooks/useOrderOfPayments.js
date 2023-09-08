"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ejjy_global_1 = require("ejjy-global");
const helper_1 = require("hooks/helper");
const react_query_1 = require("react-query");
const services_1 = require("services");
const useOrderOfPayments = ({ params, options }) => (0, react_query_1.useQuery)(['useOrderOfPayments', params === null || params === void 0 ? void 0 : params.page, params === null || params === void 0 ? void 0 : params.pageSize, params === null || params === void 0 ? void 0 : params.isPending], () => (0, helper_1.wrapServiceWithCatch)(services_1.OrderOfPaymentsService.list({
    page: (params === null || params === void 0 ? void 0 : params.page) || ejjy_global_1.DEFAULT_PAGE,
    page_size: (params === null || params === void 0 ? void 0 : params.pageSize) || ejjy_global_1.DEFAULT_PAGE_SIZE,
    is_pending: params === null || params === void 0 ? void 0 : params.isPending,
})), Object.assign({ initialData: { data: { results: [], count: 0 } }, select: (query) => ({
        orderOfPayments: query.data.results,
        total: query.data.count,
    }) }, options));
exports.default = useOrderOfPayments;
