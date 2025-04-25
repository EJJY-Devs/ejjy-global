import React from 'react';
import { User } from '../../types';
import dayjs from 'dayjs';
import { formatDateTime } from '../../utils';

type Props = {
	user?: User;
};

export const PrintDetails = ({ user }: Props) => (
	<div>
		Print Details:{' '}
		{user && `${formatDateTime(dayjs(), false)} ${user?.employee_id}`}
	</div>
);
