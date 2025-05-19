import { AxiosResponse } from 'axios';
import { CamelCasedProperties } from 'type-fest';
import { Params } from '../services/DeliveryReceiptService';
import { AxiosErrorResponse, QueryResponse } from '../services/interfaces';
import { DeliveryReceipt } from '../types';
import { UseListQuery, UseRetrieveQuery } from './inteface';
declare const useDeliveryReceipt: (data?: UseListQuery<DeliveryReceipt, CamelCasedProperties<Params>>) => import("react-query").UseQueryResult<QueryResponse<DeliveryReceipt>, Error>;
export declare const useDeliveryReceiptRetrieve: (data: UseRetrieveQuery<DeliveryReceipt>) => import("react-query").UseQueryResult<DeliveryReceipt, unknown>;
export declare const useDeliveryReceiptCreate: () => import("react-query").UseMutationResult<AxiosResponse<DeliveryReceipt>, AxiosErrorResponse<any>, {
    senderId: number;
    encodedById: number;
    transactionId: number;
    products: {
        product_id: number;
        quantity_returned: number;
    }[];
    type: string;
}, unknown>;
export default useDeliveryReceipt;
