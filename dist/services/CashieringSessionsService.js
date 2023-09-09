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
        const response = yield axios_1.default.get('/cashiering-sessions/', {
            baseURL,
            params,
        });
        return response.data;
    }),
    retrieve: (id, baseURL) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios_1.default.get(`/cashiering-sessions/${id}/`, {
            baseURL,
        });
        return response.data;
    }),
    start: (body) => __awaiter(void 0, void 0, void 0, function* () { return axios_1.default.post('/cashiering-sessions/start/', body); }),
    end: (body) => __awaiter(void 0, void 0, void 0, function* () { return axios_1.default.post(`/cashiering-sessions/${body.id}/end/`, body); }),
    validate: (id) => __awaiter(void 0, void 0, void 0, function* () { return axios_1.default.post(`/cashiering-sessions/${id}/validate/`); }),
};
exports.default = service;