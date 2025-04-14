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

	console.log('branch', branch);
	console.log('branch_machine', branchMachine);

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
				<span style={{ whiteSpace: 'pre-line' }}>
					{branchMachine?.branch?.store_name}
				</span>
				<span style={{ whiteSpace: 'pre-line' }}>
					{branchMachine?.branch?.store_address}
				</span>
				<span>
					{[branchMachine?.branch?.contact_number, name]
						.filter(Boolean)
						.join(' | ')}
				</span>
				<span>{branchMachine?.branch?.proprietor}</span>
				<span>{getTaxTypeDescription(branchMachine?.branch?.vat_type)}</span>
				<span>{branchMachine?.branch?.tin}</span>
				{machineID && <span>MIN: {machineID}</span>}
				{posTerminal && <span>SN: {posTerminal}</span>}
				{permit_to_use && <span>PTU No: {permit_to_use}</span>}
				{ptuDateIssued && <span>Date Issued: {ptuDateIssued}</span>}
				{title ? <br /> : ''}
				{title}
			</div>
		</>
	);
};
