import { ServiceType } from '../globals/enums';
import { ProductCategory } from '../types';
import { ListQueryParams, ListResponseData } from './interfaces';
export interface Modify {
    name: string;
    priority_level: number;
}
declare const service: {
    list: (params: ListQueryParams, baseURL?: string, serviceType?: ServiceType) => Promise<ListResponseData<ProductCategory>>;
    create: (body: Modify, baseURL?: string) => Promise<import("axios").AxiosResponse<ProductCategory>>;
    edit: (id: number, body: Modify, baseURL?: string) => Promise<import("axios").AxiosResponse<any>>;
    delete: (id: number, baseURL?: string) => Promise<import("axios").AxiosResponse<any>>;
};
export default service;
