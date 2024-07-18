import { CollectionReceipt } from '../types';
import { ListQueryParams, ListResponseData } from './interfaces';
export interface Params extends ListQueryParams {
    is_pending?: boolean;
    payor_id?: number;
}
export interface Create {
    amount: string;
    bank_branch?: string;
    bank_name?: string;
    branch_machine_id: number;
    check_date?: string;
    check_number?: string;
    created_by_id: number;
    order_of_payment_id: number;
}
declare const service: {
    list: (params: Params, baseURL?: string) => Promise<ListResponseData<CollectionReceipt>>;
    create: (body: Create) => Promise<import("axios").AxiosResponse<CollectionReceipt>>;
};
export default service;
