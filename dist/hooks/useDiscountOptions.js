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
const ejjy_global_1 = require("ejjy-global");
const helper_1 = require("hooks/helper");
const react_query_1 = require("react-query");
const services_1 = require("services");
const useDiscountOptions = ({ params, options }) => (0, react_query_1.useQuery)(['useDiscountOptions', params === null || params === void 0 ? void 0 : params.page, params === null || params === void 0 ? void 0 : params.pageSize], () => __awaiter(void 0, void 0, void 0, function* () {
    return (0, helper_1.wrapServiceWithCatch)(services_1.DiscountOptionsService.listOffline({
        page: (params === null || params === void 0 ? void 0 : params.page) || ejjy_global_1.DEFAULT_PAGE,
        page_size: (params === null || params === void 0 ? void 0 : params.pageSize) || ejjy_global_1.DEFAULT_PAGE_SIZE,
    }));
}), Object.assign({ initialData: { data: { results: [], count: 0 } }, select: (query) => ({
        discountOptions: query.data.results,
        total: query.data.count,
    }) }, options));
exports.default = useDiscountOptions;
