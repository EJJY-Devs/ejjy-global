import { ListQueryParams } from './interfaces';
export interface Params extends ListQueryParams {
    branch_id?: number;
    branch_machine_id?: number;
}
export interface Upload {
    branch_machine_id?: number;
    branch_id?: number;
    is_back_office: boolean;
}
declare const service: {
    initialize: (params: Params, baseURL?: string) => Promise<void>;
    upload: (body: Upload, baseURL?: string) => Promise<import("axios").AxiosResponse<boolean>>;
};
export default service;
