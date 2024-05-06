import { ServiceType } from '../globals';
import { User } from '../types';
import { ListQueryParams, ListResponseData } from './interfaces';
export interface Params extends ListQueryParams {
    branch_id?: number;
    is_pending_create_approval?: boolean;
    is_pending_update_user_type_approval?: boolean;
    is_pending_delete_approval?: boolean;
}
export interface AuthenticateAnAction {
    login: string;
    password: string;
    description?: string;
}
export interface Modify {
    branch_id?: number;
    contact_number?: string;
    display_name?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    password?: string;
    user_type?: string;
    username?: string;
}
export interface RequestUserTypeChange {
    new_user_type: string;
}
export interface DeclineUserPendingApproval {
    pending_approval_type: string;
}
declare const service: {
    list: (params: Params, baseURL?: string, serviceType?: ServiceType) => Promise<ListResponseData<User>>;
    retrieve: (id: number, baseURL?: string) => Promise<User>;
    authenticateAnAction: (body: AuthenticateAnAction, baseURL?: string) => Promise<import("axios").AxiosResponse<User>>;
    create: (body: Modify, baseURL?: string) => Promise<import("axios").AxiosResponse<User>>;
    edit: (id: number, body: Modify, baseURL?: string) => Promise<import("axios").AxiosResponse<User>>;
    delete: (id: number, baseURL?: string) => Promise<import("axios").AxiosResponse<any>>;
};
export default service;
