import { PrinterOutlined } from '@ant-design/icons';
import { Button, message, Modal, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { GENERIC_ERROR_MESSAGE } from '../../../globals';
import { usePdf, useDeliveryInvoiceRetrieve } from '../../../hooks';
import { ServiceOptions } from '../../../hooks/inteface';
import { paperSizes, printDeliveryInvoice } from '../../../print';
import { DeliveryInvoice, SiteSettings } from '../../../types';
import { PdfButtons } from '../../Printing';
import { DeliveryInvoiceContent } from './DeliveryInvoiceContent';

type Props = {
	deliveryInvoice: DeliveryInvoice | number;
	siteSettings: SiteSettings;
	serviceOptions?: ServiceOptions;
	onClose: () => void;
};

export const ViewDeliveryInvoiceModal = ({
	deliveryInvoice,
	siteSettings,
	serviceOptions,
	onClose,
}: Props) => {
	// STATE
	const [deliveryInvoiceData, setDeliveryInvoiceData] = useState<
		DeliveryInvoice | null | undefined
	>(null);

	// CUSTOM HOOKS
	const { htmlPdf, isLoadingPdf, previewPdf, downloadPdf } = usePdf({
		title: `DeliveryInvoice_${deliveryInvoiceData?.id}`,
		// PF B: A4 1/2 lengthwise (tall, narrow half-sheet).
		jsPdfSettings: paperSizes.A4_LENGTHWISE,
		print: () => {
			if (!deliveryInvoiceData) {
				message.error(GENERIC_ERROR_MESSAGE);
				return undefined;
			}

			return printDeliveryInvoice({
				deliveryInvoice: deliveryInvoiceData,
				siteSettings,
				isReprint: true,
				isPdf: true,
			});
		},
	});
	const { data: deliveryInvoiceRetrieved, isFetching } =
		useDeliveryInvoiceRetrieve({
			id:
				typeof deliveryInvoice === 'number'
					? deliveryInvoice
					: deliveryInvoice.id,
			options: { enabled: typeof deliveryInvoice === 'number' },
			serviceOptions,
		});

	// METHODS
	useEffect(() => {
		// Set delivery invoice
		const newDeliveryInvoice =
			typeof deliveryInvoice === 'number'
				? deliveryInvoiceRetrieved
				: deliveryInvoice;
		setDeliveryInvoiceData(newDeliveryInvoice);
	}, [deliveryInvoiceRetrieved, deliveryInvoice]);

	const handlePrint = () => {
		if (!deliveryInvoiceData) {
			message.error(GENERIC_ERROR_MESSAGE);
			return;
		}

		printDeliveryInvoice({
			deliveryInvoice: deliveryInvoiceData,
			siteSettings,
			isReprint: true,
		});
	};

	return (
		<Modal
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
			title="Delivery Invoice"
			width={425}
			centered
			closable
			open
			onCancel={onClose}
		>
			<Spin spinning={isFetching}>
				{deliveryInvoiceData?.id && (
					<DeliveryInvoiceContent
						deliveryInvoice={deliveryInvoiceData}
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
