import { Descriptions } from 'antd';
import _ from 'lodash';
import React from 'react';
import { DiscountOption } from '../../types';
import { formatInPeso } from '../../utils';

type Props = {
	discountOption: DiscountOption;
	overallDiscount: number;
};

export const DiscountDisplay = ({ discountOption, overallDiscount }: Props) => {
	return (
		<Descriptions column={1} size="small" bordered>
			<Descriptions.Item label="Name">{discountOption.name}</Descriptions.Item>
			<Descriptions.Item label="Type">
				{_.upperFirst(discountOption.type)}{' '}
				{Number(discountOption.percentage) > 0
					? `${discountOption.percentage}%`
					: ''}
			</Descriptions.Item>
			<Descriptions.Item label="Amount">
				{formatInPeso(overallDiscount)}
			</Descriptions.Item>
		</Descriptions>
	);
};
