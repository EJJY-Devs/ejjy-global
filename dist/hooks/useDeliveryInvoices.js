"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDeliveryInvoices = void 0;
const axios_1 = __importDefault(require("axios"));
const react_query_1 = require("react-query");
const fetchDeliveryInvoices = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get('/delivery-invoices/', {
        params: {
            branch_machine_id: params.branchMachineId,
            time_range: params.timeRange,
        },
    });
    return response.data;
});
const useDeliveryInvoices = ({ params = {} }) => (0, react_query_1.useQuery)(['useDeliveryInvoices', params.branchMachineId, params.timeRange], () => fetchDeliveryInvoices(params), { keepPreviousData: true });
exports.useDeliveryInvoices = useDeliveryInvoices;
exports.default = exports.useDeliveryInvoices;
