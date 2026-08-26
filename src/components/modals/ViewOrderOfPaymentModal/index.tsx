import { PrinterOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React from 'react';
import { usePdf } from '../../../hooks';
import {
	paperSizes,
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
	const { htmlPdf, isLoadingPdf, previewPdf, downloadPdf, pdfPreviewModal } =
		usePdf({
			title: `OrderOfPayment_${orderOfPayment.reference_number}`,
			// PF B: A4 1/2 crosswise (short, wide landscape half-sheet). This
			// document renders at 794px wide (see printOrderOfPaymentHtml) to match
			// that layout, not the 400px-wide default jsPDF page every narrow
			// receipt-format item relies on — otherwise jsPDF rasterizes the wider
			// content onto a narrower page and clips the right side.
			jsPdfSettings: paperSizes.A4_CROSSWISE,
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
			width={820}
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

			{pdfPreviewModal}
		</Modal>
	);
};
