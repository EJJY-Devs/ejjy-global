import { FileTextOutlined, PrinterOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import imgNoTransaction from '../../../../public/no-transaction.png';
import { usePdf } from '../../../hooks';
import { createXReadTxt, printXReadReport } from '../../../print';
import { SiteSettings, User, XReadReport } from '../../../types';
import { PdfButtons } from '../../Printing';
import { XReadContent } from './XReadContent';

interface Props {
	report: XReadReport;
	siteSettings: SiteSettings;
	user: User;
	isForPrint?: boolean;
	onClose: () => void;
}

export const ViewXReadReportModal = ({
	report,
	siteSettings,
	user,
	isForPrint,
	onClose,
}: Props) => {
	// STATES
	const [isCreatingTxt, setIsCreatingTxt] = useState(false);

	// CUSTOM HOOKS
	const { htmlPdf, isLoadingPdf, previewPdf, downloadPdf } = usePdf({
		title: `XReadReport_${report.id}`,
		image:
			report?.gross_sales === 0
				? {
						src: imgNoTransaction,
						x: 50,
						y: 50,
						w: 300,
						h: 600,
					}
				: undefined,
		print: () => printXReadReport(report, siteSettings, user, true),
	});

	// METHODS
	const handlePrint = () => {
		printXReadReport(report, siteSettings, user);
	};

	const handleCreateTxt = () => {
		setIsCreatingTxt(true);
		createXReadTxt(report, siteSettings, user);
		setIsCreatingTxt(false);
	};

	const cashieringSession = report.cashiering_session;
	const isAccrued = !!report.generated_by;

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
			title="X-Read Report"
			width={425}
			centered
			closable
			open
			onCancel={onClose}
		>
			<XReadContent
				report={report}
				siteSettings={siteSettings}
				user={user}
				isForPrint={isForPrint}
			/>

			<div
				dangerouslySetInnerHTML={{ __html: htmlPdf }}
				style={{ display: 'none' }}
			/>
		</Modal>
	);
};
