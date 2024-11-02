import { ServiceType } from '../globals';
import { BranchProduct } from '../types';
import { ListQueryParams, ListResponseData } from './interfaces';
export interface Params extends ListQueryParams {
    branch_id?: number;
    has_bo_balance?: boolean;
    has_negative_balance?: boolean;
    identifier?: string;
    ids?: string;
    is_shown_in_scale_list?: boolean;
    is_sold_in_branch?: boolean;
    product_category?: string;
    product_ids?: number[] | number | string;
    product_status?: string;
    search?: string;
    time_range?: string;
    unit_of_measurement?: string;
    barcode?: string;
}
declare const service: {
    list: (params: Params, baseURL?: string, serviceType?: ServiceType) => Promise<ListResponseData<BranchProduct>>;
};
export default service;
