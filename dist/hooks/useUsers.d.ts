import { AxiosResponse } from 'axios';
import { UseMutationOptions } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { AuthenticateAnAction, Modify, Params, RequestUserTypeChange, UserPendingApproval } from '../services/UsersService';
import { AxiosErrorResponse, QueryResponse } from '../services/interfaces';
import { User } from '../types';
import { UseListQuery, UseRetrieveQuery } from './inteface';
declare const useUsers: (data?: UseListQuery<User, CamelCasedProperties<Params>>) => import("react-query").UseQueryResult<QueryResponse<User>, Error>;
export declare const useUserRetrieve: (data: UseRetrieveQuery<User>) => import("react-query").UseQueryResult<User, unknown>;
export declare const useUserAuthenticate: (options?: UseMutationOptions<AxiosResponse<User>, AxiosErrorResponse, CamelCasedProperties<AuthenticateAnAction>>, baseURL?: string) => import("react-query").UseMutationResult<AxiosResponse<User>, AxiosErrorResponse<any>, {
    login: string;
    password: string;
    description?: string | undefined;
    branchMachineId?: number | undefined;
    branchId?: number | undefined;
}, unknown>;
export declare const useUserCreate: (options?: UseMutationOptions<AxiosResponse<User>, AxiosErrorResponse, CamelCasedProperties<Modify>>, baseURL?: string) => import("react-query").UseMutationResult<AxiosResponse<User>, AxiosErrorResponse<any>, {
    branchId?: number | undefined;
    contactNumber?: string | undefined;
    displayName?: string | undefined;
    email?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    password?: string | undefined;
    userType?: string | undefined;
    username?: string | undefined;
}, unknown>;
export declare const useUserEdit: (options?: UseMutationOptions<AxiosResponse<User>, AxiosErrorResponse, CamelCasedProperties<Modify & {
    id: number;
}>>, baseURL?: string) => import("react-query").UseMutationResult<AxiosResponse<User>, AxiosErrorResponse<any>, {
    branchId?: number | undefined;
    contactNumber?: string | undefined;
    displayName?: string | undefined;
    email?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    password?: string | undefined;
    userType?: string | undefined;
    username?: string | undefined;
    id: number;
}, unknown>;
export declare const useUserDelete: (options?: UseMutationOptions<AxiosResponse<void>, AxiosErrorResponse, number>, baseURL?: string) => import("react-query").UseMutationResult<AxiosResponse<void>, AxiosErrorResponse<any>, number, unknown>;
export declare const useUserRequestUserTypeChange: (options?: UseMutationOptions<AxiosResponse<boolean>, AxiosErrorResponse, CamelCasedProperties<RequestUserTypeChange & {
    id: number;
}>>, baseURL?: string) => import("react-query").UseMutationResult<AxiosResponse<boolean>, AxiosErrorResponse<any>, {
    newUserType: string;
    id: number;
}, unknown>;
export declare const useUserRequestUserDeletion: (options?: UseMutationOptions<AxiosResponse<boolean>, AxiosErrorResponse, number>, baseURL?: string) => import("react-query").UseMutationResult<AxiosResponse<boolean>, AxiosErrorResponse<any>, number, unknown>;
export declare const useUserApproveUserPendingApproval: (options?: UseMutationOptions<AxiosResponse<boolean>, AxiosErrorResponse, CamelCasedProperties<UserPendingApproval & {
    id: number;
}>>, baseURL?: string) => import("react-query").UseMutationResult<AxiosResponse<boolean>, AxiosErrorResponse<any>, {
    pendingApprovalType: import("../types").UserPendingApprovalType;
    id: number;
}, unknown>;
export declare const useUserDeclineUserPendingApproval: (options?: UseMutationOptions<AxiosResponse<boolean>, AxiosErrorResponse, CamelCasedProperties<UserPendingApproval & {
    id: number;
}>>, baseURL?: string) => import("react-query").UseMutationResult<AxiosResponse<boolean>, AxiosErrorResponse<any>, {
    pendingApprovalType: import("../types").UserPendingApprovalType;
    id: number;
}, unknown>;
export default useUsers;
