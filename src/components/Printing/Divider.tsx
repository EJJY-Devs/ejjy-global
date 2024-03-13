import React from 'react';

type Props = {
	className?: string;
};

export const Divider = ({ className }: Props) => (
	<div
		className={
			'mt-6 mb-6 border-b-[1px] border-dashed border-black w-[80%] mx-auto'
		}
	></div>
);
