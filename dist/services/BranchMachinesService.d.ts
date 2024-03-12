import { ServiceType } from '../globals';
import { BranchMachine } from '../types';
import { ListQueryParams, ListResponseData } from './interfaces';
export interface Params extends ListQueryParams {
    branch_id?: number;
}
export interface Ping {
    online_branch_machine_id: number;
}
export type Modify = {
    branch_id: string;
    machine_identification_number: string;
    name: string;
    permit_to_use: string;
    pos_terminal: string;
    server_url: string;
    type: string;
    storage_serial_number: string;
};
declare const service: {
    list: (params: Params, baseURL?: string, serviceType?: ServiceType) => Promise<ListResponseData<BranchMachine>>;
    retrieve: (id: number, baseURL?: string, serviceType?: ServiceType) => Promise<BranchMachine>;
    ping: (body: Ping) => Promise<import("axios").AxiosResponse<any>>;
    create: (body: Modify, baseURL?: string) => Promise<import("axios").AxiosResponse<BranchMachine>>;
    edit: (id: number, body: Modify, baseURL?: string) => Promise<import("axios").AxiosResponse<BranchMachine>>;
    delete: (id: number, baseURL?: string) => Promise<import("axios").AxiosResponse<any>>;
};
export default service;
