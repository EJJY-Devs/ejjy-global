import { AxiosResponse } from 'axios';
import { CamelCasedProperties } from 'type-fest';
import { ComputeDiscountResponse, Params } from '../services/TransactionsService';
import { AxiosErrorResponse, QueryResponse } from '../services/interfaces';
import { Transaction } from '../types';
import { UseListQuery, UseRetrieveQuery } from './inteface';
declare const useTransactions: (data?: UseListQuery<Transaction, CamelCasedProperties<Params>>) => import("react-query").UseQueryResult<QueryResponse<Transaction>, Error>;
export declare const useTransactionRetrieve: (data: UseRetrieveQuery<Transaction>) => import("react-query").UseQueryResult<Transaction, unknown>;
export declare const useTransactionComputeDiscount: () => import("react-query").UseMutationResult<AxiosResponse<ComputeDiscountResponse>, AxiosErrorResponse<any>, {
    branchProducts: {
        id: number;
        quantity: number;
    }[];
    discountAmount: string;
    discountOptionId: number;
}, unknown>;
export declare const useTransactionCreate: () => import("react-query").UseMutationResult<AxiosResponse<Transaction>, AxiosErrorResponse<any>, {
    branchMachineId: number;
    client?: {
        name?: string | undefined;
        address?: string | undefined;
        tin?: string | undefined;
    } | undefined;
    customerAccountId?: number | undefined;
    overallDiscount?: string | undefined;
    previousVoidedTransactionId?: number | undefined;
    products: import("../services/TransactionsService").TransactionProduct[];
    status?: string | undefined;
    tellerId: number;
}, unknown>;
export declare const useTransactionPay: () => import("react-query").UseMutationResult<AxiosResponse<Transaction>, AxiosErrorResponse<any>, {
    amountTendered: string;
    branchMachineId?: number | undefined;
    cashierUserId: number;
    creditPaymentAuthorizerId?: number | undefined;
    creditorAccountId?: number | undefined;
    discountAuthorizerId?: number | undefined;
    discountAmount?: number | undefined;
    discountOptionAdditionalFieldsValues?: string | undefined;
    discountOptionId?: string | undefined;
    transactionId: number;
}, unknown>;
export declare const useTransactionEdit: () => import("react-query").UseMutationResult<AxiosResponse<Transaction>, AxiosErrorResponse<any>, {
    id: number;
    products: import("../services/TransactionsService").TransactionProductEdit[];
    overallDiscount?: number | undefined;
    status?: string | undefined;
}, unknown>;
export declare const useTransactionVoid: () => import("react-query").UseMutationResult<AxiosResponse<Transaction>, AxiosErrorResponse<any>, {
    id: number;
    branchMachineId: number;
    cashierUserId: number;
    voidAuthorizerId: number;
}, unknown>;
export declare const useTransactionDelete: () => import("react-query").UseMutationResult<AxiosResponse<void>, AxiosErrorResponse<any>, number, unknown>;
export default useTransactions;
