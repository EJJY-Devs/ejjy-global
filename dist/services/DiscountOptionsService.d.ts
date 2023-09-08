import { ServiceType } from '../globals';
import { DiscountOption } from '../types';
import { ListQueryParams, ListResponseData } from './interfaces';
declare const service: {
    list: (params: ListQueryParams, baseURL?: string, serviceType?: ServiceType) => Promise<ListResponseData<DiscountOption>>;
};
export default service;
