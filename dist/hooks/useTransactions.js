"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTransactionComputeDiscount = exports.useTransactionRetrieve = exports.useTransactions = void 0;
const transactions_1 = require("ducks/transactions");
const ejjy_global_1 = require("ejjy-global");
const helper_1 = require("hooks/helper");
const react_1 = require("react");
const react_query_1 = require("react-query");
const services_1 = require("services");
const utils_1 = require("utils");
const useActionDispatch_1 = require("./useActionDispatch");
const useTransactions = () => {
    // STATES
    const [status, setStatus] = (0, react_1.useState)(ejjy_global_1.request.NONE);
    const [errors, setErrors] = (0, react_1.useState)([]);
    // ACTIONS
    const listTransactionsAction = (0, useActionDispatch_1.useActionDispatch)(transactions_1.actions.listTransactions);
    const getTransactionAction = (0, useActionDispatch_1.useActionDispatch)(transactions_1.actions.getTransaction);
    const createTransactionAction = (0, useActionDispatch_1.useActionDispatch)(transactions_1.actions.createTransaction);
    const updateTransactionAction = (0, useActionDispatch_1.useActionDispatch)(transactions_1.actions.updateTransaction);
    const removeTransactionAction = (0, useActionDispatch_1.useActionDispatch)(transactions_1.actions.removeTransaction);
    const payTransactionAction = (0, useActionDispatch_1.useActionDispatch)(transactions_1.actions.payTransaction);
    const voidTransactionAction = (0, useActionDispatch_1.useActionDispatch)(transactions_1.actions.voidTransaction);
    // METHODS
    const listTransactions = (data, extraCallback = null) => {
        listTransactionsAction(Object.assign(Object.assign({}, data), { callback: (0, utils_1.modifiedExtraCallback)(callback, extraCallback) }));
    };
    const getTransaction = (transactionId, extraCallback = null) => {
        getTransactionAction({
            transactionId,
            callback: (0, utils_1.modifiedExtraCallback)(callback, extraCallback),
        });
    };
    const createTransaction = (data, extraCallback = null) => {
        createTransactionAction(Object.assign(Object.assign({}, data), { callback: (0, utils_1.modifiedExtraCallback)(callback, extraCallback) }));
    };
    const updateTransaction = (data, extraCallback = null) => {
        updateTransactionAction(Object.assign(Object.assign({}, data), { callback: (0, utils_1.modifiedExtraCallback)(callback, extraCallback) }));
    };
    const removeTransaction = (id, extraCallback = null) => {
        removeTransactionAction({
            id,
            callback: (0, utils_1.modifiedExtraCallback)(callback, extraCallback),
        });
    };
    const payTransaction = (data, extraCallback = null) => {
        payTransactionAction(Object.assign(Object.assign({}, data), { callback: (0, utils_1.modifiedExtraCallback)(callback, extraCallback) }));
    };
    const voidTransaction = (data, extraCallback = null) => {
        voidTransactionAction(Object.assign(Object.assign({}, data), { callback: (0, utils_1.modifiedExtraCallback)(callback, extraCallback) }));
    };
    const callback = ({ status: responseStatus, errors: responseErrors = [], }) => {
        setStatus(responseStatus);
        setErrors(responseErrors);
    };
    return {
        listTransactions,
        getTransaction,
        createTransaction,
        updateTransaction,
        removeTransaction,
        payTransaction,
        voidTransaction,
        status,
        errors,
    };
};
exports.useTransactions = useTransactions;
const useTransactionsNew = ({ params, options }) => (0, react_query_1.useQuery)([
    'useTransactions',
    params === null || params === void 0 ? void 0 : params.isAdjusted,
    params === null || params === void 0 ? void 0 : params.statuses,
    params === null || params === void 0 ? void 0 : params.tellerId,
    params === null || params === void 0 ? void 0 : params.timeRange,
    params === null || params === void 0 ? void 0 : params.page,
    params === null || params === void 0 ? void 0 : params.pageSize,
], () => (0, helper_1.wrapServiceWithCatch)(services_1.TransactionsService.list({
    is_adjusted: params === null || params === void 0 ? void 0 : params.isAdjusted,
    page_size: (params === null || params === void 0 ? void 0 : params.pageSize) || ejjy_global_1.MAX_PAGE_SIZE,
    page: (params === null || params === void 0 ? void 0 : params.page) || ejjy_global_1.DEFAULT_PAGE,
    statuses: params === null || params === void 0 ? void 0 : params.statuses,
    teller_id: params === null || params === void 0 ? void 0 : params.tellerId,
    time_range: (params === null || params === void 0 ? void 0 : params.timeRange) || ejjy_global_1.timeRangeTypes.DAILY,
})), Object.assign({ initialData: { data: { results: [], count: 0 } }, select: (query) => ({
        transactions: query.data.results,
        total: query.data.count,
    }) }, options));
const useTransactionRetrieve = ({ id, options }) => (0, react_query_1.useQuery)(['useTransactionRetrieve', id], () => services_1.TransactionsService.retrieve(id), Object.assign({ initialData: { data: null }, select: (query) => query.data }, options));
exports.useTransactionRetrieve = useTransactionRetrieve;
const useTransactionComputeDiscount = () => (0, react_query_1.useMutation)(({ branchProducts, discountAmount, discountOptionId }) => services_1.TransactionsService.compute({
    branch_products: branchProducts,
    discount_amount: discountAmount,
    discount_option_id: discountOptionId,
}));
exports.useTransactionComputeDiscount = useTransactionComputeDiscount;
exports.default = useTransactionsNew;
