"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUsersAuthenticate = exports.useUsers = void 0;
const users_1 = require("ducks/users");
const ejjy_global_1 = require("ejjy-global");
const react_1 = require("react");
const react_query_1 = require("react-query");
const services_1 = require("services");
const utils_1 = require("utils");
const useActionDispatch_1 = require("./useActionDispatch");
const useUsers = () => {
    // STATES
    const [status, setStatus] = (0, react_1.useState)(ejjy_global_1.request.NONE);
    const [errors, setErrors] = (0, react_1.useState)([]);
    // Actions
    const authenticateUserAction = (0, useActionDispatch_1.useActionDispatch)(users_1.actions.authenticateUser);
    const listOfflineUsersAction = (0, useActionDispatch_1.useActionDispatch)(users_1.actions.listOfflineUsers);
    // METHODS
    const reset = () => {
        setErrors([]);
        setStatus(ejjy_global_1.request.NONE);
    };
    const authenticateUser = (data, extraCallback = null) => {
        authenticateUserAction(Object.assign(Object.assign({}, data), { callback: (0, utils_1.modifiedExtraCallback)(callback, extraCallback) }));
    };
    const listOfflineUsers = (extraCallback = null) => {
        listOfflineUsersAction({
            callback: (0, utils_1.modifiedExtraCallback)(callback, extraCallback),
        });
    };
    const callback = ({ status: responseStatus, errors: responseErrors = [], }) => {
        setStatus(responseStatus);
        setErrors(responseErrors);
    };
    return {
        authenticateUser,
        listOfflineUsers,
        status,
        errors,
        reset,
    };
};
exports.useUsers = useUsers;
const useUsersAuthenticate = () => (0, react_query_1.useMutation)(({ login, password, description }) => services_1.UsersService.authenticateAnAction({
    login,
    password,
    description,
}));
exports.useUsersAuthenticate = useUsersAuthenticate;
