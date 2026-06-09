"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCashBreakdownCreate = void 0;
const react_query_1 = require("react-query");
const globals_1 = require("../globals");
const services_1 = require("../services");
const helper_1 = require("./helper");
const useCashBreakdowns = (data = {}) => {
    const { params, options, serviceOptions } = data;
    return (0, react_query_1.useQuery)(['useCashBreakdowns', params], () => (0, helper_1.wrapServiceWithCatch)(services_1.CashBreakdownsService.list({
        cashiering_session_id: params === null || params === void 0 ? void 0 : params.cashieringSessionId,
        page: (params === null || params === void 0 ? void 0 : params.page) || globals_1.DEFAULT_PAGE,
        page_size: (params === null || params === void 0 ? void 0 : params.pageSize) || globals_1.DEFAULT_PAGE_SIZE,
    }, serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.baseURL)), Object.assign({ placeholderData: {
            results: [],
            count: 0,
        }, select: (query) => ({
            list: query.results,
            total: query.count,
        }) }, options));
};
const useCashBreakdownCreate = () => (0, react_query_1.useMutation)((body) => services_1.CashBreakdownsService.create({
    bills_100: body.bills100,
    bills_1000: body.bills1000,
    bills_20: body.bills20,
    bills_200: body.bills200,
    bills_50: body.bills50,
    bills_500: body.bills500,
    branch_machine_id: body.branchMachineId,
    cashiering_session_id: body.cashieringSessionId,
    cash_out_metadata: body.cashOutMetadata
        ? {
            payee: body.cashOutMetadata.payee,
            particulars: body.cashOutMetadata.particulars,
            amount: body.cashOutMetadata.amount,
            prepared_by_user_id: body.cashOutMetadata.preparedByUserId,
            approved_by_user_id: body.cashOutMetadata.approvedByUserId,
            received_by: body.cashOutMetadata.receivedBy,
        }
        : undefined,
    category: body.category,
    coins_1: body.coins1,
    coins_10: body.coins10,
    coins_20: body.coins20,
    coins_25: body.coins25,
    coins_5: body.coins5,
    coins_50: body.coins50,
    remarks: body.remarks,
    type: body.type,
}));
exports.useCashBreakdownCreate = useCashBreakdownCreate;
exports.default = useCashBreakdowns;
