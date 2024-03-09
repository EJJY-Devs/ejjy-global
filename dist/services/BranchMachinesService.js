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
            [globals_1.ServiceType.ONLINE]: '/branch-machines/',
            [globals_1.ServiceType.OFFLINE]: '/offline-branch-machines/',
        };
        const response = yield axios_1.default.get(endpoints[serviceType], {
            baseURL,
            params,
        });
        return response.data;
    }),
    retrieve: (id, baseURL, serviceType = globals_1.ServiceType.ONLINE) => __awaiter(void 0, void 0, void 0, function* () {
        const endpoints = {
            [globals_1.ServiceType.ONLINE]: `/branch-machines/${id}/`,
            [globals_1.ServiceType.OFFLINE]: `/offline-branch-machines/${id}/`,
        };
        const response = yield axios_1.default.get(endpoints[serviceType], {
            baseURL,
        });
        return response.data;
    }),
    ping: (body) => __awaiter(void 0, void 0, void 0, function* () { return axios_1.default.post('/offline-branch-machines/ping/', body); }),
};
exports.default = service;
