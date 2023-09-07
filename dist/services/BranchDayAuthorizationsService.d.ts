import { ListQueryParams, ListResponseData } from './interfaces';
import { ServiceType } from '../globals';
import { BranchDayAuthorization } from '../types';
interface Params extends ListQueryParams {
    branch_id?: number;
}
declare const service: {
    list: (params: Params, baseURL?: string, serviceType?: ServiceType) => Promise<ListResponseData<BranchDayAuthorization>>;
};
export default service;
