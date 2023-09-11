/* eslint-disable react/no-danger */
import { FileTextOutlined, PrinterOutlined } from '@ant-design/icons';
import { Button, Descriptions, Modal, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { EMPTY_CELL } from '../../../globals';
import { usePdf } from '../../../hooks';
import { createDailySalesTxt, printDailySales } from '../../../print';
import { DailySales, SiteSettings } from '../../../types';
import { formatDate, formatDateTime, formatInPeso } from '../../../utils';
import { PdfButtons, ReceiptFooter, ReceiptHeader } from '../../Printing';

interface Props {
	dailySales: DailySales;
	siteSettings: SiteSettings;
	onClose: () => void;
}

const { Text } = Typography;

export const ViewDailySalesModal = ({
	dailySales,
	siteSettings,
	onClose,
}: Props) => {
	// STATES
	const [isCreatingTxt, setIsCreatingTxt] = useState(false);

	// CUSTOM HOOKS
	const { htmlPdf, isLoadingPdf, previewPdf, downloadPdf } = usePdf({
		title: `DailySales_${dailySales.id}`,
		print: () =>
			printDailySales(
				dailySales,
				siteSettings,
				dailySales.branch_machine,
				dailySales?.generated_by,
				true,
			),
	});

	// METHODS
	const handlePrint = () => {
		printDailySales(
			dailySales,
			siteSettings,
			dailySales.branch_machine,
			dailySales?.generated_by,
		);
	};

	const handleCreateTxt = () => {
		setIsCreatingTxt(true);
		createDailySalesTxt(
			dailySales,
			siteSettings,
			dailySales.branch_machine,
			dailySales?.generated_by,
		);
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
			<ReceiptHeader
				branchMachine={dailySales.branch_machine}
				siteSettings={siteSettings}
			/>

			<Space align="center" className="mt-6 w-100 justify-space-between">
				<Text>DAILY SALES</Text>
				<Text>{`For ${formatDate(dailySales.daily_sales_data.date)}`}</Text>
			</Space>

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
					{formatInPeso(dailySales.cash_sales)}&nbsp;
				</Descriptions.Item>
				<Descriptions.Item label="CREDIT SALES">
					{formatInPeso(dailySales.credit_pay)}&nbsp;
				</Descriptions.Item>
				<Descriptions.Item label="GROSS SALES">
					{formatInPeso(dailySales.gross_sales)}&nbsp;
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
					{formatInPeso(dailySales.vat_exempt)}&nbsp;
				</Descriptions.Item>

				<Descriptions.Item label="VATable Sales">
					{formatInPeso(dailySales.vat_sales)}&nbsp;
				</Descriptions.Item>
				<Descriptions.Item label="VAT Amount (12%)">
					{formatInPeso(dailySales.vat_amount)}&nbsp;
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
					{formatInPeso(dailySales.gross_sales)}&nbsp;
				</Descriptions.Item>
				<Descriptions.Item
					label="REG. DISCOUNT"
					labelStyle={{ paddingLeft: 30 }}
				>
					({formatInPeso(dailySales.regular_discount)})
				</Descriptions.Item>
				<Descriptions.Item label="SC/PWD" labelStyle={{ paddingLeft: 30 }}>
					({formatInPeso(dailySales.special_discount)})
				</Descriptions.Item>
				<Descriptions.Item
					label="VOIDED SALES"
					labelStyle={{ paddingLeft: 30 }}
				>
					({formatInPeso(dailySales.void)})
				</Descriptions.Item>
				<Descriptions.Item
					label="VAT Amount (12%)"
					labelStyle={{ paddingLeft: 30 }}
				>
					({formatInPeso(dailySales.total_vat_adjusted)})
				</Descriptions.Item>
				<Descriptions.Item
					contentStyle={{ fontWeight: 'bold' }}
					label="NET SALES"
					labelStyle={{ fontWeight: 'bold' }}
				>
					{formatInPeso(dailySales.net_sales)}&nbsp;
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
				<Descriptions.Item label="SC/PWD" labelStyle={{ paddingLeft: 30 }}>
					{formatInPeso(dailySales.vat_special_discount)}&nbsp;
				</Descriptions.Item>
				<Descriptions.Item label="OTHERS" labelStyle={{ paddingLeft: 30 }}>
					{formatInPeso(dailySales.others)}&nbsp;
				</Descriptions.Item>
				<Descriptions.Item label="TOTAL" labelStyle={{ paddingLeft: 30 }}>
					{formatInPeso(dailySales.total_vat_adjusted)}&nbsp;
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
					{formatInPeso(dailySales.vat_amount)}&nbsp;
				</Descriptions.Item>
				<Descriptions.Item label="VAT ADJ.">
					({formatInPeso(dailySales.total_vat_adjusted)})
				</Descriptions.Item>
				<Descriptions.Item label="VAT PAYABLE">
					{formatInPeso(dailySales.vat_payable)}
					&nbsp;
				</Descriptions.Item>
			</Descriptions>

			<Space className="mt-6 w-100" direction="vertical">
				<Text>
					GDT:{' '}
					{dailySales.generation_datetime
						? formatDateTime(dailySales.generation_datetime)
						: EMPTY_CELL}
				</Text>
				<Text>
					PDT:{' '}
					{dailySales.printing_datetime
						? formatDateTime(dailySales.printing_datetime)
						: EMPTY_CELL}
				</Text>
			</Space>

			<Space className="mt-2 w-100 justify-space-between">
				<Text>C: {dailySales?.generated_by?.employee_id || EMPTY_CELL}</Text>
				<Text>PB: {dailySales?.generated_by?.employee_id || EMPTY_CELL}</Text>
			</Space>

			<ReceiptFooter siteSettings={siteSettings} />

			<div
				dangerouslySetInnerHTML={{ __html: htmlPdf }}
				style={{ display: 'none' }}
			/>
		</Modal>
	);
};
