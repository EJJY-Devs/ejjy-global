import { CashieringSession } from '../types';
import { ListQueryParams, ListResponseData } from './interfaces';
interface Start {
    login: string;
    password: string;
    branch_machine_id: number;
    branch_machine_registration_count: number;
}
interface End {
    branch_machine_id: number;
    is_automatically_closed: boolean;
}
declare const service: {
    list: (params: ListQueryParams, baseURL?: string) => Promise<ListResponseData<CashieringSession>>;
    retrieve: (id: number) => Promise<CashieringSession>;
    start: (body: Start) => Promise<import("axios").AxiosResponse<CashieringSession>>;
    end: (id: number, body: End) => Promise<import("axios").AxiosResponse<CashieringSession>>;
    validate: (id: number) => Promise<import("axios").AxiosResponse<boolean>>;
};
export default service;
