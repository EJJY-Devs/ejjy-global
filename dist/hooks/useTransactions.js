"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTransactionDelete = exports.useTransactionVoid = exports.useTransactionEdit = exports.useTransactionPay = exports.useTransactionCreate = exports.useTransactionComputeDiscount = exports.useTransactionRetrieve = void 0;
const react_query_1 = require("react-query");
const globals_1 = require("../globals");
const services_1 = require("../services");
const utils_1 = require("../utils");
const helper_1 = require("./helper");
const useTransactions = (data = {}) => {
    const { params, options, serviceOptions } = data;
    return (0, react_query_1.useQuery)([
        'useTransactions',
        params === null || params === void 0 ? void 0 : params.pageSize,
        params === null || params === void 0 ? void 0 : params.page,
        params === null || params === void 0 ? void 0 : params.branchId,
        params === null || params === void 0 ? void 0 : params.branchMachineId,
        params === null || params === void 0 ? void 0 : params.discountCode,
        params === null || params === void 0 ? void 0 : params.discountName,
        params === null || params === void 0 ? void 0 : params.isAdjusted,
        params === null || params === void 0 ? void 0 : params.modeOfPayment,
        params === null || params === void 0 ? void 0 : params.payorCreditorAccountId,
        params === null || params === void 0 ? void 0 : params.statuses,
        params === null || params === void 0 ? void 0 : params.tellerId,
        params === null || params === void 0 ? void 0 : params.timeRange,
    ], () => (0, helper_1.wrapServiceWithCatch)(services_1.TransactionsService.list({
        branch_id: params === null || params === void 0 ? void 0 : params.branchId,
        branch_machine_id: params === null || params === void 0 ? void 0 : params.branchMachineId,
        discount_code: params === null || params === void 0 ? void 0 : params.discountCode,
        discount_name: params === null || params === void 0 ? void 0 : params.discountName,
        is_adjusted: params === null || params === void 0 ? void 0 : params.isAdjusted,
        mode_of_payment: params === null || params === void 0 ? void 0 : params.modeOfPayment,
        page_size: (params === null || params === void 0 ? void 0 : params.pageSize) || globals_1.DEFAULT_PAGE_SIZE,
        page: (params === null || params === void 0 ? void 0 : params.page) || globals_1.DEFAULT_PAGE,
        payor_creditor_account_id: params === null || params === void 0 ? void 0 : params.payorCreditorAccountId,
        statuses: params === null || params === void 0 ? void 0 : params.statuses,
        teller_id: params === null || params === void 0 ? void 0 : params.tellerId,
        time_range: (params === null || params === void 0 ? void 0 : params.timeRange) || globals_1.timeRangeTypes.DAILY,
    }, serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.baseURL)), Object.assign({ placeholderData: {
            results: [],
            count: 0,
        }, select: (query) => ({
            list: query.results,
            total: query.count,
        }) }, options));
};
const useTransactionRetrieve = (data) => {
    const { id, options, serviceOptions } = data;
    const idType = typeof id;
    return (0, react_query_1.useQuery)(['useTransactionRetrieve', id], () => services_1.TransactionsService.retrieve(id, serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.baseURL), Object.assign({ enabled: idType === 'number' || idType === 'string' }, options));
};
exports.useTransactionRetrieve = useTransactionRetrieve;
const useTransactionComputeDiscount = () => (0, react_query_1.useMutation)(({ branchProducts, discountAmount, discountOptionId }) => services_1.TransactionsService.compute({
    branch_products: branchProducts,
    discount_amount: discountAmount,
    discount_option_id: discountOptionId,
}));
exports.useTransactionComputeDiscount = useTransactionComputeDiscount;
const useTransactionCreate = () => (0, react_query_1.useMutation)(({ branchMachineId, client, customerAccountId, overallDiscount = 0, previousVoidedTransactionId, status, tellerId, invoiceType, }) => services_1.TransactionsService.create({
    branch_machine_id: branchMachineId,
    client,
    customer_account_id: customerAccountId,
    overall_discount: (0, utils_1.standardRound)(Number(overallDiscount)),
    previous_voided_transaction_id: previousVoidedTransactionId,
    status,
    teller_id: tellerId,
    invoice_type: invoiceType,
}));
exports.useTransactionCreate = useTransactionCreate;
const useTransactionPay = () => (0, react_query_1.useMutation)(({ amountTendered, branchMachineId, cashierUserId, creditPaymentAuthorizerId, creditorAccountId, discountAuthorizerId, discountAmount, discountOptionAdditionalFieldsValues, discountOptionId, transactionId, mode, products, }) => services_1.TransactionsService.pay({
    amount_tendered: amountTendered,
    branch_machine_id: branchMachineId,
    cashier_user_id: cashierUserId,
    credit_payment_authorizer_id: creditPaymentAuthorizerId,
    creditor_account_id: creditorAccountId,
    discount_authorizer_id: discountAuthorizerId,
    discount_amount: discountAmount,
    discount_option_additional_fields_values: discountOptionAdditionalFieldsValues,
    discount_option_id: discountOptionId,
    transaction_id: transactionId,
    mode: mode,
    products: products,
}));
exports.useTransactionPay = useTransactionPay;
const useTransactionEdit = () => (0, react_query_1.useMutation)(({ id, products, overallDiscount, status }) => services_1.TransactionsService.update({
    id,
    products,
    overall_discount: overallDiscount,
    status,
}));
exports.useTransactionEdit = useTransactionEdit;
const useTransactionVoid = () => (0, react_query_1.useMutation)(({ id, branchMachineId, cashierUserId, voidAuthorizerId }) => services_1.TransactionsService.void({
    id,
    branch_machine_id: branchMachineId,
    cashier_user_id: cashierUserId,
    void_authorizer_id: voidAuthorizerId,
}));
exports.useTransactionVoid = useTransactionVoid;
const useTransactionDelete = () => (0, react_query_1.useMutation)((id) => services_1.TransactionsService.delete(id));
exports.useTransactionDelete = useTransactionDelete;
exports.default = useTransactions;
