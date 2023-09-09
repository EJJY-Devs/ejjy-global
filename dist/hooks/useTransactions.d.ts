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
export default useTransactions;
