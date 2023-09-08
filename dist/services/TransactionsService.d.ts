import { ListQueryParams, ListResponseData } from './interfaces';
import { Branch, Transaction } from '../types';
interface Params extends ListQueryParams {
    is_adjusted?: boolean;
    statuses?: string;
    teller_id?: number;
}
type ComputeDiscountBranchProducts = {
    id: number;
    quantity: number;
};
interface ComputeDiscount {
    branch_products: ComputeDiscountBranchProducts[];
    discount_amount: string;
    discount_option_id: number;
}
export interface ComputeDiscountResponse {
    gross_amount: string;
    overall_amount: string;
    computed_discount: string;
    overall_discount: string;
    gross_vat_exempt_amount: string;
    gross_vat_amount: string;
    vatable_sales: string;
    vat_on_discount: string;
    amount_before_discount: string;
    vat_sales_discount: string;
    vat_exempt_discount: string;
}
declare const service: {
    list: (params: Params, baseURL?: string) => Promise<ListResponseData<Transaction>>;
    retrieve: (id: number, baseURL?: string) => Promise<Branch>;
    compute: (body: ComputeDiscount) => Promise<import("axios").AxiosResponse<ComputeDiscountResponse>>;
};
export default service;
