import { CashBreakdown, CashBreakdownCategory, CashBreakdownType } from '../types';
import { ListQueryParams, ListResponseData } from './interfaces';
export interface Params extends ListQueryParams {
    cashiering_session_id?: number;
}
export interface Create {
    bills_100: number;
    bills_1000: number;
    bills_20: number;
    bills_200: number;
    bills_50: number;
    bills_500: number;
    branch_machine_id: number;
    cash_out_metadata: any;
    cashiering_session_id: number;
    category: CashBreakdownCategory;
    coins_1: number;
    coins_10: number;
    coins_20: number;
    coins_25: number;
    coins_5: number;
    coins_50: number;
    remarks: string;
    type: CashBreakdownType;
}
declare const service: {
    list: (params: Params, baseURL?: string) => Promise<ListResponseData<CashBreakdown>>;
    create: (body: Create) => Promise<import("axios").AxiosResponse<CashBreakdown>>;
};
export default service;
