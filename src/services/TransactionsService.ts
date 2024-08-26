import axios from 'axios';
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

const service = {
	list: async (params: Params, baseURL?: string) => {
		const response = await axios.get<ListResponseData<Transaction>>(
			'/transactions/',
			{
				baseURL,
				params,
			},
		);

		return response.data;
	},

	retrieve: async (id: number | string, baseURL?: string) => {
		const response = await axios.get<Transaction>(`/transactions/${id}/`, {
			baseURL,
		});

		return response.data;
	},

	compute: async (body: ComputeDiscount) =>
		axios.post<ComputeDiscountResponse>(
			'/transactions/compute-discount/',
			body,
		),

	pay: async (body: Pay) => axios.post<Transaction>('/payments/', body),

	create: async (body: Create) =>
		axios.post<Transaction>('/transactions/', body),

	void: async (body: Void) =>
		axios.post<Transaction>(`/transactions/${body.id}/void/`, body),

	update: async (body: Edit) =>
		axios.patch<Transaction>(`/transactions/${body.id}/`, body),

	delete: async (id: number) => axios.delete<void>(`/transactions/${id}/`),
};

export default service;
