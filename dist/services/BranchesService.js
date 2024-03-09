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
const axios_1 = __importDefault(require("axios"));
const enums_1 = require("../globals/enums");
const service = {
    list: (params, baseURL, serviceType = enums_1.ServiceType.ONLINE) => __awaiter(void 0, void 0, void 0, function* () {
        const endpoints = {
            [enums_1.ServiceType.ONLINE]: '/branches/',
            [enums_1.ServiceType.OFFLINE]: '/offline-branches/',
        };
        const response = yield axios_1.default.get(endpoints[serviceType], {
            baseURL,
            params,
        });
        return response.data;
    }),
    retrieve: (id, baseURL, serviceType = enums_1.ServiceType.ONLINE) => __awaiter(void 0, void 0, void 0, function* () {
        const endpoints = {
            [enums_1.ServiceType.ONLINE]: `/branches/${id}/`,
            [enums_1.ServiceType.OFFLINE]: `/offline-branches/${id}/`,
        };
        const response = yield axios_1.default.get(endpoints[serviceType], {
            baseURL,
        });
        return response.data;
    }),
    create: (body, baseURL) => __awaiter(void 0, void 0, void 0, function* () { return axios_1.default.post('/branches/', body, { baseURL }); }),
    edit: (id, body, baseURL) => __awaiter(void 0, void 0, void 0, function* () { return axios_1.default.patch(`/branches/${id}/`, body, { baseURL }); }),
    ping: (body, baseURL) => __awaiter(void 0, void 0, void 0, function* () { return axios_1.default.post('/branches/ping/', body, { baseURL }); }),
    delete: (id, baseURL) => __awaiter(void 0, void 0, void 0, function* () { return axios_1.default.delete(`/branches/${id}/`, { baseURL }); }),
};
exports.default = service;
