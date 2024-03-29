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
    login: (body, baseURL) => __awaiter(void 0, void 0, void 0, function* () { return axios_1.default.post('users/login/', body, Object.assign({ baseURL }, globals_1.NO_VERIFICATION_CONFIG)); }),
    retrieve: (id, baseURL) => __awaiter(void 0, void 0, void 0, function* () { return axios_1.default.get(`users/${id}/`, { baseURL }); }),
    acquireToken: (body, baseURL) => __awaiter(void 0, void 0, void 0, function* () { return axios_1.default.post('tokens/acquire/', body, Object.assign({ baseURL }, globals_1.NO_VERIFICATION_CONFIG)); }),
    logout: (id, baseURL) => __awaiter(void 0, void 0, void 0, function* () { return axios_1.default.post(`users/${id}/logout/`, null, { baseURL }); }),
};
exports.default = service;
