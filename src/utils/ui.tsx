import { Input, Modal, Space, Typography, message } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
import axios, { AxiosError } from 'axios';
import _ from 'lodash';
import React from 'react';
import { FieldError } from '../components';
import {
	EMPTY_CELL,
	OSDRStatus,
	SpecialDiscountCode,
	attendanceCategories,
	cashBreakdownCategories,
	cashBreakdownTypes,
	orderSlipStatus,
	paymentTypes,
	specialDiscountCodes,
	transactionStatuses,
	userTypes,
	invoiceTypes
} from '../globals';
import { UsersService } from '../services';
import {
	AttendanceLogCategory,
	AttendanceLogType,
	CashBreakdownCategory,
	CashBreakdownType,
	CashieringTransactionProduct,
	PaymentType,
	Product,
	RequisitionSlip,
	TaxType,
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
				description = 'Opening Fund';
				break;
			case cashBreakdownTypes.MID_SESSION:
				description = 'Cash Collection';
				break;
			case cashBreakdownTypes.END_SESSION:
				description = 'Cash in Drawer';
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
	} else if (modeOfPayment === paymentTypes.CHECK) {
		description = 'Check';
	} else {
		description = 'Others';
	}

	return description;
};

export const getInvoiceType = (invoiceType: string) => {
	let description;

	if (invoiceType === invoiceTypes.SALES_INVOICE) {
		description = 'Sales Invoice'
	} else {
		description = 'Charge Invoice'
	}

	return description;
}

export const getTaxTypeDescription = (taxType?: TaxType) => {
	let data = '';

	if (taxType === 'VAT') {
		data = 'VAT REG TIN';
	} else if (taxType === 'NVAT') {
		data = 'NON VAT REG TIN';
	}

	return data;
};

export const getTransactionStatusDescription = (status: string) => {
	switch (status) {
		case transactionStatuses.NEW: {
			return 'New';
		}
		case transactionStatuses.FULLY_PAID: {
			return 'Fully Paid';
		}
		case transactionStatuses.QUEUE: {
			return 'Hold';
		}
		case transactionStatuses.VOID_CANCELLED: {
			return 'Cancelled';
		}
		case transactionStatuses.VOID_EDITED: {
			return 'Edited';
		}
		default: {
			return EMPTY_CELL;
		}
	}
};

export const getRequestor = (requisitionSlip: RequisitionSlip) => {
	const user = requisitionSlip?.requesting_user || {};

	const data = [];
	if (user) {
		data.push(getFullName(user));
	}

	if (user.branch) {
		data.push(user.branch.name);
	}

	return data.join(' - ');
};

export const getProductCode = (product: Product) =>
	product?.barcode ||
	product?.selling_barcode ||
	product?.textcode ||
	EMPTY_CELL;

export const getOrderSlipStatusBranchManagerText = (
	status: string,
	percentage?: number,
	osdrStatus?: string,
) => {
	switch (status) {
		case orderSlipStatus.PREPARING: {
			return `Preparing (${percentage}%)`;
		}
		case orderSlipStatus.PREPARED: {
			return 'Prepared';
		}
		case orderSlipStatus.DELIVERED: {
			return 'Delivered';
		}
		case orderSlipStatus.RECEIVED: {
			if (osdrStatus === OSDRStatus.DONE) {
				return 'Received (Done)';
			}

			if (osdrStatus === OSDRStatus.ERROR) {
				return 'Received (Error)';
			}

			return 'Received';
		}
		default:
			return '';
	}
};

// Others

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
type AuthorizationProps = {
	title?: string;
	description?: string;
	userTypes?: string[];
	onSuccess: () => void;
};

export const authorization = ({
	title = 'Authorization',
	description = 'Authorize',
	userTypes = [],
	onSuccess,
}: AuthorizationProps) => {
	let username = '';
	let password = '';

	Modal.confirm({
		title,
		centered: true,
		className: 'Modal__hasFooter',
		okText: 'Submit',
		content: (
			<Space className="w-full" direction="vertical">
				<>
					<Typography.Text>Username</Typography.Text>
					<Input
						onChange={(event) => {
							username = event.target.value.trim();
						}}
					/>
				</>

				<>
					<Typography.Text>Password</Typography.Text>
					<Input.Password
						onChange={(event) => {
							password = event.target.value.trim();
						}}
					/>
				</>
			</Space>
		),
		onOk: async (close) => {
			try {
				if (!username || !password) {
					throw new Error('Please input username and password.');
				}

				const response = await UsersService.authenticateAnAction({
					login: username,
					password,
					description,
				});

				if (response.status !== 200) {
					throw new Error('Incorrect username or password.');
				}

				if (
					userTypes.length &&
					!userTypes.includes(String(response.data.user_type))
				) {
					throw new Error('User is not allowed.');
				}

				onSuccess();
				close();
			} catch (err: any) {
				let errorMessage = '';

				if (err instanceof Error) {
					errorMessage = err.message;
				} else {
					errorMessage = (err as AxiosError).response?.data;
				}

				console.log(err);

				if (errorMessage) {
					message.error(errorMessage);
				}

				return Promise.reject(true);
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

export type NaacFields = {
	coach: string;
	id: string;
};

export type SPFields = {
	name: string;
	id: string;
	childName: string;
	childBirthdate: string;
	childAge: string;
};

export type PWDFields = {
	name: string;
	id: string;
	tin: string;
};

export type SCFields = {
	name: string;
	id: string;
	tin: string;
};

export const getDiscountFields = (
	discountCode: SpecialDiscountCode,
	fieldsJSON: string,
) => {
	const fields = JSON.parse(fieldsJSON);

	const lowerDiscountCode = discountCode.toLowerCase();

	if (
		lowerDiscountCode ===
		specialDiscountCodes.NATIONAL_ATHLETES_AND_COACHES.toLowerCase()
	) {
		return {
			id: fields?.['PNSTM ID'] || EMPTY_CELL,
			coach: fields?.['Name'] || EMPTY_CELL,
		} as NaacFields;
	} else if (
		lowerDiscountCode === specialDiscountCodes.SOLO_PARENTS.toLowerCase()
	) {
		return {
			id: fields?.['SPIC No.'] || EMPTY_CELL,
			name: fields?.['Name of Parent'] || EMPTY_CELL,
			childName: fields?.['Name of Child'] || EMPTY_CELL,
			childBirthdate: fields?.['Birth Date of Child'] || EMPTY_CELL,
			childAge: fields?.['Age of Child'] || EMPTY_CELL,
		} as SPFields;
	} else if (
		lowerDiscountCode === specialDiscountCodes.SENIOR_CITIZEN.toLowerCase()
	) {
		return {
			name: fields?.['Name'] || EMPTY_CELL,
			id: fields?.['ID no.'] || EMPTY_CELL,
			tin: fields?.['TIN'] || EMPTY_CELL,
		} as SCFields;
	} else if (
		lowerDiscountCode ===
		specialDiscountCodes.PERSONS_WITH_DISABILITY.toLowerCase()
	) {
		return {
			name: fields?.['Name'] || EMPTY_CELL,
			id: fields?.['ID no.'] || EMPTY_CELL,
			tin: fields?.['TIN'] || EMPTY_CELL,
		} as PWDFields;
	}
};

// Others
export const isUserFromBranch = (userType: UserType) =>
	[userTypes.BRANCH_MANAGER, userTypes.BRANCH_PERSONNEL].includes(userType);

export const isDualType = (product: Product) =>
	product.barcode && product.selling_barcode;
