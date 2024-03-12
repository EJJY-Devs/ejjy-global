import { Branch } from './Branch';

export type BranchMachineType = 'scale' | 'cashiering' | 'scale_and_cashiering';

export interface BranchMachine {
	id: number;
	name: string;
	server_url?: string;
	pos_terminal?: string;
	storage_serial_number?: string;
	sales: {
		cash_sales: string;
		credit_payments: string;
		cash_on_hand: string;
		credit_sales: string;
		gross_sales: string;
		voided_total: string;
		discount: string;
		vat_amount: string;
		net_sales_vat_inclusive: string;
		net_sales_vat_exclusive: string;
		cash_in: string;
		cash_out: string;
	};
	type?: BranchMachineType;
	is_online: boolean;
	permit_to_use?: string;
	machine_identification_number?: string;
	online_id: number;
	branch: Branch;
}
