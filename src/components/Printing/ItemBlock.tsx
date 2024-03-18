import React from 'react';
import { PESO_SIGN } from '../../print/helper-receipt';
import { formatInPeso } from '../../utils';

export type ItemBlockItems = {
	label: string;
	value: string | number | React.ReactElement;
	labelStyle?: React.CSSProperties;
	contentStyle?: React.CSSProperties;
	isIndented?: boolean;
	isUnderlined?: boolean;
	isParenthesized?: boolean;
};

export type ItemBlockProps = {
	items: ItemBlockItems[];
};

export const ItemBlock = ({ items }: ItemBlockProps) => (
	<table style={{ width: '100%' }}>
		{items.map((item) => (
			<tr>
				<td
					style={{ paddingLeft: item.isIndented ? 15 : 0, ...item.labelStyle }}
				>
					{item.label}
				</td>
				<td style={{ textAlign: 'right', ...item.contentStyle }}>
					{item.isParenthesized ? '(' : ' '}
					{item.isUnderlined ? (
						<>
							<div style={{ display: 'inline-block' }}>
								{formatInPeso(item.value as number, PESO_SIGN)}
							</div>
							{Number(item.value) > 0 && (
								<div style={{ width: '100%', textAlign: 'right' }}>
									-----------
								</div>
							)}
						</>
					) : (
						item.value
					)}
					{item.isParenthesized ? ')' : ' '}
				</td>
			</tr>
		))}
	</table>
);
