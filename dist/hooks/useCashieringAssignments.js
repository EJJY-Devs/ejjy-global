"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCashieringAssignments = void 0;
const cashiering_assignments_1 = require("ducks/cashiering-assignments");
const ejjy_global_1 = require("ejjy-global");
const react_1 = require("react");
const utils_1 = require("utils");
const useActionDispatch_1 = require("./useActionDispatch");
const useCashieringAssignments = () => {
    // STATES
    const [status, setStatus] = (0, react_1.useState)(ejjy_global_1.request.NONE);
    const [errors, setErrors] = (0, react_1.useState)([]);
    // Actions
    const listOfflineCashieringAssignmentsAction = (0, useActionDispatch_1.useActionDispatch)(cashiering_assignments_1.actions.listOfflineCashieringAssignments);
    // METHODS
    const reset = () => {
        setErrors([]);
        setStatus(ejjy_global_1.request.NONE);
    };
    const listOfflineCashieringAssignments = (extraCallback = null) => {
        listOfflineCashieringAssignmentsAction({
            callback: (0, utils_1.modifiedExtraCallback)(callback, extraCallback),
        });
    };
    const callback = ({ status: responseStatus, errors: responseErrors = [], }) => {
        setStatus(responseStatus);
        setErrors(responseErrors);
    };
    return {
        listOfflineCashieringAssignments,
        status,
        errors,
        reset,
    };
};
exports.useCashieringAssignments = useCashieringAssignments;
