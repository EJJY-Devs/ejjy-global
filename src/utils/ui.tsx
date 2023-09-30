import { Input, Modal, Space, Typography, message } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
import _ from 'lodash';
import React, { useState } from 'react';
import {
	attendanceCategories,
	cashBreakdownCategories,
	cashBreakdownTypes,
	paymentTypes,
	userTypes,
} from '../globals';
import {
	AttendanceLogCategory,
	AttendanceLogType,
	CashBreakdownCategory,
	CashBreakdownType,
	CashieringTransactionProduct,
	PaymentType,
	Product,
	UserType,
} from '../types';

// Getters
export const getSubtotal = (products: CashieringTransactionProduct[]) => {
	let amount = 0;

	products.forEach(({ price_per_piece, quantity }) => {
		amount += Number(price_per_piece) * Number(quantity);
	});

	return amount;
};

export const getFullName = (user: any) => {
	const name = [user?.first_name, user?.middle_name, user?.last_name].filter(
		Boolean,
	);

	return name.join(' ');
};

export const getKeyDownCombination = (keyboardEvent: KeyboardEvent) => {
	let firstKey = '';

	if (keyboardEvent?.altKey) {
		firstKey = 'alt+';
	}

	if (keyboardEvent?.ctrlKey) {
		firstKey = 'ctrl+';
	}

	if (keyboardEvent?.metaKey) {
		firstKey = 'meta+';
	}

	if (keyboardEvent?.shiftKey) {
		firstKey = 'shift+';
	}

	return firstKey + keyboardEvent?.key;
};

export const getUserTypeDescription = (userType: UserType) => {
	switch (userType) {
		case userTypes.ADMIN:
			return 'Admin';
		case userTypes.BRANCH_MANAGER:
			return 'Branch Manager';
		case userTypes.BRANCH_PERSONNEL:
			return 'Branch Personnel';
		case userTypes.OFFICE_MANAGER:
			return 'Office Manager';
		default:
			return '';
	}
};

export const getCashBreakdownTypeDescription = (
	category: CashBreakdownCategory,
	type: CashBreakdownType,
) => {
	let description = '';

	if (category === cashBreakdownCategories.CASH_BREAKDOWN) {
		switch (type) {
			case cashBreakdownTypes.START_SESSION:
				description = 'Start Session';
				break;
			case cashBreakdownTypes.MID_SESSION:
				description = 'Cash Collection';
				break;
			case cashBreakdownTypes.END_SESSION:
				description = 'End Session';
				break;
			default:
				description = '';
		}
	} else if (category === cashBreakdownCategories.CASH_IN) {
		description = 'Petty Cash | Cash In';
	}

	return description;
};

export const getAttendanceLogDescription = (
	category: AttendanceLogCategory,
	type: AttendanceLogType,
) => {
	let description = '';

	if (category === attendanceCategories.ATTENDANCE) {
		description = 'Clock';
	} else if (category === attendanceCategories.TRACKER) {
		description = 'Time';
	}

	return `${description} ${_.upperFirst(type)}`;
};

export const getModeOfPaymentDescription = (modeOfPayment: PaymentType) => {
	let description;

	if (modeOfPayment === paymentTypes.CASH) {
		description = 'Cash';
	} else if (modeOfPayment === paymentTypes.CREDIT) {
		description = 'Charge';
	} else if (modeOfPayment === paymentTypes.CHEQUE) {
		description = 'Cheque';
	}

	return description;
};

export const filterOption = (
	input: string,
	option?: DefaultOptionType | undefined,
) => {
	if (option?.children) {
		return (
			option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
		);
	}

	return false;
};

// Messages
interface Authorization {
	title?: string;
	onSuccess: () => void;
}

export const authorization = ({
	title = 'Input Password',
	onSuccess,
}: Authorization) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	Modal.confirm({
		title,
		centered: true,
		className: 'Modal__hasFooter',
		okText: 'Submit',
		content: (
			<Space className="w-100" direction="vertical">
				<>
					<Typography.Text>Username</Typography.Text>
					<Input
						value={username}
						onChange={(event) => {
							setUsername(event.target.value);
						}}
					/>
				</>

				<>
					<Typography.Text>Password</Typography.Text>
					<Input.Password
						value={password}
						onChange={(event) => {
							setPassword(event.target.value);
						}}
					/>
				</>
			</Space>
		),
		onOk: (close) => {
			if (username === 'admin' && password === 'generic123') {
				onSuccess();
				close();
			} else {
				message.error('Incorrect username/password');
			}
		},
	});
};

export const showErrorMessages = (errors: string | string[]) => {
	if (typeof errors === 'string' && errors.length > 0) {
		message.error(errors);
	} else if (Array.isArray(errors) && errors.length > 0) {
		errors.forEach((error) => message.error(error));
	}
};

// Others
export const isUserFromBranch = (userType: UserType) =>
	[userTypes.BRANCH_MANAGER, userTypes.BRANCH_PERSONNEL].includes(userType);

export const isDualType = (product: Product) =>
	product.barcode && product.selling_barcode;
