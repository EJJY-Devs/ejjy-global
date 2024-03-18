import { FileTextOutlined, PrinterOutlined } from '@ant-design/icons';
import { Button, Modal, Typography } from 'antd';
import React, { useState } from 'react';
import imgNoTransaction from '../../../../public/no-transaction.png';
import { EMPTY_CELL } from '../../../globals';
import { usePdf } from '../../../hooks';
import { createXReadTxt, printXReadReport } from '../../../print';
import { SiteSettings, User, XReadReport } from '../../../types';
import { formatDateTime } from '../../../utils';
import {
	Divider,
	PdfButtons,
	ReceiptFooter,
	ReceiptHeader,
} from '../../Printing';
import { XAccruedContent } from './XAccruedContent';
import { XReadContent } from './XReadContent';

interface Props {
	report: XReadReport;
	siteSettings: SiteSettings;
	user: User;
	isForPrint: boolean;
	onClose: () => void;
}

const { Text } = Typography;

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
			{report.gross_sales === 0 && !isForPrint && (
				<img
					alt="no transaction"
					className="w-full absolute top-0 left-0 pointer-events-none"
					src={imgNoTransaction}
				/>
			)}

			<ReceiptHeader
				branchMachine={report.branch_machine}
				siteSettings={siteSettings}
			/>

			<div className="mt-4">
				{report.generated_by ? (
					<XAccruedContent report={report} />
				) : (
					<XReadContent report={report} />
				)}
			</div>

			<Divider />
			<Text className="block">
				GDT:{' '}
				{report.generation_datetime
					? formatDateTime(report.generation_datetime)
					: EMPTY_CELL}
			</Text>
			<Text className="block">
				PDT:{' '}
				{report.printing_datetime
					? formatDateTime(report.printing_datetime)
					: EMPTY_CELL}
			</Text>
			<div className="w-full flex justify-between">
				<Text>
					C: {report?.cashiering_session?.user.employee_id || EMPTY_CELL}
				</Text>
				<Text>PB: {report?.generated_by?.employee_id || EMPTY_CELL}</Text>
			</div>

			<ReceiptFooter siteSettings={siteSettings} />

			<div
				dangerouslySetInnerHTML={{ __html: htmlPdf }}
				style={{ display: 'none' }}
			/>
		</Modal>
	);
};
