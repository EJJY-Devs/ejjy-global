import { ListQueryParams, ListResponseData } from './interfaces';
import { ServiceType } from '../globals';
import { CreditRegistration } from '../types';
declare const service: {
    list: (params: ListQueryParams, baseURL?: string, serviceType?: ServiceType) => Promise<ListResponseData<CreditRegistration>>;
};
export default service;
