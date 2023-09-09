import { AxiosResponse } from 'axios';
import { CamelCasedProperties } from 'type-fest';
import { Params } from '../services/BackOrdersService';
import { AxiosErrorResponse, QueryResponse } from '../services/interfaces';
import { BackOrder } from '../types';
import { UseListQuery, UseRetrieveQuery } from './inteface';
declare const useBackOrders: (data?: UseListQuery<BackOrder, CamelCasedProperties<Params>>) => import("react-query").UseQueryResult<QueryResponse<BackOrder>, Error>;
export declare const useBackOrderRetrieve: (data: UseRetrieveQuery<BackOrder>) => import("react-query").UseQueryResult<BackOrder, unknown>;
export declare const useBackOrdersCreate: () => import("react-query").UseMutationResult<AxiosResponse<BackOrder>, AxiosErrorResponse<any>, {
    senderId: number;
    encodedById: number;
    transactionId: number;
    products: {
        product_id: number;
        quantity_returned: number;
    }[];
    type: string;
}, unknown>;
export default useBackOrders;
