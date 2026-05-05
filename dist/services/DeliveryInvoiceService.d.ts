import { DeliveryInvoice } from '../types';
import { ListQueryParams, ListResponseData } from './interfaces';
export interface Params extends ListQueryParams {
    branch_machine_id?: number;
    time_range?: string;
}
export interface Create {
    teller_id: number;
    authorizer_id: number;
    creditor_account_id: number;
    branch_machine_id: number;
    products: Array<{
        product_id: number;
        quantity: number;
        price_per_piece: number;
        amount: number;
    }>;
}
declare const service: {
    list: (params: Params, baseURL?: string) => Promise<ListResponseData<DeliveryInvoice>>;
    retrieve: (id: number, baseURL?: string) => Promise<DeliveryInvoice>;
    create: (body: Create, baseURL?: string) => Promise<import("axios").AxiosResponse<DeliveryInvoice>>;
};
export default service;
