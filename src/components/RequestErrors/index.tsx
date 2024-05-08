import cn from 'classnames';
import React from 'react';
import { FieldError } from '../elements';

type Props = {
	className?: string;
	errors: string[];
	withSpaceTop?: boolean;
	withSpaceBottom?: boolean;
};

export const RequestErrors = ({
	className,
	errors,
	withSpaceTop,
	withSpaceBottom,
}: Props) => (
	<div
		className={cn('flex w-full flex-col', className, {
			'mt-4': withSpaceTop,
			'mb-4': withSpaceBottom,
		})}
	>
		{errors
			?.filter(Boolean)
			?.map((error, index) => <FieldError key={index} message={error} />)}
	</div>
);
