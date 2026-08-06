import { PrinterOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React from 'react';
import { usePdf } from '../../../hooks';
import {
	printOrderOfPayment,
	PrintOrderOfPayment as PrintOrderOfPaymentType,
} from '../../../print';
import { OrderOfPayment } from '../../../types';
import { PdfButtons } from '../../Printing';
import { OrderOfPaymentContent } from './OrderOfPaymentContent';

type Props = {
	orderOfPayment: OrderOfPayment;
	onClose: () => void;
};

export const ViewOrderOfPaymentModal = ({ orderOfPayment, onClose }: Props) => {
	const { htmlPdf, isLoadingPdf, previewPdf, downloadPdf } = usePdf({
		title: `OrderOfPayment_${orderOfPayment.reference_number}`,
		// This document renders at 794px wide (see printOrderOfPaymentHtml) to
		// match its A4 1/2 Crosswise/landscape layout, not the 400px-wide
		// default jsPDF page every narrow receipt-format item relies on.
		// Without overriding the page format here, jsPDF has no width/
		// windowWidth option to auto-scale by, so it would rasterize the
		// wider content onto a narrower page and clip the right side.
		jsPdfSettings: { format: [794, 2000] },
		print: () =>
			printOrderOfPayment({
				orderOfPayment,
				isPdf: true,
			} as PrintOrderOfPaymentType) as string | undefined,
	});

	const handlePrint = () => {
		printOrderOfPayment({
			orderOfPayment,
		} as PrintOrderOfPaymentType);
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
			title="Order of Payment"
			width={425}
			centered
			closable
			open
			onCancel={onClose}
		>
			<OrderOfPaymentContent orderOfPayment={orderOfPayment} />

			<div
				dangerouslySetInnerHTML={{ __html: htmlPdf }}
				style={{ display: 'none' }}
			/>
		</Modal>
	);
};
