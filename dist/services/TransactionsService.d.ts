import { PaymentType, Transaction } from '../types';
import { ListQueryParams, ListResponseData } from './interfaces';
export interface Params extends ListQueryParams {
    branch_id?: number;
    branch_machine_id?: number;
    discount_code?: string;
    discount_name?: string;
    is_adjusted?: boolean;
    mode_of_payment?: PaymentType;
    payor_creditor_account_id?: number;
    statuses?: string;
    teller_id?: number;
}
type ComputeDiscountBranchProducts = {
    id: number;
    quantity: number;
};
export interface ComputeDiscount {
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
export interface Pay {
    amount_tendered: string;
    branch_machine_id?: number;
    cashier_user_id: number;
    credit_payment_authorizer_id?: number;
    creditor_account_id?: number;
    discount_authorizer_id?: number;
    discount_amount?: number;
    discount_option_additional_fields_values?: string;
    discount_option_id?: string;
    transaction_id: number;
    mode: string;
}
export interface TransactionProduct {
    transaction_product_id?: number;
    product_id: number;
    quantity: number;
}
export interface Create {
    branch_machine_id: number;
    client?: {
        name?: string;
        address?: string;
        tin?: string;
    };
    customer_account_id?: number;
    overall_discount?: string;
    previous_voided_transaction_id?: number;
    products: TransactionProduct[];
    status?: string;
    teller_id: number;
    invoice_type: string;
}
export interface TransactionProductEdit extends TransactionProduct {
    price_per_piece: number;
    discount_per_piece?: number;
}
export interface Edit {
    id: number;
    products: TransactionProductEdit[];
    overall_discount?: number;
    status?: string;
}
export interface Void {
    id: number;
    branch_machine_id: number;
    cashier_user_id: number;
    void_authorizer_id: number;
}
declare const service: {
    list: (params: Params, baseURL?: string) => Promise<ListResponseData<Transaction>>;
    retrieve: (id: number | string, baseURL?: string) => Promise<Transaction>;
    compute: (body: ComputeDiscount) => Promise<import("axios").AxiosResponse<ComputeDiscountResponse>>;
    pay: (body: Pay) => Promise<import("axios").AxiosResponse<Transaction>>;
    create: (body: Create) => Promise<import("axios").AxiosResponse<Transaction>>;
    void: (body: Void) => Promise<import("axios").AxiosResponse<Transaction>>;
    update: (body: Edit) => Promise<import("axios").AxiosResponse<Transaction>>;
    delete: (id: number) => Promise<import("axios").AxiosResponse<void>>;
};
export default service;
