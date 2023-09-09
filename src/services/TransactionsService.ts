import axios from 'axios';
import { Branch, Transaction } from '../types';
import { ListQueryParams, ListResponseData } from './interfaces';

export interface Params extends ListQueryParams {
	is_adjusted?: boolean;
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

const service = {
	list: async (params: Params, baseURL?: string) => {
		const response = await axios.get<ListResponseData<Transaction>>(
			'/transactions',
			{
				baseURL,
				params,
			},
		);

		return response.data;
	},

	retrieve: async (id: number, baseURL?: string) => {
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
};

export default service;
