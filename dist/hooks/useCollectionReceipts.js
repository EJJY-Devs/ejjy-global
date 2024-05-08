"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCollectionReceiptCreate = void 0;
const react_query_1 = require("react-query");
const globals_1 = require("../globals");
const services_1 = require("../services");
const helper_1 = require("./helper");
const useCollectionReceipts = (data = {}) => {
    const { params, options, serviceOptions } = data;
    return (0, react_query_1.useQuery)(['useCollectionReceipts', params ? Object.assign({}, params) : null], () => (0, helper_1.wrapServiceWithCatch)(services_1.CollectionReceiptsService.list({
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
const useCollectionReceiptCreate = (options) => (0, react_query_1.useMutation)(({ amount, bankBranch, bankName, branchMachineId, checkDate, checkNumber, createdById, orderOfPaymentId, }) => services_1.CollectionReceiptsService.create({
    amount,
    bank_branch: bankBranch,
    bank_name: bankName,
    branch_machine_id: branchMachineId,
    check_date: checkDate,
    check_number: checkNumber,
    created_by_id: createdById,
    order_of_payment_id: orderOfPaymentId,
}), options);
exports.useCollectionReceiptCreate = useCollectionReceiptCreate;
exports.default = useCollectionReceipts;
