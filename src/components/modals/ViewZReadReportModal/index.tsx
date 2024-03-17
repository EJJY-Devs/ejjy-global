import { FileTextOutlined, PrinterOutlined } from '@ant-design/icons';
import { Button, Modal, Typography } from 'antd';
import React, { useState } from 'react';
import imgNoTransaction from '../../../../public/no-transaction.png';
import { EMPTY_CELL } from '../../../globals';
import { usePdf } from '../../../hooks';
import { createZReadTxt, printZReadReport } from '../../../print';
import { SiteSettings, User, ZReadReport } from '../../../types';
import { formatDateTime } from '../../../utils';
import {
	Divider,
	PdfButtons,
	ReceiptFooter,
	ReceiptHeader,
} from '../../Printing';
import { ZAccruedContent } from './ZAccruedContent';
import { ZReadContent } from './ZReadContent';

const { Text } = Typography;

interface Props {
	report: ZReadReport;
	siteSettings: SiteSettings;
	user: User;
	onClose: () => void;
}

export const ViewZReadReportModal = ({
	report,
	siteSettings,
	user,
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
			{report.total_transactions === 0 && (
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
					<ZAccruedContent report={report} />
				) : (
					<ZReadContent report={report} />
				)}
			</div>

			<Divider />
			<Text>
				GDT:{' '}
				{report.generation_datetime
					? formatDateTime(report.generation_datetime)
					: EMPTY_CELL}
			</Text>
			<Text>
				PDT:{' '}
				{report.printing_datetime
					? formatDateTime(report.printing_datetime)
					: EMPTY_CELL}
			</Text>

			<div className="w-full flex justify-between">
				<Text>C: {report?.generated_by?.employee_id || EMPTY_CELL}</Text>
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
