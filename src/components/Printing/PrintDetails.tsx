import React from 'react';
import { User } from '../../types';
import dayjs from 'dayjs';
import { formatDateTime } from '../../utils';

type Props = {
	user?: User;
};

export const PrintDetails = ({ user }: Props) => (
	<div style={{ display: 'flex' }}>
		Print Details:{' '}
		{user && (
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				{formatDateTime(dayjs(), false)}
				{user?.employee_id}
			</div>
		)}
	</div>
);
