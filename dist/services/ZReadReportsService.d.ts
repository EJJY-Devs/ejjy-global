import { ListQueryParams, ListResponseData } from './interfaces';
import { ZReadReport } from '../types';
export interface Params extends ListQueryParams {
    branch_machine_id?: number;
    branch_machine_name?: string;
}
export interface Create {
    branch_machine_id: number;
    date: string;
    user_id: number;
}
declare const service: {
    list: (params: Params, baseURL?: string) => Promise<ListResponseData<ZReadReport>>;
    create: (body: Create) => Promise<import("axios").AxiosResponse<ZReadReport>>;
};
export default service;
