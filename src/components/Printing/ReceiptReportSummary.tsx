import React from 'react';

interface Props {
	data: Record<'label' | 'value', string | number>[];
}

export const ReceiptReportSummary = ({ data }: Props) => (
	<table className="ml-12">
		{data.map((d) => (
			<tr key={d.value}>
				<td className="w-[100px]">{d.label}:</td>
				<td className="text-right">{d.value}</td>
			</tr>
		))}
	</table>
);
