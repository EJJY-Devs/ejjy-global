import { BranchMachine, SiteSettings } from '../types';
import { ReportTextFile, getTaxTypeDescription } from '../utils';

export const writeHeader = (
	reportTextFile: ReportTextFile,
	siteSettings: SiteSettings,
	branchMachine: BranchMachine,
	rowNumber: number,
	title?: string,
) => {
	const {
		contact_number: contactNumber,
		address_of_tax_payer: location,
		proprietor,
		store_name: storeName,
		tax_type: taxType,
		tin,
	} = siteSettings;
	const {
		name,
		machine_identification_number: machineID,
		pos_terminal: posTerminal,
	} = branchMachine;

	if (storeName) {
		const storeNames = storeName.trim().split('\n');
		storeNames.forEach((item) => {
			reportTextFile.write({
				text: item,
				alignment: ReportTextFile.ALIGNMENTS.CENTER,
				rowNumber,
			});
			rowNumber += 1;
		});
	}

	if (location) {
		const locations = location.trim().split('\n');
		locations.forEach((item) => {
			reportTextFile.write({
				text: item,
				alignment: ReportTextFile.ALIGNMENTS.CENTER,
				rowNumber,
			});
			rowNumber += 1;
		});
	}

	reportTextFile.write({
		text: `${contactNumber} | ${name}`,
		alignment: ReportTextFile.ALIGNMENTS.CENTER,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: proprietor,
		alignment: ReportTextFile.ALIGNMENTS.CENTER,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: `${getTaxTypeDescription(taxType)} | ${tin}`,
		alignment: ReportTextFile.ALIGNMENTS.CENTER,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: `MIN: ${machineID}`,
		alignment: ReportTextFile.ALIGNMENTS.CENTER,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: `SN: ${posTerminal}`,
		alignment: ReportTextFile.ALIGNMENTS.CENTER,
		rowNumber,
	});
	rowNumber += 1;

	if (title) {
		rowNumber += 1;
		reportTextFile.write({
			text: `[${title}]`,
			alignment: ReportTextFile.ALIGNMENTS.CENTER,
			rowNumber,
		});
	}

	return rowNumber;
};

export const writeFooter = (
	reportTextFile: ReportTextFile,
	siteSettings: SiteSettings,
	rowNumber: number,
) => {
	const {
		software_developer: softwareDeveloper,
		software_developer_address: softwareDeveloperAddress,
		software_developer_tin: softwareDeveloperTin,
		pos_accreditation_number: posAccreditationNumber,
		pos_accreditation_date: posAccreditationDate,
		ptu_number: ptuNumber,
		ptu_date: ptuDate,
	} = siteSettings;

	reportTextFile.write({
		text: softwareDeveloper,
		alignment: ReportTextFile.ALIGNMENTS.CENTER,
		rowNumber,
	});
	rowNumber += 1;

	if (softwareDeveloperAddress) {
		const locations = softwareDeveloperAddress.trim().split('\n');
		locations.forEach((name) => {
			reportTextFile.write({
				text: name,
				alignment: ReportTextFile.ALIGNMENTS.CENTER,
				rowNumber,
			});
			rowNumber += 1;
		});
	}

	reportTextFile.write({
		text: softwareDeveloperTin,
		alignment: ReportTextFile.ALIGNMENTS.CENTER,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: `Acc No: ${posAccreditationNumber}`,
		alignment: ReportTextFile.ALIGNMENTS.CENTER,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: `Validity: ${posAccreditationDate}`,
		alignment: ReportTextFile.ALIGNMENTS.CENTER,
		rowNumber,
	});
	rowNumber += 1;
	rowNumber += 1;

	reportTextFile.write({
		text: `PTU No: ${ptuNumber}`,
		alignment: ReportTextFile.ALIGNMENTS.CENTER,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: `Date Issued: ${ptuDate}`,
		alignment: ReportTextFile.ALIGNMENTS.CENTER,
		rowNumber,
	});
	rowNumber += 1;

	return rowNumber;
};
