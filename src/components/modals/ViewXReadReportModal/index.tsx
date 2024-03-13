import { FileTextOutlined, PrinterOutlined } from '@ant-design/icons';
import { Button, Descriptions, Modal, Typography } from 'antd';
import React, { useState } from 'react';
import imgNoTransaction from '../../../../public/no-transaction.png';
import { EMPTY_CELL } from '../../../globals';
import { usePdf } from '../../../hooks';
import { createXReadTxt, printXReadReport } from '../../../print';
import { SiteSettings, XReadReport } from '../../../types';
import { formatDateTime, formatInPeso } from '../../../utils';
import {
	Divider,
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
			printXReadReport(report, siteSettings, report?.generated_by, true),
	});

	// METHODS
	const handlePrint = () => {
		printXReadReport(report, siteSettings, report?.generated_by);
	};

	const handleCreateTxt = () => {
		setIsCreatingTxt(true);
		createXReadTxt(report, siteSettings, report?.generated_by);
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
					className="w-full absolute top-0 left-0 pointer-events-none"
					src={imgNoTransaction}
				/>
			)}
			<ReceiptHeader
				branchMachine={report.branch_machine}
				siteSettings={siteSettings}
			/>

			<div className="mt-6">
				{report.generated_by ? (
					<XAccruedContent report={report} />
				) : (
					<XReadContent report={report} />
				)}
			</div>

			<ReceiptFooter siteSettings={siteSettings} />

			<div
				dangerouslySetInnerHTML={{ __html: htmlPdf }}
				style={{ display: 'none' }}
			/>
		</Modal>
	);
};

type ContentProps = {
	report: XReadReport;
};

const XAccruedContent = ({ report }: ContentProps) => {
	return (
		<>
			<Text strong className="block">
				Current Day Accumulated Report
			</Text>
			<Text strong className="block">
				X-READ (end session report)
			</Text>

			<Text className="block mt-4">INVOICE NUMBER</Text>
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

			<Text className="block">SALES</Text>
			<ReceiptReportSummary
				data={[
					{ label: 'Beg', value: formatInPeso(report.beginning_sales) },
					{ label: 'Cur', value: formatInPeso(report.gross_sales) },
					{ label: 'End', value: formatInPeso(report.ending_sales) },
				]}
			/>

			<Text className="block">TRANSACTION COUNT</Text>
			<ReceiptReportSummary
				data={[
					{ label: 'Beg', value: report.beginning_transactions_count },
					{ label: 'Cur', value: report.total_transactions },
					{ label: 'End', value: report.ending_transactions_count },
				]}
			/>

			<Text className="w-100 mt-4 text-center block">
				CURRENT SALES BREAKDOWN
			</Text>
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

			<Divider />
			<Text className="w-100 text-center block">Breakdown of Sales</Text>
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

			<Divider />
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
				<Descriptions.Item label="Gross Sales">
					{formatInPeso(report.gross_sales)}&nbsp;
				</Descriptions.Item>
				<Descriptions.Item label="Deduction" labelStyle={{ paddingLeft: 30 }}>
					<ReceiptUnderlinedValue postfix=")" prefix="(" value={0} />
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

			<Divider />
			<Text className="w-100 text-center block">Deductions</Text>
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
				<Descriptions.Item label="Disc. SC">{null}</Descriptions.Item>
				<Descriptions.Item label="Disc. PWD">{null}</Descriptions.Item>
				<Descriptions.Item label="Disc. NAAC">{null}</Descriptions.Item>
				<Descriptions.Item label="Disc. Solo Parent">{null}</Descriptions.Item>
				<Descriptions.Item label="Disc. Others">{null}</Descriptions.Item>
				<Descriptions.Item label="Return">{null}</Descriptions.Item>
				<Descriptions.Item label="Void">{null}</Descriptions.Item>
				<Descriptions.Item label="TOTAL">{null}</Descriptions.Item>
			</Descriptions>

			<Divider />
			<Text className="w-100 text-center block">VAT Adjustment</Text>
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
				<Descriptions.Item label="Disc. SC">{null}</Descriptions.Item>
				<Descriptions.Item label="Disc. PWD">{null}</Descriptions.Item>
				<Descriptions.Item label="Disc. Others">{null}</Descriptions.Item>
				<Descriptions.Item label="VAT on Returns">{null}</Descriptions.Item>
				<Descriptions.Item label="Others">{null}</Descriptions.Item>
				<Descriptions.Item label="TOTAL">{null}</Descriptions.Item>
			</Descriptions>

			<Divider />
			<Text className="w-100 text-center block">VAT Payable</Text>
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
				<Descriptions.Item label="TOTAL">
					{formatInPeso(report.vat_payable)}
					&nbsp;
				</Descriptions.Item>
			</Descriptions>

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
			<div className="w-100 flex justify-between">
				<Text>C: {report?.generated_by?.employee_id || EMPTY_CELL}</Text>
				<Text>PB: {report?.generated_by?.employee_id || EMPTY_CELL}</Text>
			</div>
		</>
	);
};

const XReadContent = ({ report }: ContentProps) => null;

// type Items = {
// 	label: string;
// 	value: string | number | React.ReactElement;
// 	isIndented: boolean;
// 	isUnderlined: boolean;
// 	isParenthesized: boolean;
// };

// type ItemBlockProps = {
// 	items: Items[];
// };

// const ItemBlock = ({ items }: ItemBlockProps) => {
// 	return (
// 		<>
// 			{items.map((item) => (
// 				<div key={item.label} className="w-full grid grid-cols-2">
// 					<span className={cn({ 'pl-8': item.isIndented })}>{item.label}</span>
// 					<span className="text-right">
// 						{item.isParenthesized ? '(' : ' '}
// 						{item.value}
// 						{item.isParenthesized ? ')' : ' '}
// 					</span>
// 				</div>
// 			))}
// 		</>
// 	);
// };
