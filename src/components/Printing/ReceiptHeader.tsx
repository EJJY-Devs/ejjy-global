import React from 'react';
import { BranchMachine } from '../../types';
import { getTaxTypeDescription } from '../../utils';

export type ReceiptHeaderProps = {
	branchMachine?: BranchMachine;
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

export const ReceiptHeader = ({ branchMachine, title }: ReceiptHeaderProps) => {
	const {
		name,
		machine_identification_number: machineID,
		pos_terminal: posTerminal,
		branch,
		ptu_date_issued: ptuDateIssued,
		permit_to_use,
	} = branchMachine || {};

	const {
		store_name,
		store_address,
		proprietor,
		tax_type,
		tin,
		contact_number,
	} = branch || {};

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
				<span style={{ whiteSpace: 'pre-line' }}>{store_name}</span>
				<span style={{ whiteSpace: 'pre-line' }}>{store_address}</span>
				<span>{[contact_number, name].filter(Boolean).join(' | ')}</span>
				<span>{proprietor}</span>
				<span>{getTaxTypeDescription(tax_type)}</span>
				<span>{tin}</span>
				{machineID && <span>MIN: {machineID}</span>}
				{posTerminal && <span>SN: {posTerminal}</span>}
				{permit_to_use} && <span>PTU No: {permit_to_use}</span>
				{ptuDateIssued} && <span>Date Issued: {ptuDateIssued}</span>
				{title ? <br /> : ''}
				{title}
			</div>
		</>
	);
};
