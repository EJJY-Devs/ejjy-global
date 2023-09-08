import { AxiosResponse } from 'axios';
import { UseMutationOptions } from 'react-query';
import { AxiosErrorResponse, QueryResponse } from '../services/interfaces';
import { CashieringSession } from '../types';
import { UseListQuery, UseRetrieveQuery } from './inteface';
declare const useCashieringSessions: (data?: UseListQuery<CashieringSession>) => import("react-query").UseQueryResult<QueryResponse<CashieringSession>, Error>;
export declare const useCashieringSessionRetrieve: (data: UseRetrieveQuery<CashieringSession>) => import("react-query").UseQueryResult<CashieringSession, unknown>;
export declare const useCashieringSessionValidate: (options: UseMutationOptions<AxiosResponse<boolean>, AxiosErrorResponse, number>) => import("react-query").UseMutationResult<AxiosResponse<boolean>, AxiosErrorResponse<any>, number, unknown>;
export declare const useCashieringSessionStart: () => import("react-query").UseMutationResult<AxiosResponse<CashieringSession>, AxiosErrorResponse<any>, {
    login: string;
    password: string;
    branchMachineId: number;
    branchMachineRegistrationCount: number;
}, unknown>;
export declare const useCashieringSessionEnd: () => import("react-query").UseMutationResult<AxiosResponse<CashieringSession>, AxiosErrorResponse<any>, {
    id: number;
    branchMachineId: number;
    isAutomaticallyClosed: boolean;
}, unknown>;
export default useCashieringSessions;
