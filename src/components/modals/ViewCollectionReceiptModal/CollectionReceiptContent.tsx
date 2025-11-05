import dayjs from 'dayjs';
import React from 'react';
import { EMPTY_CELL, orderOfPaymentPurposes } from '../../../globals';
import { PESO_SIGN } from '../../../print/helper-receipt';
import { CollectionReceipt, SiteSettings } from '../../../types';
import {
	formatDate,
	formatDateTime,
	formatInPeso,
	getFullName,
} from '../../../utils';
import { ReceiptFooter, ReceiptHeader } from '../../Printing';
import { ItemBlock } from '../../Printing/ItemBlock';

type Props = {
	collectionReceipt: CollectionReceipt;
	siteSettings: SiteSettings;
};

export const CollectionReceiptContent = ({
	collectionReceipt,
	siteSettings,
}: Props) => {
	const invoice =
		collectionReceipt.order_of_payment?.charge_sales_transaction?.invoice;
	const orderOfPayment = collectionReceipt.order_of_payment;
	const { amount } = orderOfPayment;

	let description = orderOfPayment.extra_description;
	if (orderOfPayment.purpose === orderOfPaymentPurposes.FULL_PAYMENT) {
		description = 'Full Payment';
	} else if (
		orderOfPayment.purpose === orderOfPaymentPurposes.PARTIAL_PAYMENT
	) {
		description = 'Partial Payment';
	}

	return (
		<>
			<ReceiptHeader branchMachine={collectionReceipt.branch_machine} />

			<br />

			<div style={{ textAlign: 'center' }}>[Collection Receipt]</div>

			<br />

			<div style={{ textAlign: 'center' }}>Received payment from</div>

			<ItemBlock
				items={[
					// {
					// 	label: 'Name',
					// 	value: getFullName(payor),
					// 	contentStyle: { textAlign: 'left' },
					// },
					// {
					// 	label: 'Address',
					// 	value: payor.home_address || EMPTY_CELL,
					// 	contentStyle: { textAlign: 'left' },
					// },
					// {
					// 	label: 'Tin',
					// 	value: payor.tin || EMPTY_CELL,
					// 	contentStyle: { textAlign: 'left' },
					// },
					{
						label: 'the sum of',
						value: formatInPeso(amount, PESO_SIGN),
						contentStyle: { textAlign: 'left' },
					},
					{
						label: 'Description',
						value: description || EMPTY_CELL,
						contentStyle: { textAlign: 'left' },
					},
					{
						label: 'with invoice',
						value: invoice?.or_number || EMPTY_CELL,
						contentStyle: { textAlign: 'left' },
					},
				]}
			/>

			<br />

			{collectionReceipt.check_number && (
				<>
					<div>CHECK DETAILS</div>

					<ItemBlock
						items={[
							{
								label: 'Bank',
								value: collectionReceipt.bank_name || EMPTY_CELL,
							},
							{
								label: 'Branch',
								value: collectionReceipt.bank_branch || EMPTY_CELL,
							},
							{
								label: 'Check No',
								value: collectionReceipt.check_number || EMPTY_CELL,
							},
							{
								label: 'Check Date',
								value: collectionReceipt.check_date
									? formatDate(collectionReceipt.check_date)
									: EMPTY_CELL,
							},
						]}
					/>

					<br />
				</>
			)}

			<div>GDT: {formatDateTime(collectionReceipt?.datetime_created)}</div>
			<div>PDT: {formatDateTime(dayjs(), false)}</div>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<span>ID: {collectionReceipt?.id || EMPTY_CELL}</span>
				<span style={{ textAlign: 'right' }}>
					{collectionReceipt?.created_by?.employee_id}
				</span>
			</div>

			<br />

			<ReceiptFooter siteSettings={siteSettings} />

			<div style={{ textAlign: 'center' }}>
				This Document Is Not Valid For Claim Of Input Tax
			</div>
			<div style={{ textAlign: 'center' }}>Thank You!</div>
		</>
	);
};
