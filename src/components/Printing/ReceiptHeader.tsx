import { Space, Typography } from 'antd';
import React from 'react';
import { BranchMachine, SiteSettings } from '../../types';
import { getTaxTypeDescription } from '../../utils';

const { Text } = Typography;

interface Props {
	branchMachine: BranchMachine;
	siteSettings: SiteSettings;
	title?: string;
}

export const ReceiptHeader = ({
	branchMachine,
	siteSettings,
	title,
}: Props) => {
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

	return (
		<Space
			align="center"
			className="w-full text-center"
			direction="vertical"
			size={0}
		>
			<Text style={{ whiteSpace: 'pre-line' }}>{storeName}</Text>
			<Text style={{ whiteSpace: 'pre-line' }}>{location}</Text>
			<Text>{[contactNumber, name].filter(Boolean).join(' | ')}</Text>
			<Text>{proprietor}</Text>
			<Text>
				{[getTaxTypeDescription(taxType), tin].filter(Boolean).join(' | ')}
			</Text>
			<Text>{machineID}</Text>
			<Text>{posTerminal}</Text>

			{title && (
				<>
					<br />
					<Text>[{title}]</Text>
				</>
			)}
		</Space>
	);
};
