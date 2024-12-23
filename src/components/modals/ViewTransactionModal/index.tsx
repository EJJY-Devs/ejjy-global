import { FileTextOutlined, PrinterOutlined } from '@ant-design/icons';
import { Button, message, Modal, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import {
	GENERIC_ERROR_MESSAGE,
	salesInvoiceTitles,
	saleTypes,
} from '../../../globals';
import { usePdf, useTransactionRetrieve } from '../../../hooks';
import { ServiceOptions } from '../../../hooks/inteface';
import { createSalesInvoiceTxt, printSalesInvoice } from '../../../print';
import { SiteSettings, Transaction } from '../../../types';
import { PdfButtons } from '../../Printing';
import { TransactionContent } from './TransactionContent';

type Props = {
	transaction: Transaction | number;
	siteSettings: SiteSettings;
	serviceOptions?: ServiceOptions;
	onClose: () => void;
};

export const ViewTransactionModal = ({
	transaction,
	siteSettings,
	serviceOptions,
	onClose,
}: Props) => {
	// STATE
	const [transactionData, setTransactionData] = useState<
		Transaction | null | undefined
	>(null);
	const [isCreatingTxt, setIsCreatingTxt] = useState(false);
	const [title, setTitle] = useState('Invoice');

	// CUSTOM HOOKS
	const { htmlPdf, isLoadingPdf, previewPdf, downloadPdf } = usePdf({
		title: `SalesInvoice_${transactionData?.invoice?.or_number}`,
		print: () => {
			if (!transactionData) {
				message.error(GENERIC_ERROR_MESSAGE);
				return undefined;
			}

			return printSalesInvoice(transactionData, siteSettings, true, true);
		},
	});
	const { data: transactionRetrieved, isFetching } = useTransactionRetrieve({
		id: typeof transaction === 'number' ? transaction : transaction.id,
		options: { enabled: typeof transaction === 'number' },
		serviceOptions,
	});

	// METHODS
	useEffect(() => {
		// Set transaction
		const newTransaction =
			typeof transaction === 'number' ? transactionRetrieved : transaction;
		setTransactionData(newTransaction);

		// Set title
		if (newTransaction?.id) {
			if (newTransaction.payment.mode === saleTypes.CASH) {
				setTitle(salesInvoiceTitles.CASH);
			} else if (newTransaction.payment.mode === saleTypes.CREDIT) {
				setTitle(salesInvoiceTitles.CHARGE);
			}
		}
	}, [transactionRetrieved, transaction]);

	const handlePrint = () => {
		if (!transactionData) {
			message.error(GENERIC_ERROR_MESSAGE);
			return;
		}

		printSalesInvoice(transactionData, siteSettings, true);
	};

	const handleCreateTxt = () => {
		if (!transactionData) {
			message.error(GENERIC_ERROR_MESSAGE);
			return;
		}

		setIsCreatingTxt(true);
		createSalesInvoiceTxt(transactionData, siteSettings, true);
		setIsCreatingTxt(false);
	};

	return (
		<Modal
			footer={[
				<Button
					key="print"
					disabled={isLoadingPdf || isCreatingTxt}
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
				<Button
					key="txt"
					disabled={isLoadingPdf || isCreatingTxt}
					icon={<FileTextOutlined />}
					loading={isCreatingTxt}
					type="primary"
					onClick={handleCreateTxt}
				>
					Create TXT
				</Button>,
			]}
			title={title}
			width={425}
			centered
			closable
			open
			onCancel={onClose}
		>
			<Spin spinning={isFetching}>
				{transactionData?.id && (
					<TransactionContent
						transaction={transactionData}
						siteSettings={siteSettings}
					/>
				)}
			</Spin>

			<div
				dangerouslySetInnerHTML={{ __html: htmlPdf }}
				style={{ display: 'none' }}
			/>
		</Modal>
	);
};
