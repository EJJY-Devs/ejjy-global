import { SalesTracker } from '../types';
import { ListQueryParams, ListResponseData } from './interfaces';
interface Params extends ListQueryParams {
    branch_machine_id?: number;
}
interface Reset {
    branch_machine_id: number;
}
export declare const service: {
    list: (params: Params, baseURL?: string) => Promise<ListResponseData<SalesTracker>>;
    reset: (body: Reset) => Promise<import("axios").AxiosResponse<SalesTracker>>;
};
export default service;
