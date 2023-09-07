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
    const { params, options } = data;
    return (0, react_query_1.useQuery)(['useDailySales', params], () => (0, helper_1.wrapServiceWithCatch)(DailySalesService_1.default.list({
        is_with_daily_sales_data: params === null || params === void 0 ? void 0 : params.isWithDailySalesData,
        page: (params === null || params === void 0 ? void 0 : params.page) || globals_1.DEFAULT_PAGE,
        page_size: (params === null || params === void 0 ? void 0 : params.pageSize) || globals_1.DEFAULT_PAGE_SIZE,
        time_range: params === null || params === void 0 ? void 0 : params.timeRange,
    })), Object.assign({ placeholderData: {
            results: [],
            count: 0,
        }, select: (query) => ({
            list: query.results,
            total: query.count,
        }) }, options));
};
const useDailySalesCreate = () => {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)(({ cashieringSessionIds, userId }) => DailySalesService_1.default.create({
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
