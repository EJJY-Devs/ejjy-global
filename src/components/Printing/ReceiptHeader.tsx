import React from 'react';
import { BranchMachine, SiteSettings } from '../../types';
import { getTaxTypeDescription } from '../../utils';

export type ReceiptHeaderProps = {
	branchMachine?: BranchMachine;
	siteSettings: SiteSettings;
	title?: string;
};

const globalStyles = React.createElement('style', {}, [
	`
  table {
    font-size: inherit;
  }

  td {
    padding: 0;
  }
  `,
]);

export const ReceiptHeader = ({
	branchMachine,
	siteSettings,
	title,
}: ReceiptHeaderProps) => {
	const {
		contact_number: contactNumber,
		address_of_tax_payer: location,
		proprietor,
		store_name: storeName,
		tax_type: taxType,
		tin,
	} = siteSettings || {};

	const {
		name,
		machine_identification_number: machineID = '',
		pos_terminal: posTerminal = '',
	} = branchMachine || {};

	return (
		<>
			{globalStyles}
			<div
				style={{
					textAlign: 'center',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<span style={{ whiteSpace: 'pre-line' }}>{storeName}</span>
				<span style={{ whiteSpace: 'pre-line' }}>{location}</span>
				<span>{[contactNumber, name].filter(Boolean).join(' | ')}</span>
				<span>{proprietor}</span>
				<span>{getTaxTypeDescription(taxType)}</span>
				<span>{tin}</span>
				{machineID && <span>MIN: {machineID}</span>}
				{posTerminal && <span>SN: {posTerminal}</span>}

				{title ? <br /> : ''}
				{title}
			</div>
		</>
	);
};
