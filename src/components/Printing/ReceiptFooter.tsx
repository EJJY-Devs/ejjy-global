import React from 'react';
import { SiteSettings } from '../../types';

type Props = {
	siteSettings: SiteSettings;
};

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
		<div
			style={{
				textAlign: 'center',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<span>{softwareDeveloper}</span>
			<span style={{ whiteSpace: 'pre-line' }}>{softwareDeveloperAddress}</span>
			<span>{softwareDeveloperTin}</span>
			<span>Acc No: {posAccreditationNumber}</span>
			<span>Date Issued: {posAccreditationDate}</span>
			<br />
			<span>PTU No: {ptuNumber}</span>
			<span>Date Issued: {ptuDate}</span>
		</div>
	);
};
