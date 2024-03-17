import { Descriptions } from 'antd';
import React from 'react';
import { ReceiptUnderlinedValue } from './ReceiptUnderlinedValue';

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
	<Descriptions
		className="w-full"
		colon={false}
		column={1}
		contentStyle={{ textAlign: 'right', display: 'block' }}
		labelStyle={{ width: 200 }}
		size="small"
	>
		{items.map((item) => (
			<Descriptions.Item
				key={item.label}
				label={item.label}
				labelStyle={{
					paddingLeft: item.isIndented ? 30 : 0,
					...item.labelStyle,
				}}
				contentStyle={item.contentStyle}
			>
				{item.isParenthesized ? '(' : ' '}
				{item.isUnderlined ? (
					<ReceiptUnderlinedValue value={item.value as number} />
				) : (
					item.value
				)}
				{item.isParenthesized ? ')' : ' '}
			</Descriptions.Item>
		))}
	</Descriptions>
);
