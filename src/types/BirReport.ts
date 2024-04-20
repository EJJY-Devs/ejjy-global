import { BranchMachine } from './BranchMachine';

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
	sales_issue_with_manual: number;
	gross_sales_for_the_day: string;
	vatable_sales: string;
	vat_amount: string;
	vat_exempt_sales: string;
	zero_rated_sales: number;
	sc_discount: string;
	pwd_discount: string;
	naac_discount: string;
	sp_discount: string;
	others_discount: string;
	returns: string;
	void: string;
	total_deductions: string;
	vat_sc_discount: string;
	vat_pwd_discount: string;
	vat_others_discount: string;
	vat_returns: string;
	vat_others: string;
	total_vat_adjusted: string;
	reset_count: number;
	vat_payable: number;
	net_sales: number;
	sales_overrun_or_overflow: number;
	total_income: number;
	reset_counter: number;
	z_counter: number;
	remarks: string;
	is_non_vat: boolean;
}
