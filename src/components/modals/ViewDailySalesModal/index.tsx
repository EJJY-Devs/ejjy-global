import { FileTextOutlined, PrinterOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { usePdf } from '../../../hooks';
import { createDailySalesTxt, printDailySales } from '../../../print';
import { DailySales, SiteSettings, User } from '../../../types';
import { PdfButtons } from '../../Printing';
import { DailySalesContent } from './DailySalesContent';

interface Props {
	dailySales: DailySales;
	siteSettings: SiteSettings;
	user?: User;
	onClose: () => void;
}

export const ViewDailySalesModal = ({
	dailySales,
	siteSettings,
	user,
	onClose,
}: Props) => {
	// STATES
	const [isCreatingTxt, setIsCreatingTxt] = useState(false);

	// CUSTOM HOOKS
	const { htmlPdf, isLoadingPdf, previewPdf, downloadPdf } = usePdf({
		title: `DailySales_${dailySales.id}`,
		print: () => printDailySales(dailySales, siteSettings, user, true),
	});

	// METHODS
	const handlePrint = () => {
		printDailySales(dailySales, siteSettings, user);
	};

	const handleCreateTxt = () => {
		setIsCreatingTxt(true);
		createDailySalesTxt(dailySales, siteSettings, user);
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
			title="Daily Sales"
			width={425}
			centered
			closable
			open
			onCancel={onClose}
		>
			<DailySalesContent dailySales={dailySales} siteSettings={siteSettings} />

			<div
				dangerouslySetInnerHTML={{ __html: htmlPdf }}
				style={{ display: 'none' }}
			/>
		</Modal>
	);
};
