import { Branch, BranchMachine, User } from '../../../types';
import { DailyItemSoldSummary } from '../../../components/modals/ViewDailyItemSoldModal';

export type PrintDailyItemSold = {
	dailyItemSoldSummary: DailyItemSoldSummary[];
	branch: Branch;
	branchMachine?: BranchMachine;
	user?: User;
	isPdf?: boolean;
	// Content height of the PDF page (see getPdfPageContentHeight); paginates
	// the PDF so no line or section is cut across pages.
	pdfPageHeight?: number;
	reportDate?: string;
};
