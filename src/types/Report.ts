import { BranchMachine } from './BranchMachine';
import { CashieringSession } from './CashieringSession';
import { User } from './User';

export type GeneratedByUser = Pick<
	User,
	'first_name' | 'last_name' | 'employee_id'
>;

type InvoiceOr = {
	or_number: string;
};

export interface XReadReport {
	id: number;
	beginning_or: InvoiceOr;
	beginning_sales: string;
	beginning_transactions_count: number;
	branch_machine: BranchMachine;
	cash_sales: string;
	cashiering_session: CashieringSession;
	check_sales: string;
	credit_pay: string;
	datetime_created: string;
	discount: string;
	ending_or: InvoiceOr;
	ending_sales: string;
	ending_transactions_count: number;
	generated_by: GeneratedByUser;
	generation_datetime?: string;
	gross_sales: number;
	location?: string;
	net_sales: number;
	others: number;
	permit_number?: string;
	pos_accreditation_date?: string;
	pos_accreditation_number?: string;
	printing_datetime?: string;
	proprietor?: string;
	regular_discount: string;
	sales_return: string;
	software_developer_tin?: string;
	software_developer?: string;
	special_discount: string;
	tin?: string;
	total_transactions: number;
	total_vat_adjusted: number;
	vat_12_percent: number;
	vat_amount: number;
	vat_exempt: string;
	vat_payable: number;
	vat_regular_discount: string;
	vat_sales: string;
	vat_special_discount: string;
	vat_void: string;
	void: string;
}

type DailySalesData = {
	date: string;
	cashier: GeneratedByUser;
};
export interface DailySales extends XReadReport {
	daily_sales_data: DailySalesData;
}

export interface ZReadReport {
	id: number;
	beginning_or: InvoiceOr;
	beginning_sales: number;
	beginning_transactions_count: number;
	branch_machine: BranchMachine;
	cash_sales: number;
	check_sales: number;
	credit_pay: number;
	current_sales: number;
	datetime_created: string;
	discount: number;
	ending_or: InvoiceOr;
	ending_sales: number;
	ending_transactions_count: number;
	generated_by: GeneratedByUser;
	generation_datetime?: string;
	gross_sales: number;
	location?: string;
	net_sales: number;
	others: number;
	permit_number?: string;
	pos_accreditation_date?: string;
	pos_accreditation_number?: string;
	printing_datetime?: string;
	proprietor?: string;
	regular_discount: number;
	sales_return: number;
	software_developer_tin?: string;
	software_developer?: string;
	special_discount: number;
	tin?: string;
	total_transactions: number;
	total_vat_adjusted: number;
	vat_12_percent: number;
	vat_amount: number;
	vat_exempt: number;
	vat_payable: number;
	vat_regular_discount: number;
	vat_sales: number;
	vat_special_discount: number;
	vat_void: number;
	void: number;
}
