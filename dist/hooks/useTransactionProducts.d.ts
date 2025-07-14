import { CamelCasedProperties } from 'type-fest';
import { QueryResponse } from '../services/interfaces';
import { TransactionProduct } from '../types';
import { UseListQuery } from './inteface';
interface TransactionProductParams {
    isVatExempted?: boolean;
    orNumber?: boolean;
    page?: number;
    pageSize?: number;
    statuses?: string;
    timeRange?: string;
}
export declare const useTransactionProducts: (data?: UseListQuery<TransactionProduct, CamelCasedProperties<TransactionProductParams>>) => import("react-query").UseQueryResult<QueryResponse<TransactionProduct>, Error>;
export default useTransactionProducts;
