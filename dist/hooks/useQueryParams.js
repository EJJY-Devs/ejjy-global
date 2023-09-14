"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const queryString = __importStar(require("query-string"));
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const use_debounce_1 = require("use-debounce");
const useQueryParams = ({ page: currentPage, pageSize: currentPageSize, debounceTime = 500, onParamsCheck, } = {}) => {
    const history = (0, react_router_dom_1.useHistory)();
    const params = queryString.parse(history.location.search);
    (0, react_1.useEffect)(() => {
        const newParams = onParamsCheck === null || onParamsCheck === void 0 ? void 0 : onParamsCheck(params);
        if (!lodash_1.default.isEmpty(newParams)) {
            history.replace({
                search: queryString.stringifyUrl({
                    url: '',
                    query: Object.assign(Object.assign({}, newParams), params),
                }),
            });
        }
    }, []);
    const handleChange = () => {
        const pageSize = params.pageSize || currentPageSize;
        const page = params.page || currentPage;
    };
    const debouncedOnChange = (0, use_debounce_1.useDebouncedCallback)(handleChange, debounceTime);
    (0, react_1.useEffect)(() => {
        debouncedOnChange();
    }, [history.location.search]);
    /**
     * @param param
     * @param options
     */
    const setQueryParams = (param, { shouldResetPage = false, shouldIncludeCurrentParams = true } = {}) => {
        const currentParams = queryString.parse(history.location.search);
        history.push(queryString.stringifyUrl({
            url: '',
            query: Object.assign(Object.assign(Object.assign({}, (shouldIncludeCurrentParams ? currentParams : {})), (shouldResetPage ? { page: 1 } : {})), param),
        }));
    };
    return { params, setQueryParams, refreshList: handleChange };
};
exports.default = useQueryParams;
