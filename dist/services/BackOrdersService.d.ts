import { BackOrder } from '../types';
import { ListQueryParams, ListResponseData } from './interfaces';
interface Params extends ListQueryParams {
    transaction_id?: number;
    type?: string;
}
type CreateProduct = {
    product_id: number;
    quantity_returned: number;
};
interface Create {
    sender_id: number;
    encoded_by_id: number;
    transaction_id: number;
    products: CreateProduct[];
    type: string;
}
declare const service: {
    list: (params: Params, baseURL?: string) => Promise<ListResponseData<BackOrder>>;
    retrieve: (id: number, baseURL?: string) => Promise<BackOrder>;
    create: (body: Create) => Promise<import("axios").AxiosResponse<BackOrder>>;
};
export default service;
