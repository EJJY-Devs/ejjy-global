import { ServiceType } from '../globals';
import { OrderOfPayment } from '../types';
import { ListQueryParams, ListResponseData } from './interfaces';
export interface Params extends ListQueryParams {
    is_pending?: boolean;
    payor_id?: number;
}
declare const service: {
    list: (params: Params, baseURL?: string, serviceType?: ServiceType) => Promise<ListResponseData<OrderOfPayment>>;
};
export default service;
