import React from 'react';
import { cn } from '../../utils';

type Props = {
	className?: string;
};

export const Divider = ({ className }: Props) => (
	<div
		className={cn(
			'mt-6 mb-6 border-b-[1px] border-dashed border-black',
			className,
		)}
	></div>
);
