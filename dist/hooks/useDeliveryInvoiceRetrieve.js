"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDeliveryInvoiceRetrieve = void 0;
const axios_1 = __importDefault(require("axios"));
const react_query_1 = require("react-query");
const useDeliveryInvoiceRetrieve = (data) => {
    const { id, options, serviceOptions } = data;
    const idType = typeof id;
    return (0, react_query_1.useQuery)(['useDeliveryInvoiceRetrieve', id], () => axios_1.default
        .get(`/delivery-invoices/${id}/`, {
        baseURL: serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.baseURL,
    })
        .then((res) => res.data), Object.assign({ enabled: idType === 'number' || idType === 'string' }, options));
};
exports.useDeliveryInvoiceRetrieve = useDeliveryInvoiceRetrieve;
exports.default = exports.useDeliveryInvoiceRetrieve;
