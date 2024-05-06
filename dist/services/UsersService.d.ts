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
declare const service: {
    list: (params: Params, baseURL?: string, serviceType?: ServiceType) => Promise<ListResponseData<User>>;
    authenticateAnAction: (body: AuthenticateAnAction, baseURL?: string) => Promise<import("axios").AxiosResponse<User>>;
};
export default service;
