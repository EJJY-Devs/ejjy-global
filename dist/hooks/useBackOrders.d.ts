import { AxiosResponse } from 'axios';
import { AxiosErrorResponse, QueryResponse } from '../services/interfaces';
import { BackOrder } from '../types';
import { UseListQuery, UseListQueryParams, UseRetrieveQuery } from './inteface';
interface ListQueryParams extends UseListQueryParams {
    transactionId?: number;
    type?: string;
}
declare const useBackOrders: (data?: UseListQuery<BackOrder, ListQueryParams>) => import("react-query").UseQueryResult<QueryResponse<BackOrder>, Error>;
export declare const useBackOrderRetrieve: (data: UseRetrieveQuery<BackOrder>) => import("react-query").UseQueryResult<BackOrder, unknown>;
export declare const useBackOrdersCreate: () => import("react-query").UseMutationResult<AxiosResponse<BackOrder>, AxiosErrorResponse<any>, {
    senderId: number;
    encodedById: number;
    transactionId: number;
    products: {
        productId: number;
        quantityReturned: number;
    }[];
    type: string;
}, unknown>;
export default useBackOrders;
