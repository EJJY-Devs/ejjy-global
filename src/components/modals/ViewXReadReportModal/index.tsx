import { FileTextOutlined, PrinterOutlined } from '@ant-design/icons';
import { Button, Descriptions, Modal, Space, Typography } from 'antd';
import imgNoTransaction from '../../../assets/no-transaction.png';
import React, { useState } from 'react';
import { EMPTY_CELL } from '../../../globals';
import { usePdf } from '../../../hooks';
import { createXReadTxt, printXReadReport } from '../../../print';
import { SiteSettings, XReadReport } from '../../../types';
import { formatDateTime, formatInPeso } from '../../../utils';
import {
	PdfButtons,
	ReceiptFooter,
	ReceiptHeader,
	ReceiptReportSummary,
	ReceiptUnderlinedValue,
} from '../../Printing';

interface Props {
	report: XReadReport;
	siteSettings: SiteSettings;
	onClose: () => void;
}

const { Text } = Typography;

export const ViewXReadReportModal = ({
	report,
	siteSettings,
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
		print: () =>
			printXReadReport(
				report,
				siteSettings,
				report.branch_machine,
				report?.generated_by,
				true,
			),
	});

	// METHODS
	const handlePrint = () => {
		printXReadReport(
			report,
			siteSettings,
			report.branch_machine,
			report?.generated_by,
		);
	};

	const handleCreateTxt = () => {
		setIsCreatingTxt(true);
		createXReadTxt(
			report,
			siteSettings,
			report.branch_machine,
			report?.generated_by,
		);
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
			{report.gross_sales === 0 && (
				<img
					alt="no transaction"
					style={{
						width: '100%',
						position: 'absolute',
						left: 0,
						bottom: 0,
					}}
					src={imgNoTransaction}
				/>
			)}
			<ReceiptHeader
				branchMachine={report.branch_machine}
				siteSettings={siteSettings}
			/>

			<Space className="mt-6 w-100" direction="vertical">
				<Text className="w-100">X-READ</Text>

				<Text className="w-100 mt-2 d-block">INVOICE NUMBER</Text>
				<ReceiptReportSummary
					data={[
						{
							label: 'Beg Invoice #',
							value: report.beginning_or?.or_number || EMPTY_CELL,
						},
						{
							label: 'End Invoice #',
							value: report.ending_or?.or_number || EMPTY_CELL,
						},
					]}
				/>

				<Text className="w-100 mt-2 d-block">SALES</Text>
				<ReceiptReportSummary
					data={[
						{ label: 'Beg', value: formatInPeso(report.beginning_sales) },
						{ label: 'Cur', value: formatInPeso(report.gross_sales) },
						{ label: 'End', value: formatInPeso(report.ending_sales) },
					]}
				/>

				<Text className="w-100 mt-2 d-block">TRANSACTION COUNT</Text>
				<ReceiptReportSummary
					data={[
						{ label: 'Beg', value: report.beginning_transactions_count },
						{ label: 'Cur', value: report.total_transactions },
						{ label: 'End', value: report.ending_transactions_count },
					]}
				/>
			</Space>

			<Text className="w-100 mt-6 text-center d-block">
				CURRENT SALES BREAKDOWN
			</Text>

			<Descriptions
				className="mt-6 w-100"
				colon={false}
				column={1}
				contentStyle={{
					textAlign: 'right',
					display: 'block',
				}}
				labelStyle={{
					width: 200,
				}}
				size="small"
			>
				<Descriptions.Item label="CASH SALES">
					{formatInPeso(report.cash_sales)}&nbsp;
				</Descriptions.Item>
				<Descriptions.Item label="CREDIT SALES">
					<ReceiptUnderlinedValue
						postfix="&nbsp;"
						value={Number(report.credit_pay)}
					/>
				</Descriptions.Item>
				<Descriptions.Item label="GROSS SALES">
					{formatInPeso(report.gross_sales)}&nbsp;
				</Descriptions.Item>
			</Descriptions>

			<Descriptions
				className="mt-6 w-100"
				colon={false}
				column={1}
				contentStyle={{
					textAlign: 'right',
					display: 'block',
				}}
				labelStyle={{
					width: 200,
				}}
				size="small"
			>
				<Descriptions.Item label="VAT Exempt">
					{formatInPeso(report.vat_exempt)}&nbsp;
				</Descriptions.Item>

				<Descriptions.Item label="VATable Sales">
					{formatInPeso(report.vat_sales)}&nbsp;
				</Descriptions.Item>
				<Descriptions.Item label="VAT Amount (12%)">
					{formatInPeso(report.vat_amount)}&nbsp;
				</Descriptions.Item>

				<Descriptions.Item label="ZERO Rated">
					{formatInPeso(0)}&nbsp;
				</Descriptions.Item>
			</Descriptions>

			<div className="w-100" style={{ textAlign: 'right' }}>
				----------------
			</div>

			<Descriptions
				className="w-100"
				colon={false}
				column={1}
				contentStyle={{
					textAlign: 'right',
					display: 'block',
				}}
				labelStyle={{
					width: 200,
				}}
				size="small"
			>
				<Descriptions.Item label="GROSS SALES">
					{formatInPeso(report.gross_sales)}&nbsp;
				</Descriptions.Item>
				<Descriptions.Item
					label="REG. DISCOUNT"
					labelStyle={{ paddingLeft: 30 }}
				>
					({formatInPeso(report.regular_discount)})
				</Descriptions.Item>
				<Descriptions.Item label="Special" labelStyle={{ paddingLeft: 30 }}>
					({formatInPeso(report.special_discount)})
				</Descriptions.Item>
				<Descriptions.Item
					label="VOIDED SALES"
					labelStyle={{ paddingLeft: 30 }}
				>
					({formatInPeso(report.void)})
				</Descriptions.Item>
				<Descriptions.Item
					label="VAT Amount (12%)"
					labelStyle={{ paddingLeft: 30 }}
				>
					<ReceiptUnderlinedValue
						postfix=")"
						prefix="("
						value={report.total_vat_adjusted}
					/>
				</Descriptions.Item>
				<Descriptions.Item
					contentStyle={{ fontWeight: 'bold' }}
					label="NET SALES"
					labelStyle={{ fontWeight: 'bold' }}
				>
					{formatInPeso(report.net_sales)}&nbsp;
				</Descriptions.Item>
			</Descriptions>

			<div className="w-100" style={{ textAlign: 'right' }}>
				----------------
			</div>

			<Descriptions
				className="w-100"
				colon={false}
				column={1}
				contentStyle={{
					textAlign: 'right',
					display: 'block',
				}}
				labelStyle={{
					width: 200,
				}}
				size="small"
			>
				<Descriptions.Item label="ADJUSTMENT ON VAT">{null}</Descriptions.Item>
				<Descriptions.Item label="Special" labelStyle={{ paddingLeft: 30 }}>
					{formatInPeso(report.vat_special_discount)}&nbsp;
				</Descriptions.Item>
				<Descriptions.Item label="OTHERS" labelStyle={{ paddingLeft: 30 }}>
					<ReceiptUnderlinedValue postfix="&nbsp;" value={report.others} />
				</Descriptions.Item>
				<Descriptions.Item label="TOTAL" labelStyle={{ paddingLeft: 30 }}>
					{formatInPeso(report.total_vat_adjusted)}&nbsp;
				</Descriptions.Item>
			</Descriptions>

			<div className="w-100" style={{ textAlign: 'right' }}>
				----------------
			</div>

			<Descriptions
				className="w-100"
				colon={false}
				column={1}
				contentStyle={{
					textAlign: 'right',
					display: 'block',
				}}
				labelStyle={{
					width: 200,
				}}
				size="small"
			>
				<Descriptions.Item label="VAT AMOUNT (12%)">
					{formatInPeso(report.vat_amount)}&nbsp;
				</Descriptions.Item>
				<Descriptions.Item label="VAT ADJ.">
					<ReceiptUnderlinedValue
						postfix=")"
						prefix="("
						value={report.total_vat_adjusted}
					/>
				</Descriptions.Item>
				<Descriptions.Item label="VAT PAYABLE">
					{formatInPeso(report.vat_payable)}
					&nbsp;
				</Descriptions.Item>
			</Descriptions>

			<Space className="mt-6 w-100" direction="vertical">
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
			</Space>

			<Space className="mt-2 w-100 justify-space-between">
				<Text>C: {report?.generated_by?.employee_id || EMPTY_CELL}</Text>
				<Text>PB: {report?.generated_by?.employee_id || EMPTY_CELL}</Text>
			</Space>

			<ReceiptFooter siteSettings={siteSettings} />

			<div
				dangerouslySetInnerHTML={{ __html: htmlPdf }}
				style={{ display: 'none' }}
			/>
		</Modal>
	);
};
