import { ServiceType } from '../globals';
import { TransactionProduct } from '../types';
import { ListQueryParams, ListResponseData } from './interfaces';
interface List extends ListQueryParams {
    is_vat_exempted?: boolean;
    or_number?: boolean;
    statuses?: string;
    time_range?: string;
    branch_id?: number | string;
}
declare const service: {
    list: (params: List, baseURL?: string, serviceType?: ServiceType) => Promise<ListResponseData<TransactionProduct>>;
};
export default service;
