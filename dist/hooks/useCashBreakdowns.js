"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCashBreakdownCreate = void 0;
const ejjy_global_1 = require("ejjy-global");
const helper_1 = require("hooks/helper");
const react_query_1 = require("react-query");
const services_1 = require("services");
const useCashBreakdowns = ({ params, options }) => (0, react_query_1.useQuery)(['useCashBreakdowns', params === null || params === void 0 ? void 0 : params.cashieringSessionId], () => (0, helper_1.wrapServiceWithCatch)(services_1.CashBreakdownsService.list({
    page: ejjy_global_1.DEFAULT_PAGE,
    page_size: ejjy_global_1.MAX_PAGE_SIZE,
    cashiering_session_id: params === null || params === void 0 ? void 0 : params.cashieringSessionId,
})), Object.assign({ initialData: { data: { results: [], count: 0 } }, select: (query) => ({
        cashBreakdowns: query.data.results,
        total: query.data.count,
    }) }, options));
const useCashBreakdownCreate = () => (0, react_query_1.useMutation)(({ bills_100, bills_1000, bills_20, bills_200, bills_50, bills_500, branchMachineId, cashieringSessionId, cashOutMetadata, category, coins_1, coins_10, coins_20, coins_25, coins_5, coins_50, remarks, type, }) => services_1.CashBreakdownsService.create({
    bills_100,
    bills_1000,
    bills_20,
    bills_200,
    bills_50,
    bills_500,
    branch_machine_id: branchMachineId,
    cashiering_session_id: cashieringSessionId,
    cash_out_metadata: cashOutMetadata
        ? {
            payee: cashOutMetadata.payee,
            particulars: cashOutMetadata.particulars,
            amount: cashOutMetadata.amount,
            prepared_by_user_id: cashOutMetadata.preparedByUserId,
            approved_by_user_id: cashOutMetadata.approvedByUserId,
            received_by: cashOutMetadata.receivedBy,
        }
        : undefined,
    category,
    coins_1,
    coins_10,
    coins_20,
    coins_25,
    coins_5,
    coins_50,
    remarks,
    type,
}));
exports.useCashBreakdownCreate = useCashBreakdownCreate;
exports.default = useCashBreakdowns;
