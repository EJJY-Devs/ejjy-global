import dayjs from 'dayjs';
import { BranchMachine, SiteSettings, User } from '../types';
import {
	ReportTextFile,
	formatDateTime,
	getTaxTypeDescription,
} from '../utils';

export const TXT_LINE_BREAK = '';
export const TXT_NBSP = ' ';
export const TXT_DIVIDER =
	'-------------------------------------------------------------------';

export type RowData = {
	left?: string | number;
	center?: string | number;
	right?: string | number;
};

type Props = {
	title?: string;
	branchMachine: BranchMachine;
	siteSettings: SiteSettings;
};

export const getTxtHeader = ({
	title,
	branchMachine,
	siteSettings,
}: Props): RowData[] => {
	const {
		contact_number: contactNumber,
		address_of_tax_payer: location = '',
		proprietor,
		store_name: storeName = '',
		tax_type: taxType,
		tin,
	} = siteSettings;
	const {
		name,
		machine_identification_number: machineID,
		pos_terminal: posTerminal,
	} = branchMachine;

	const storeNames = storeName
		.trim()
		.split('\n')
		.map((item) => item);

	const locations = location
		.trim()
		.split('\n')
		.map((item) => item);

	return [
		...storeNames,
		...locations,
		[contactNumber, name].filter(Boolean).join(' | '),
		proprietor,
		[getTaxTypeDescription(taxType), tin].filter(Boolean).join(' | '),
		`MIN: ${machineID}`,
		`SN: ${posTerminal}`,
		TXT_LINE_BREAK,
		title,
	]
		.filter(Boolean)
		.filter((row) => typeof row === 'string')
		.map((data) => ({ center: data }));
};

export const getTxtPrintDetails = (user: User): RowData => ({
	left: `PDT: ${formatDateTime(dayjs(), false)} ${user?.employee_id}`,
});

export const getTxtFooter = (siteSettings: SiteSettings): RowData[] => {
	const {
		software_developer: softwareDeveloper,
		software_developer_address: softwareDeveloperAddress = '',
		software_developer_tin: softwareDeveloperTin,
		pos_accreditation_number: posAccreditationNumber,
		pos_accreditation_date: posAccreditationDate,
		ptu_number: ptuNumber,
		ptu_date: ptuDate,
	} = siteSettings;

	const locations = softwareDeveloperAddress
		.trim()
		.split('\n')
		.map((item) => item);

	return [
		softwareDeveloper,
		...locations,
		softwareDeveloperTin,
		`Acc No: ${posAccreditationNumber}`,
		`Date Issued: ${posAccreditationDate}`,
		TXT_LINE_BREAK,
		`PTU No: ${ptuNumber}`,
		`Date Issued: ${ptuDate}`,
	]
		.filter((row) => typeof row === 'string')
		.map((data) => ({ center: data }));
};

export const getTxtItemBlock = (
	items: {
		label: string;
		value: string | number;
	}[],
): RowData[] =>
	items.map((item) => ({
		left: item.label,
		right: item.value,
	}));

export const writeFile = (
	rowData: (string | RowData)[],
	reportTextFile: ReportTextFile,
) => {
	let rowNumber = 0;

	console.log('rowData', rowData);

	rowData.forEach((row) => {
		console.log('rowNumber', rowNumber);
		if (row === TXT_LINE_BREAK) {
			rowNumber += 1;
		} else if (typeof row === 'string') {
			reportTextFile.write({
				text: row,
				alignment: ReportTextFile.ALIGNMENTS.LEFT,
				rowNumber,
			});
		} else {
			if (row?.left) {
				reportTextFile.write({
					text: row.left.toString(),
					alignment: ReportTextFile.ALIGNMENTS.LEFT,
					rowNumber,
				});
			}

			if (row?.center) {
				reportTextFile.write({
					text: row.center.toString(),
					alignment: ReportTextFile.ALIGNMENTS.CENTER,
					rowNumber,
				});
			}

			if (row?.right) {
				reportTextFile.write({
					text: row.right.toString(),
					alignment: ReportTextFile.ALIGNMENTS.RIGHT,
					rowNumber,
				});
			}
		}

		rowNumber += 1;
	});
};
