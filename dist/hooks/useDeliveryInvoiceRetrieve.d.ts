import { DeliveryInvoice } from '../types';
import { UseRetrieveQuery } from './inteface';
import { ServiceOptions } from './inteface';
interface UseDeliveryInvoiceRetrieveQuery<T> extends Omit<UseRetrieveQuery<T>, 'id'> {
    id: number | string;
    serviceOptions?: ServiceOptions;
}
export declare const useDeliveryInvoiceRetrieve: (data: UseDeliveryInvoiceRetrieveQuery<DeliveryInvoice>) => import("react-query").UseQueryResult<DeliveryInvoice, unknown>;
export default useDeliveryInvoiceRetrieve;
