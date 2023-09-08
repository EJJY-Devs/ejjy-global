import { UseListQuery } from './inteface';
export declare const useTransactions: () => {
    listTransactions: (data: any, extraCallback?: null) => void;
    getTransaction: (transactionId: any, extraCallback?: null) => void;
    createTransaction: (data: any, extraCallback?: null) => void;
    updateTransaction: (data: any, extraCallback?: null) => void;
    removeTransaction: (id: any, extraCallback?: null) => void;
    payTransaction: (data: any, extraCallback?: null) => void;
    voidTransaction: (data: any, extraCallback?: null) => void;
    status: any;
    errors: any;
};
declare const useTransactionsNew: ({ params, options }: UseListQuery) => import("react-query").UseQueryResult<TQueryFnData, unknown>;
export declare const useTransactionRetrieve: ({ id, options }: UseListQuery) => import("react-query").UseQueryResult<TQueryFnData, unknown>;
export declare const useTransactionComputeDiscount: () => import("react-query").UseMutationResult<any, any, any, unknown>;
export default useTransactionsNew;
