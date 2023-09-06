import { Branch } from '../types';
import { ListRequest, ListResponseData } from './interfaces';
import { ServiceType } from '../globals/enums';
interface Modify {
    name: string;
    server_url: string;
}
interface Ping {
    branch_key: string;
}
declare const service: {
    list: (params: ListRequest, baseURL?: string, serviceType?: ServiceType) => Promise<ListResponseData<Branch>>;
    retrieve: (id: number, baseURL?: string, serviceType?: ServiceType) => Promise<Branch>;
    create: (body: Modify, baseURL: string) => Promise<import("axios").AxiosResponse<any>>;
    edit: (id: number, body: Modify, baseURL: string) => Promise<import("axios").AxiosResponse<any>>;
    ping: (body: Ping, baseURL: string) => Promise<import("axios").AxiosResponse<any>>;
    delete: (id: number, baseURL: string) => Promise<import("axios").AxiosResponse<any>>;
};
export default service;
