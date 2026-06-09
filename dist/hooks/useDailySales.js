"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDailySalesCreate = void 0;
const react_query_1 = require("react-query");
const globals_1 = require("../globals");
const DailySalesService_1 = __importDefault(require("../services/DailySalesService"));
const helper_1 = require("./helper");
const useDailySales = (data = {}) => {
    const { params, options, serviceOptions } = data;
    return (0, react_query_1.useQuery)([
        'useDailySales',
        params === null || params === void 0 ? void 0 : params.branchMachineId,
        params === null || params === void 0 ? void 0 : params.branchMachineName,
        params === null || params === void 0 ? void 0 : params.isWithDailySalesData,
        params === null || params === void 0 ? void 0 : params.pageSize,
        params === null || params === void 0 ? void 0 : params.page,
        params === null || params === void 0 ? void 0 : params.timeRange,
    ], () => (0, helper_1.wrapServiceWithCatch)(DailySalesService_1.default.list({
        branch_machine_id: params === null || params === void 0 ? void 0 : params.branchMachineId,
        branch_machine_name: params === null || params === void 0 ? void 0 : params.branchMachineName,
        is_with_daily_sales_data: params === null || params === void 0 ? void 0 : params.isWithDailySalesData,
        page_size: (params === null || params === void 0 ? void 0 : params.pageSize) || globals_1.DEFAULT_PAGE_SIZE,
        page: (params === null || params === void 0 ? void 0 : params.page) || globals_1.DEFAULT_PAGE,
        time_range: params === null || params === void 0 ? void 0 : params.timeRange,
    }, serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.baseURL)), Object.assign({ placeholderData: {
            results: [],
            count: 0,
        }, select: (query) => ({
            list: query.results,
            total: query.count,
        }) }, options));
};
const useDailySalesCreate = () => {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)(({ cashieringSessionIds, generatedById: userId }) => DailySalesService_1.default.create({
        generated_by_id: userId,
        cashiering_session_ids: cashieringSessionIds,
    }), {
        onSuccess: () => {
            queryClient.invalidateQueries('useDailySales');
        },
    });
};
exports.useDailySalesCreate = useDailySalesCreate;
exports.default = useDailySales;
