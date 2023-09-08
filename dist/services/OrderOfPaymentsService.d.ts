import { ServiceType } from '../globals';
import { OrderOfPayment } from '../types';
import { ListQueryParams, ListResponseData } from './interfaces';
interface Params extends ListQueryParams {
    is_pending?: boolean;
}
declare const service: {
    list: (params: Params, baseURL?: string, serviceType?: ServiceType) => Promise<ListResponseData<OrderOfPayment>>;
};
export default service;
