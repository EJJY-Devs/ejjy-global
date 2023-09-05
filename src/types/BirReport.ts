import { BranchMachine } from 'types/BranchMachine';

type BirReportOr = {
	id: number;
	or_number: string;
};

export interface BirReport {
	id: number;
	date: string;
	branch_machine: BranchMachine;
	beginning_or: BirReportOr;
	ending_or: BirReportOr;
	grand_accumulated_sales_ending_balance: string;
	grand_accumulated_sales_beginning_balance: string;
	gross_sales_for_the_day: string;
	vatable_sales: string;
	vat_amount: string;
	vat_exempt_sales: string;
	regular_discount: string;
	special_discount: string;
	void: string;
	reset_count: number;
	sales_issue_with_manual: number;
	gross_sales_from_pos: number;
	zero_rated_sales: number;
	returns: number;
	total_deductions: number;
	vat_on_special_discounts: number;
	vat_on_returns: number;
	others: number;
	total_vat_adjusted: number;
	vat_payable: number;
	net_sales: number;
	other_income: number;
	sales_overrun_or_overflow: number;
	total_net_sales: number;
	reset_counter: number;
	remarks: string;
	is_non_vat: boolean;
}
