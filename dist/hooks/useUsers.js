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
exports.useUserDeclineUserPendingApproval = exports.useUserApproveUserPendingApproval = exports.useUserRequestUserDeletion = exports.useUserRequestUserTypeChange = exports.useUserDelete = exports.useUserEdit = exports.useUserCreate = exports.useUserAuthenticate = exports.useUserRetrieve = void 0;
const react_query_1 = require("react-query");
const globals_1 = require("../globals");
const services_1 = require("../services");
const helper_1 = require("./helper");
const useUsers = (data = {}) => {
    const { params, options, serviceOptions } = data;
    return (0, react_query_1.useQuery)([
        'useUsers',
        params === null || params === void 0 ? void 0 : params.branchId,
        params === null || params === void 0 ? void 0 : params.isPendingCreateApproval,
        params === null || params === void 0 ? void 0 : params.isPendingUpdateUserTypeApproval,
        params === null || params === void 0 ? void 0 : params.isPendingDeleteApproval,
        params === null || params === void 0 ? void 0 : params.ordering,
        params === null || params === void 0 ? void 0 : params.page,
        params === null || params === void 0 ? void 0 : params.pageSize,
        params === null || params === void 0 ? void 0 : params.search,
    ], () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, helper_1.wrapServiceWithCatch)(services_1.UsersService.list({
            branch_id: params === null || params === void 0 ? void 0 : params.branchId,
            ordering: params === null || params === void 0 ? void 0 : params.ordering,
            page: (params === null || params === void 0 ? void 0 : params.page) || globals_1.DEFAULT_PAGE,
            page_size: (params === null || params === void 0 ? void 0 : params.pageSize) || globals_1.DEFAULT_PAGE_SIZE,
            is_pending_create_approval: params === null || params === void 0 ? void 0 : params.isPendingCreateApproval,
            is_pending_update_user_type_approval: params === null || params === void 0 ? void 0 : params.isPendingUpdateUserTypeApproval,
            is_pending_delete_approval: params === null || params === void 0 ? void 0 : params.isPendingDeleteApproval,
            search: params === null || params === void 0 ? void 0 : params.search,
        }, serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.baseURL, serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.type));
    }), Object.assign({ placeholderData: {
            results: [],
            count: 0,
        }, select: (query) => ({
            list: query.results,
            total: query.count,
        }) }, options));
};
const useUserRetrieve = (data) => {
    const { id, options, serviceOptions } = data;
    return (0, react_query_1.useQuery)(['useUserRetrieve', id], () => (0, helper_1.wrapServiceWithCatch)(services_1.UsersService.retrieve(id, serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.baseURL)), options);
};
exports.useUserRetrieve = useUserRetrieve;
const useUserAuthenticate = (options, baseURL) => (0, react_query_1.useMutation)(({ login, password, pin, description, branchMachineId, branchId }) => services_1.UsersService.authenticateAnAction({
    login,
    password,
    pin,
    description,
    branch_machine_id: branchMachineId,
    branch_id: branchId,
}, baseURL), options);
exports.useUserAuthenticate = useUserAuthenticate;
const useUserCreate = (options, baseURL) => (0, react_query_1.useMutation)(({ contactNumber, displayName, email, firstName, lastName, password, userType, username, }) => services_1.UsersService.create({
    contact_number: contactNumber,
    display_name: displayName,
    email,
    first_name: firstName,
    last_name: lastName,
    password,
    user_type: userType,
    username,
}, baseURL), options);
exports.useUserCreate = useUserCreate;
const useUserEdit = (options, baseURL) => (0, react_query_1.useMutation)(({ id, contactNumber, displayName, email, firstName, lastName, password, userType, }) => services_1.UsersService.edit(id, {
    contact_number: contactNumber,
    display_name: displayName,
    email,
    first_name: firstName,
    last_name: lastName,
    password,
    user_type: userType,
}, baseURL), options);
exports.useUserEdit = useUserEdit;
const useUserDelete = (options, baseURL) => (0, react_query_1.useMutation)((id) => services_1.UsersService.delete(id, baseURL), options);
exports.useUserDelete = useUserDelete;
const useUserRequestUserTypeChange = (options, baseURL) => (0, react_query_1.useMutation)(({ id, newUserType }) => services_1.UsersService.requestUserTypeChange(id, { new_user_type: newUserType }, baseURL), options);
exports.useUserRequestUserTypeChange = useUserRequestUserTypeChange;
const useUserRequestUserDeletion = (options, baseURL) => (0, react_query_1.useMutation)((id) => services_1.UsersService.requestUserDeletion(id, baseURL), options);
exports.useUserRequestUserDeletion = useUserRequestUserDeletion;
const useUserApproveUserPendingApproval = (options, baseURL) => (0, react_query_1.useMutation)(({ id, pendingApprovalType }) => services_1.UsersService.approveUserPendingApproval(id, { pending_approval_type: pendingApprovalType }, baseURL), options);
exports.useUserApproveUserPendingApproval = useUserApproveUserPendingApproval;
const useUserDeclineUserPendingApproval = (options, baseURL) => (0, react_query_1.useMutation)(({ id, pendingApprovalType }) => services_1.UsersService.declineUserPendingApproval(id, { pending_approval_type: pendingApprovalType }, baseURL), options);
exports.useUserDeclineUserPendingApproval = useUserDeclineUserPendingApproval;
exports.default = useUsers;
