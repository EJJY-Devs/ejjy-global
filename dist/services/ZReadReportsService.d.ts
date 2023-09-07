import { ListQueryParams, ListResponseData } from './interfaces';
import { ZReadReport } from '../types';
export interface List extends ListQueryParams {
    branch_machine_id?: number;
    branch_machine_name?: string;
}
interface Create {
    branch_machine_id: number;
    date: string;
    user_id: number;
}
declare const service: {
    list: (params: List, baseURL?: string) => Promise<ListResponseData<ZReadReport>>;
    create: (body: Create) => Promise<import("axios").AxiosResponse<ZReadReport>>;
};
export default service;
