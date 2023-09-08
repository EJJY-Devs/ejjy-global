"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUsersAuthenticate = void 0;
const react_query_1 = require("react-query");
const services_1 = require("../services");
const useUsersAuthenticate = () => (0, react_query_1.useMutation)(({ login, password, description }) => services_1.UsersService.authenticateAnAction({
    login,
    password,
    description,
}));
exports.useUsersAuthenticate = useUsersAuthenticate;
