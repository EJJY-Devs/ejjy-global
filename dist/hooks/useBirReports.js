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
Object.defineProperty(exports, "__esModule", { value: true });
const react_query_1 = require("react-query");
const globals_1 = require("../globals");
const services_1 = require("../services");
const helper_1 = require("./helper");
const useBirReports = (data = {}) => {
    const { params, options, serviceOptions } = data;
    return (0, react_query_1.useQuery)(['useBirReports', params], () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, helper_1.wrapServiceWithCatch)(services_1.BirReportsService.list({
            branch_machine_id: params === null || params === void 0 ? void 0 : params.branchMachineId,
            page: (params === null || params === void 0 ? void 0 : params.page) || globals_1.DEFAULT_PAGE,
            page_size: (params === null || params === void 0 ? void 0 : params.pageSize) || globals_1.DEFAULT_PAGE_SIZE,
            time_range: params === null || params === void 0 ? void 0 : params.timeRange,
        }, serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.baseURL));
    }), Object.assign({ placeholderData: {
            results: [],
            count: 0,
        }, select: (query) => ({
            list: query.results,
            total: query.count,
        }) }, options));
};
exports.default = useBirReports;
