import { Branch, BranchMachine, User } from '../../../types';

export interface UnsoldItemSummary {
	id?: number;
	name: string;
	quantity: number;
	datetime_created?: string;
}

export type PrintUnsoldItem = {
	unsoldItemSummary: UnsoldItemSummary[];
	branch: Branch;
	branchMachine?: BranchMachine;
	user?: User;
	isPdf?: boolean;
	reportDate?: string;
};
