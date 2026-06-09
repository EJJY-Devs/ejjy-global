import { AxiosResponse } from 'axios';
import { CamelCasedProperties } from 'type-fest';
import { Params } from '../services/DeliveryInvoiceService';
import { AxiosErrorResponse, QueryResponse } from '../services/interfaces';
import { DeliveryInvoice } from '../types';
import { UseListQuery, UseRetrieveQuery, Mutate } from './inteface';
declare const useDeliveryInvoices: (data?: UseListQuery<DeliveryInvoice, CamelCasedProperties<Params>>) => import("react-query").UseQueryResult<QueryResponse<DeliveryInvoice>, Error>;
interface UseDeliveryInvoiceRetrieveQuery<T> extends Omit<UseRetrieveQuery<T>, 'id'> {
    id: number | string;
}
export declare const useDeliveryInvoiceRetrieve: (data: UseDeliveryInvoiceRetrieveQuery<DeliveryInvoice>) => import("react-query").UseQueryResult<DeliveryInvoice, unknown>;
export declare const useDeliveryInvoiceCreate: (data?: Mutate) => import("react-query").UseMutationResult<AxiosResponse<DeliveryInvoice>, AxiosErrorResponse<any>, {
    tellerId: number;
    authorizerId: number;
    creditorAccountId: number;
    branchMachineId: number;
    products: {
        product_id: number;
        quantity: number;
        price_per_piece: number;
        amount: number;
    }[];
}, unknown>;
export default useDeliveryInvoices;
