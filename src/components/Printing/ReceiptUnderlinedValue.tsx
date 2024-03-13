import React, { ReactNode } from 'react';
import { formatInPeso } from '../../utils';

interface Props {
	value: number;
	prefix?: string | ReactNode;
	postfix?: string | ReactNode;
}

export const ReceiptUnderlinedValue = ({ value, prefix, postfix }: Props) => (
	<>
		<span className="inline-block">
			{prefix}
			{formatInPeso(value)}
			{postfix}
		</span>

		{Number(value) > 0 && (
			<div className="w-full text-right leading-none">-----------</div>
		)}
	</>
);
