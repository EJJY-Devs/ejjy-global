import cn from 'classnames';
import React from 'react';
import { FieldError } from '../elements';

interface Props {
	className?: string;
	errors: string[];
	withSpaceTop?: boolean;
	withSpaceBottom?: boolean;
}

export const RequestErrors = ({
	className,
	errors,
	withSpaceTop,
	withSpaceBottom,
}: Props) => (
	<div
		className={cn('w-full flex flex-col', className, {
			'mt-4': withSpaceTop,
			'mb-4': withSpaceBottom,
		})}
	>
		{errors?.filter(Boolean)?.map((error, index) => (
			<FieldError key={index} error={error} />
		))}
	</div>
);
