import React from 'react';
import { Branch, BranchMachine } from '../../types';
import { getTaxTypeDescription } from '../../utils';

export type ReceiptHeaderProps = {
	branchMachine?: BranchMachine;
	title?: string;
	branchHeader?: Branch;
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
	title,
	branchHeader,
}: ReceiptHeaderProps) => {
	const {
		name,
		machine_identification_number: machineID,
		pos_terminal: posTerminal,
		branch,
		ptu_date_issued: ptuDateIssued,
		permit_to_use,
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
				{/* BranchHeader is for reports without a branchMachine */}
				<span style={{ whiteSpace: 'pre-line' }}>
					{(branch ?? branchHeader)?.store_name}
				</span>
				<span style={{ whiteSpace: 'pre-line' }}>
					{(branch ?? branchHeader)?.store_address}
				</span>
				<span>
					{[(branch ?? branchHeader)?.contact_number, name]
						.filter(Boolean)
						.join(' | ')}
				</span>
				<span>{(branch ?? branchHeader)?.proprietor}</span>
				<span>
					{[
						getTaxTypeDescription((branch ?? branchHeader)?.vat_type),
						(branch ?? branchHeader)?.tin,
					]
						.filter(Boolean)
						.join(' | ')}
				</span>
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
