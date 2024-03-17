import React from 'react';

type Props = {
	items: Record<'label' | 'value', string | number>[];
};

export const ReceiptReportSummary = ({ items }: Props) => (
	<table className="ml-12">
		{items.map((d) => (
			<tr key={d.value}>
				<td className="w-[100px]">{d.label}:</td>
				<td className="text-right">{d.value}</td>
			</tr>
		))}
	</table>
);

export { Props as ReceiptReportSummaryProps };
