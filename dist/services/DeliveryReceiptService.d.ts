import { DeliveryReceipt } from '../types';
import { ListQueryParams, ListResponseData } from './interfaces';
export interface Params extends ListQueryParams {
    transaction_id?: number;
    type?: string;
}
type CreateProduct = {
    product_id: number;
    quantity_returned: number;
};
export interface Create {
    sender_id: number;
    encoded_by_id: number;
    transaction_id: number;
    products: CreateProduct[];
    type: string;
}
declare const service: {
    list: (params: Params, baseURL?: string) => Promise<ListResponseData<DeliveryReceipt>>;
    retrieve: (id: number, baseURL?: string) => Promise<DeliveryReceipt>;
    create: (body: Create) => Promise<import("axios").AxiosResponse<DeliveryReceipt>>;
};
export default service;
