import { FileTextOutlined, PrinterOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import imgNoTransaction from '../../../../public/no-transaction.png';
import { usePdf } from '../../../hooks';
import { createZReadTxt, printZReadReport } from '../../../print';
import { SiteSettings, User, ZReadReport } from '../../../types';
import { PdfButtons } from '../../Printing';
import { ZReadContent } from './ZReadContent';

interface Props {
	report: ZReadReport;
	siteSettings: SiteSettings;
	user?: User;
	isForPrint?: boolean;
	onClose: () => void;
}

export const ViewZReadReportModal = ({
	report,
	siteSettings,
	user,
	isForPrint,
	onClose,
}: Props) => {
	// STATES
	const [isCreatingTxt, setIsCreatingTxt] = useState<boolean>(false);

	// CUSTOM HOOKS
	const { htmlPdf, isLoadingPdf, previewPdf, downloadPdf } = usePdf({
		title: `ZReadReport_${report.id}`,
		image:
			report.total_transactions === 0
				? {
						src: imgNoTransaction,
						x: 50,
						y: 50,
						w: 300,
						h: 600,
					}
				: undefined,
		print: () => printZReadReport(report, siteSettings, user, true),
	});

	// METHODS
	const handlePrint = () => {
		printZReadReport(report, siteSettings, user);
	};

	const handleCreateTxt = () => {
		setIsCreatingTxt(true);
		createZReadTxt(report, siteSettings, user);
		setIsCreatingTxt(false);
	};

	return (
		<Modal
			className="ViewReportModal"
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
			title="Z-Read Report"
			width={425}
			centered
			closable
			open
			onCancel={onClose}
		>
			<ZReadContent
				report={report}
				siteSettings={siteSettings}
				isForPrint={isForPrint}
			/>

			<div
				dangerouslySetInnerHTML={{ __html: htmlPdf }}
				style={{ display: 'none' }}
			/>
		</Modal>
	);
};
