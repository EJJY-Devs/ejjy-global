"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProductCategoryDelete = exports.useProductCategoryEdit = exports.useProductCategoryCreate = void 0;
const react_query_1 = require("react-query");
const globals_1 = require("../globals");
const services_1 = require("../services");
const helper_1 = require("./helper");
const useProductCategories = (data = {}) => {
    const { params, options, serviceOptions } = data;
    return (0, react_query_1.useQuery)(['useProductCategories', params], () => (0, helper_1.wrapServiceWithCatch)(services_1.ProductCategoriesService.list({
        page_size: (params === null || params === void 0 ? void 0 : params.pageSize) || globals_1.DEFAULT_PAGE_SIZE,
        page: (params === null || params === void 0 ? void 0 : params.page) || globals_1.DEFAULT_PAGE,
    }, serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.baseURL, serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.type)), Object.assign({ placeholderData: {
            results: [],
            count: 0,
        }, select: (query) => ({
            list: query.results,
            total: query.count,
        }) }, options));
};
const useProductCategoryCreate = (options, baseURL) => (0, react_query_1.useMutation)(({ name, priorityLevel }) => services_1.ProductCategoriesService.create({
    name,
    priority_level: priorityLevel,
}, baseURL), options);
exports.useProductCategoryCreate = useProductCategoryCreate;
const useProductCategoryEdit = (options, baseURL) => (0, react_query_1.useMutation)(({ id, name, priorityLevel }) => services_1.ProductCategoriesService.edit(id, {
    name,
    priority_level: priorityLevel,
}, baseURL), options);
exports.useProductCategoryEdit = useProductCategoryEdit;
const useProductCategoryDelete = (options, baseURL) => (0, react_query_1.useMutation)((id) => services_1.ProductCategoriesService.delete(id, baseURL), options);
exports.useProductCategoryDelete = useProductCategoryDelete;
exports.default = useProductCategories;
