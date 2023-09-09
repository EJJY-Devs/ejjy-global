import { ListQueryParams, ListResponseData } from './interfaces';
import { XReadReport } from '../types';
export interface Params extends ListQueryParams {
    branch_machine_id?: number;
    is_with_daily_sales_data?: boolean;
}
export interface Create {
    branch_machine_id: number;
    date: string;
    user_id: number;
}
declare const service: {
    list: (params: Params, baseURL?: string) => Promise<ListResponseData<XReadReport>>;
    create: (body: Create) => Promise<import("axios").AxiosResponse<XReadReport>>;
};
export default service;
