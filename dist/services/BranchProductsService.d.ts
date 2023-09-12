import { BranchProduct } from '../types';
import { ListQueryParams, ListResponseData } from './interfaces';
export interface ParamsOffline extends ListQueryParams {
    branch_id?: number;
    identifier?: string;
    is_shown_in_scale_list?: boolean;
    is_sold_in_branch?: boolean;
    search?: string;
    unit_of_measurement?: string;
}
declare const service: {
    listOffline: (params: ParamsOffline, baseURL?: string) => Promise<ListResponseData<BranchProduct>>;
};
export default service;
