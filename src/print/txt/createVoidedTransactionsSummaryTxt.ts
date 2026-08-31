import dayjs from 'dayjs';
import { SiteSettings, Transaction, User } from '../../types';
import { formatDateTime, formatInPeso } from '../../utils';
import { EMPTY_CELL, PESO_SIGN } from '../helper-receipt';
import {
	getTxtFooter,
	getTxtHeader,
	getTxtPrintDetails,
	RowData,
	TXT_DIVIDER,
	TXT_LINE_BREAK,
	writeFile,
} from '../helper-txt';

// Summary listing of voided transactions (one row per OR number + amount),
// mirroring the on-screen print/receipt/printCancelledTransactions.ts content
// but written out as a .txt e-journal export instead of an HTML print.
export const createVoidedTransactionsSummaryTxt = (
	transactions: Transaction[],
	siteSettings: SiteSettings,
	user: User,
	timeRange: string,
	returnContent = false,
) => {
	const branchMachine = transactions?.[0]?.branch_machine;

	const totalAmount = transactions.reduce(
		(total, transaction) => total + Number(transaction.total_amount),
		0,
	);

	const rowData: (RowData | string)[] = getTxtHeader({
		branchMachine,
		siteSettings,
	});

	rowData.push(
		...[
			TXT_LINE_BREAK,
			{ center: 'VOIDED TRANSACTIONS REPORT' },
			TXT_LINE_BREAK,
			{ left: 'Date Range:', right: timeRange },
			TXT_LINE_BREAK,
			{ center: TXT_DIVIDER },
		],
	);

	transactions.forEach((transaction) => {
		rowData.push({
			left: transaction?.invoice?.or_number || EMPTY_CELL,
			right: formatInPeso(transaction.total_amount, PESO_SIGN),
		});
	});

	rowData.push(
		...[
			{ right: '----------------' },
			{ left: 'TOTAL', right: formatInPeso(totalAmount, PESO_SIGN) },
		],
	);

	if (user) {
		rowData.push(...[TXT_LINE_BREAK, getTxtPrintDetails(user)]);
	}

	rowData.push(...[TXT_LINE_BREAK, ...getTxtFooter(siteSettings)]);

	const reportTextFile = writeFile(rowData);

	if (returnContent) {
		return reportTextFile.get();
	}

	reportTextFile.export(
		`VoidedTransactions_${formatDateTime(dayjs(), false)}.txt`,
	);

	return null;
};
