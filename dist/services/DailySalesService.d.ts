import { ListQueryParams, ListResponseData } from './interfaces';
import { DailySales } from '../types';
export interface Params extends ListQueryParams {
    is_with_daily_sales_data?: boolean;
}
export interface Create {
    generated_by_id: number;
    cashiering_session_ids: string;
}
declare const service: {
    list: (params: Params, baseURL?: string) => Promise<ListResponseData<DailySales>>;
    create: (body: Create) => Promise<import("axios").AxiosResponse<DailySales>>;
};
export default service;
