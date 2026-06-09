"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuthLogin = void 0;
const react_query_1 = require("react-query");
const services_1 = require("../services");
const useAuthLogin = () => (0, react_query_1.useMutation)(({ login, password }) => services_1.AuthService.login({
    login,
    password,
}));
exports.useAuthLogin = useAuthLogin;
