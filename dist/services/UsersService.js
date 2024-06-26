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
const globals_1 = require("../globals");
const service = {
    list: (params, baseURL, serviceType = globals_1.ServiceType.ONLINE) => __awaiter(void 0, void 0, void 0, function* () {
        const endpoints = {
            [globals_1.ServiceType.ONLINE]: '/users/',
            [globals_1.ServiceType.OFFLINE]: '/offline-users/',
        };
        const response = yield axios_1.default.get(endpoints[serviceType], {
            baseURL,
            params,
        });
        return response.data;
    }),
    retrieve: (id, baseURL) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios_1.default.get(`/users/${id}/`, { baseURL });
        return response.data;
    }),
    authenticateAnAction: (body, baseURL) => __awaiter(void 0, void 0, void 0, function* () { return axios_1.default.post('users/authenticate/', body, { baseURL }); }),
    create: (body, baseURL) => __awaiter(void 0, void 0, void 0, function* () { return axios_1.default.post('/users/', body, { baseURL }); }),
    edit: (id, body, baseURL) => __awaiter(void 0, void 0, void 0, function* () { return axios_1.default.patch(`/users/${id}/`, body, { baseURL }); }),
    delete: (id, baseURL) => __awaiter(void 0, void 0, void 0, function* () { return axios_1.default.delete(`/users/${id}/`, { baseURL }); }),
    requestUserTypeChange: (id, body, baseURL) => __awaiter(void 0, void 0, void 0, function* () {
        return axios_1.default.post(`/users/${id}/request-user-type-change/`, body, {
            baseURL,
        });
    }),
    requestUserDeletion: (id, baseURL) => __awaiter(void 0, void 0, void 0, function* () { return axios_1.default.post(`/users/${id}/request-user-deletion/`, {}, { baseURL }); }),
    approveUserPendingApproval: (id, body, baseURL) => __awaiter(void 0, void 0, void 0, function* () { return axios_1.default.post(`/users/${id}/approve/`, body, { baseURL }); }),
    declineUserPendingApproval: (id, body, baseURL) => __awaiter(void 0, void 0, void 0, function* () {
        return axios_1.default.post(`/users/${id}/decline/`, body, {
            baseURL,
        });
    }),
};
exports.default = service;
