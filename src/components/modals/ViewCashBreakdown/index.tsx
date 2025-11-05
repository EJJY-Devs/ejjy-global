import { PrinterOutlined } from '@ant-design/icons';
import { Button, Descriptions, Modal } from 'antd';
import React from 'react';
import { cashBreakdownCategories } from '../../../globals';
import { usePdf } from '../../../hooks';
import { printCashBreakdown, printCashOut } from '../../../print';
import { CashBreakdown, SiteSettings, User } from '../../../types';
import {
	formatDateTime,
	formatInPeso,
	getCashBreakdownTypeDescription,
	getFullName,
} from '../../../utils';
import { PdfButtons, ReceiptFooter, ReceiptHeader } from '../../Printing';
import { CashBreakdownContent } from './CashBreakdownContent';
import { PrintDetails } from '../../Printing/PrintDetails';

type Props = {
	cashBreakdown: CashBreakdown;
	siteSettings: SiteSettings;
	user?: User;
	onClose: () => void;
};

export const ViewCashBreakdownModal = ({
	cashBreakdown,
	siteSettings,
	user,
	onClose,
}: Props) => {
	// VARIABLES
	const type = getCashBreakdownTypeDescription(
		cashBreakdown.category,
		cashBreakdown.type,
	);

	// CUSTOM HOOKS
	const { htmlPdf, isLoadingPdf, previewPdf, downloadPdf } = usePdf({
		title: `${
			cashBreakdown.category === cashBreakdownCategories.CASH_OUT
				? 'CashOut'
				: 'CashBreakdown'
		}_${cashBreakdown.id}.pdf`,
		print: () => {
			if (cashBreakdown.category === cashBreakdownCategories.CASH_OUT) {
				return printCashOut(cashBreakdown, siteSettings, true);
			}

			return printCashBreakdown({
				cashBreakdown,
				siteSettings,
				user,
				isPdf: true,
			});
		},
	});

	// METHODS
	const handlePrint = () => {
		if (cashBreakdown.category === cashBreakdownCategories.CASH_OUT) {
			printCashOut(cashBreakdown, siteSettings);
		} else {
			printCashBreakdown({
				cashBreakdown,
				siteSettings,
				user,
			});
		}
	};

	return (
		<Modal
			className="Modal__hasFooter"
			footer={[
				<Button
					key="print"
					disabled={isLoadingPdf}
					icon={<PrinterOutlined />}
					type="primary"
					onClick={handlePrint}
				>
					Print
				</Button>,
				<PdfButtons
					key="pdf"
					downloadPdf={downloadPdf}
					isDisabled={isLoadingPdf}
					isLoading={isLoadingPdf}
					previewPdf={previewPdf}
				/>,
			]}
			title={`[View] ${type}`}
			centered
			closable
			open
			onCancel={onClose}
		>
			{cashBreakdown.category === cashBreakdownCategories.CASH_OUT ? (
				<CashOutDetails
					cashBreakdown={cashBreakdown}
					siteSettings={siteSettings}
					user={user}
				/>
			) : (
				<CashBreakdownContent
					cashBreakdown={cashBreakdown}
					siteSettings={siteSettings}
				/>
			)}

			<div
				dangerouslySetInnerHTML={{ __html: htmlPdf }}
				style={{ display: 'none' }}
			/>
		</Modal>
	);
};

const CashOutDetails = ({
	cashBreakdown,
	siteSettings,
	user,
}: {
	cashBreakdown: CashBreakdown;
	siteSettings: SiteSettings;
	user?: User;
}) => {
	const cashOut = cashBreakdown.cash_out_metadata;

	return (
		<>
			<ReceiptHeader branchMachine={cashBreakdown.branch_machine} />
			<br />

			<Descriptions
				className="w-100"
				column={1}
				labelStyle={{ width: 200 }}
				bordered
			>
				<Descriptions.Item label="Datetime">
					{formatDateTime(cashBreakdown.datetime_created)}
				</Descriptions.Item>
				<Descriptions.Item label="Payee">{cashOut.payee}</Descriptions.Item>
				<Descriptions.Item label="Particulars">
					{cashOut.particulars}
				</Descriptions.Item>
				<Descriptions.Item label="Amount">
					{formatInPeso(cashOut.amount)}
				</Descriptions.Item>
				<Descriptions.Item label="Prepared By">
					{getFullName(cashOut.prepared_by_user)}
				</Descriptions.Item>
				<Descriptions.Item label="Approved By">
					{getFullName(cashOut.approved_by_user)}
				</Descriptions.Item>
				<Descriptions.Item label="Received By">
					{cashOut.received_by}
				</Descriptions.Item>
			</Descriptions>

			<div>GDT: {formatDateTime(cashBreakdown.datetime_created)}</div>
			<PrintDetails user={user} />

			<br />

			<ReceiptFooter siteSettings={siteSettings} />
		</>
	);
};
