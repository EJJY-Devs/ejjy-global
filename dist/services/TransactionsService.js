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
const service = {
    list: (params, baseURL) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios_1.default.get('/transactions/', {
            baseURL,
            params,
        });
        return response.data;
    }),
    retrieve: (id, baseURL) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios_1.default.get(`/transactions/${id}/`, {
            baseURL,
        });
        return response.data;
    }),
    compute: (body) => __awaiter(void 0, void 0, void 0, function* () {
        return axios_1.default.post('/transactions/compute-discount/', body);
    }),
    pay: (body) => __awaiter(void 0, void 0, void 0, function* () { return axios_1.default.post('/payments/', body); }),
    create: (body) => __awaiter(void 0, void 0, void 0, function* () { return axios_1.default.post('/transactions/', body); }),
    void: (body) => __awaiter(void 0, void 0, void 0, function* () { return axios_1.default.post(`/transactions/${body.id}/void/`, body); }),
    update: (body) => __awaiter(void 0, void 0, void 0, function* () { return axios_1.default.patch(`/transactions/${body.id}/`, body); }),
    delete: (id) => __awaiter(void 0, void 0, void 0, function* () { return axios_1.default.delete(`/transactions/${id}/`); }),
};
exports.default = service;
