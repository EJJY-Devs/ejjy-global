import { BranchMachine } from 'types/BranchMachine';
import { CashieringSession } from 'types/CashieringSession';

type GeneratedByUser = {
	first_name?: string;
	last_name?: string;
	employee_id: string;
};

type InvoiceOr = {
	or_number: string;
};

type DailySalesData = {
	date: string;
	cashier: GeneratedByUser;
};

export interface XReadReport {
	id: number;
	location?: string;
	proprietor?: string;
	tin?: string;
	permit_number?: string;
	datetime_created: string;
	cash_sales: string;
	check_sales: string;
	credit_pay: string;
	discount: string;
	sales_return: string;
	vat_exempt: string;
	vat_sales: string;
	generated_by: GeneratedByUser;
	total_transactions: number;
	beginning_or: InvoiceOr;
	ending_or: InvoiceOr;
	beginning_sales: string;
	ending_sales: string;
	beginning_transactions_count: number;
	ending_transactions_count: number;
	software_developer?: string;
	software_developer_tin?: string;
	pos_accreditation_number?: string;
	pos_accreditation_date?: string;
	net_sales: number;
	gross_sales: number;
	void: string;
	vat_12_percent: number;
	cashiering_session: CashieringSession;
	daily_sales_data: DailySalesData;
	branch_machine: BranchMachine;
	regular_discount: string;
	vat_regular_discount: string;
	special_discount: string;
	vat_special_discount: string;
	vat_void: string;
	vat_amount: number;
	vat_payable: number;
	total_vat_adjusted: number;
	others: number;
	printing_datetime?: string;
	generation_datetime?: string;
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
