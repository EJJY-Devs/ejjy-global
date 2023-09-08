import { ServiceType } from '../globals';
import { User } from '../types';
import { ListQueryParams, ListResponseData } from './interfaces';
export interface AuthenticateAnAction {
    login: string;
    password: string;
    description?: string;
}
declare const service: {
    list: (params: ListQueryParams, baseURL?: string, serviceType?: ServiceType) => Promise<ListResponseData<User>>;
    authenticateAnAction: (body: AuthenticateAnAction) => Promise<import("axios").AxiosResponse<string | boolean>>;
};
export default service;
