import { PrinterOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React from 'react';
import { usePdf } from '../../../hooks';
import { printCollectionReceipt } from '../../../print';
import { CollectionReceipt, SiteSettings } from '../../../types';
import { PdfButtons } from '../../Printing';
import { CollectionReceiptContent } from './CollectionReceiptContent';

type Props = {
	collectionReceipt: CollectionReceipt;
	siteSettings: SiteSettings;
	onClose: () => void;
};

export const ViewCollectionReceiptModal = ({
	collectionReceipt,
	siteSettings,
	onClose,
}: Props) => {
	const { htmlPdf, isLoadingPdf, previewPdf, downloadPdf } = usePdf({
		title: `CollectionReceipt_${collectionReceipt.id}`,
		print: () => printCollectionReceipt(collectionReceipt, siteSettings, true),
	});

	const handlePrint = () => {
		printCollectionReceipt(collectionReceipt, siteSettings);
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
			title="Collection Receipt"
			width={425}
			centered
			closable
			open
			onCancel={onClose}
		>
			<CollectionReceiptContent
				collectionReceipt={collectionReceipt}
				siteSettings={siteSettings}
			/>

			<div
				dangerouslySetInnerHTML={{ __html: htmlPdf }}
				style={{ display: 'none' }}
			/>
		</Modal>
	);
};
