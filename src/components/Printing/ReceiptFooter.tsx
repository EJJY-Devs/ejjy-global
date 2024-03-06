import { Space, Typography } from 'antd';
import React from 'react';
import { SiteSettings } from '../../types';

const { Text } = Typography;

interface Props {
	siteSettings: SiteSettings;
}

export const ReceiptFooter = ({ siteSettings }: Props) => {
	const {
		software_developer: softwareDeveloper,
		software_developer_address: softwareDeveloperAddress,
		software_developer_tin: softwareDeveloperTin,
		pos_accreditation_number: posAccreditationNumber,
		pos_accreditation_date: posAccreditationDate,
		ptu_number: ptuNumber,
		ptu_date: ptuDate,
	} = siteSettings;

	return (
		<Space
			align="center"
			className="mt-8 w-100 text-center"
			direction="vertical"
			size={0}
		>
			<Text>{softwareDeveloper}</Text>
			<Text style={{ whiteSpace: 'pre-line' }}>{softwareDeveloperAddress}</Text>
			<Text>{softwareDeveloperTin}</Text>
			<Text>Acc No: {posAccreditationNumber}</Text>
			<Text>Validity: {posAccreditationDate}</Text>
			<br />
			<Text>PTU No: {ptuNumber}</Text>
			<Text>Date Issued: {ptuDate}</Text>
		</Space>
	);
};
