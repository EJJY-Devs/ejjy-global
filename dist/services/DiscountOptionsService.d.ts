import { ServiceType } from '../globals';
import { DiscountOption } from '../types';
import { ListQueryParams, ListResponseData } from './interfaces';
export interface Params extends ListQueryParams {
    is_special_discount?: boolean;
}
declare const service: {
    list: (params: Params, baseURL?: string, serviceType?: ServiceType) => Promise<ListResponseData<DiscountOption>>;
};
export default service;
