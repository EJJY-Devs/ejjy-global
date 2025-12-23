import { AxiosResponse } from 'axios';
import { UseMutationOptions } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { End, Start } from '../services/CashieringSessionsService';
import { AxiosErrorResponse, QueryResponse } from '../services/interfaces';
import { CashieringSession } from '../types';
import { UseListQuery, UseRetrieveQuery } from './inteface';
declare const useCashieringSessions: (data?: UseListQuery<CashieringSession>) => import("react-query").UseQueryResult<QueryResponse<CashieringSession>, Error>;
export declare const useCashieringSessionRetrieve: (data: UseRetrieveQuery<CashieringSession>) => import("react-query").UseQueryResult<CashieringSession, unknown>;
export declare const useCashieringSessionValidate: (options?: UseMutationOptions<AxiosResponse<boolean>, AxiosErrorResponse, number>) => import("react-query").UseMutationResult<AxiosResponse<boolean>, AxiosErrorResponse<any>, number, unknown>;
export declare const useCashieringSessionStart: (options?: UseMutationOptions<AxiosResponse<CashieringSession>, AxiosErrorResponse, CamelCasedProperties<Start>>) => import("react-query").UseMutationResult<AxiosResponse<CashieringSession>, AxiosErrorResponse<any>, {
    login: string;
    password: string;
    pin: string;
    branchMachineId: number;
    branchMachineRegistrationCount: number;
}, unknown>;
export declare const useCashieringSessionEnd: (options?: UseMutationOptions<AxiosResponse<CashieringSession>, AxiosErrorResponse, CamelCasedProperties<End>>) => import("react-query").UseMutationResult<AxiosResponse<CashieringSession>, AxiosErrorResponse<any>, {
    id: number;
    branchMachineId: number;
    isAutomaticallyClosed: boolean;
}, unknown>;
export default useCashieringSessions;
