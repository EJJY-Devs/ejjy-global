import React from 'react';

type Props = {
	items: Record<'label' | 'value', string | number>[];
};

export const ReceiptReportSummary = ({ items }: Props) => (
	<table style={{ marginLeft: 15 }}>
		{items.map((item) => (
			<tr key={item.value}>
				<td style={{ width: 120 }}>{item.label}:</td>
				<td style={{ textAlign: 'right' }}>{item.value}</td>
			</tr>
		))}
	</table>
);
