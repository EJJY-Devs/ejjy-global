import { CloseCircleOutlined } from '@ant-design/icons';
import cn from 'classnames';
import { FormikErrors } from 'formik';
import * as React from 'react';

interface Props {
	message: string | FormikErrors<any> | string[] | FormikErrors<any>[];
	classNames?: string;
	withSpaceTop?: boolean;
	withSpaceBottom?: boolean;
}

const FieldError = ({
	message,
	classNames,
	withSpaceTop,
	withSpaceBottom,
}: Props) => (
	<div
		className={cn(
			'my-1 flex items-center',
			{
				'mt-2': withSpaceTop,
				'mb-4': withSpaceBottom,
			},
			classNames,
		)}
	>
		<CloseCircleOutlined className="text-red-600 text-sm" />
		<span className="ml-1 text-red-600 text-xs">{message}</span>
	</div>
);

export default FieldError;
