import { BranchMachine } from './BranchMachine';
import { CashieringSession } from './CashieringSession';
import { User } from './User';

export type CashBreakdownType = 'start_session' | 'end_session' | 'mid_session';
export type CashBreakdownCategory = 'cash_breakdown' | 'cash_in' | 'cash_out';

type CashBreakdownMetadata = {
	id: number;
	payee?: string;
	particulars: string;
	amount: string;
	prepared_by_user: User;
	approved_by_user: User;
	received_by?: string;
};

export interface CashBreakdown {
	id: number;
	branch_machine: BranchMachine;
	cashiering_session: CashieringSession;
	cash_out_metadata: CashBreakdownMetadata;
	datetime_updated: string;
	to_be_uploaded: boolean;
	online_id?: number;
	datetime_created: string;
	type: CashBreakdownType;
	category: CashBreakdownCategory;
	remarks?: string;
	coins_25: number;
	coins_1: number;
	coins_5: number;
	coins_10: number;
	coins_20: number;
	bills_20: number;
	bills_50: number;
	bills_100: number;
	bills_200: number;
	bills_500: number;
	bills_1000: number;
}
