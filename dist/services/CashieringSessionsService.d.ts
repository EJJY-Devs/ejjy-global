import { CashieringSession } from '../types';
import { ListQueryParams, ListResponseData } from './interfaces';
export interface Start {
    login: string;
    password: string;
    pin: string;
    branch_machine_id: number;
    branch_machine_registration_count: number;
}
export interface End {
    id: number;
    branch_machine_id: number;
    is_automatically_closed: boolean;
}
declare const service: {
    list: (params: ListQueryParams, baseURL?: string) => Promise<ListResponseData<CashieringSession>>;
    retrieve: (id: number, baseURL?: string) => Promise<CashieringSession>;
    start: (body: Start) => Promise<import("axios").AxiosResponse<CashieringSession>>;
    end: (body: End) => Promise<import("axios").AxiosResponse<CashieringSession>>;
    validate: (id: number) => Promise<import("axios").AxiosResponse<boolean>>;
};
export default service;
