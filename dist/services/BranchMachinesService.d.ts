import { ServiceType } from '../globals';
import { BranchMachine } from '../types';
import { ListQueryParams, ListResponseData } from './interfaces';
export interface Params extends ListQueryParams {
    branch_id?: number;
}
export interface Ping {
    online_branch_machine_id: number;
}
declare const service: {
    list: (params: Params, baseURL?: string, serviceType?: ServiceType) => Promise<ListResponseData<BranchMachine>>;
    retrieve: (id: number, baseURL?: string, serviceType?: ServiceType) => Promise<BranchMachine>;
    ping: (body: Ping) => Promise<import("axios").AxiosResponse<any>>;
};
export default service;
