"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBranchProducts = void 0;
const branch_products_1 = require("ducks/branch-products");
const ejjy_global_1 = require("ejjy-global");
const react_1 = require("react");
const utils_1 = require("utils");
const useActionDispatch_1 = require("./useActionDispatch");
const useBranchProducts = () => {
    // STATES
    const [status, setStatus] = (0, react_1.useState)(ejjy_global_1.request.NONE);
    const [errors, setErrors] = (0, react_1.useState)([]);
    // ACTIONS
    const listBranchProductsAction = (0, useActionDispatch_1.useActionDispatch)(branch_products_1.actions.listBranchProducts);
    // METHODS
    const listBranchProducts = (data, extraCallback = null) => {
        listBranchProductsAction(Object.assign(Object.assign({}, data), { callback: (0, utils_1.modifiedExtraCallback)(callback, extraCallback) }));
    };
    const callback = ({ status: callbackStatus, errors: callbackErrors = [], }) => {
        setStatus(callbackStatus);
        setErrors(callbackErrors);
    };
    return {
        listBranchProducts,
        status,
        errors,
    };
};
exports.useBranchProducts = useBranchProducts;
