import { FileTextOutlined, PrinterOutlined } from '@ant-design/icons';
import {
	Button,
	Descriptions,
	Modal,
	Space,
	Spin,
	Table,
	Typography,
	message,
} from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import {
	EMPTY_CELL,
	GENERIC_ERROR_MESSAGE,
	saleTypes,
	transactionStatuses,
	vatTypes,
} from '../../../globals';
import { usePdf, useTransactionRetrieve } from '../../../hooks';
import { createSalesInvoiceTxt, printSalesInvoice } from '../../../print';
import { SiteSettings, Transaction, TransactionProduct } from '../../../types';
import {
	formatDateTime,
	formatInPeso,
	getComputedDiscount,
	getFullName,
} from '../../../utils';
import { PdfButtons, ReceiptFooter, ReceiptHeader } from '../../Printing';

interface Props {
	transaction: Transaction | number;
	siteSettings: SiteSettings;
	onClose: () => void;
}

const { Text } = Typography;

interface TableRow {
	key: number;
	name: string;
	qty?: string;
	rate: string;
	subtotal: string;
}

const columns: ColumnsType<TableRow> = [
	{ title: 'Name', dataIndex: 'name' },
	{ title: 'Qty', dataIndex: 'qty', align: 'center' },
	{ title: 'Rate', dataIndex: 'rate', align: 'center' },
	{ title: 'Subtotal', dataIndex: 'subtotal', align: 'center' },
];

export const ViewTransactionModal = ({
	transaction,
	siteSettings,
	onClose,
}: Props) => {
	// STATE
	const [dataSource, setDataSource] = useState<TableRow[]>([]);
	const [transactionData, setTransactionData] = useState<
		Transaction | null | undefined
	>(null);
	const [fields, setFields] = useState<Record<string, string | undefined>[]>(
		[],
	);
	const [isCreatingTxt, setIsCreatingTxt] = useState(false);
	const [title, setTitle] = useState('Invoice');

	// CUSTOM HOOKS
	const { htmlPdf, isLoadingPdf, previewPdf, downloadPdf } = usePdf({
		title: `SalesInvoice_${transactionData?.invoice?.or_number}`,
		print: () => {
			if (!transactionData) {
				message.error(GENERIC_ERROR_MESSAGE);
				return undefined;
			}

			printSalesInvoice(
				transactionData,
				siteSettings,
				transactionData.branch_machine,
				true,
				true,
			);
		},
	});
	const { data: transactionRetrieved, isFetching } = useTransactionRetrieve({
		id: typeof transaction === 'number' ? transaction : transaction.id,
		options: { enabled: typeof transaction === 'number' },
	});

	// METHODS
	useEffect(() => {
		let transactionProducts: TransactionProduct[] = [];

		if (typeof transaction !== 'number') {
			transactionProducts = transaction?.products;
		}

		if (transactionRetrieved?.products.length) {
			transactionProducts = transactionRetrieved?.products.map((tp) => ({
				product: tp.branch_product.product,
				...tp,
			}));
		}

		const formattedProducts = transactionProducts.map((item) => ({
			key: item.id,
			name: `${item.branch_product.product.name} - ${
				item.branch_product.product.is_vat_exempted
					? vatTypes.VAT_EMPTY
					: vatTypes.VATABLE
			}`,
			qty: item.original_quantity,
			rate: formatInPeso(item.price_per_piece),
			subtotal: formatInPeso(
				Number(item.quantity) * Number(item.price_per_piece),
			),
		}));

		setDataSource(formattedProducts);
	}, [transaction, transactionRetrieved]);

	useEffect(() => {
		// Set transaction
		const newTransaction =
			typeof transaction === 'number' ? transactionRetrieved : transaction;
		setTransactionData(newTransaction);

		// Set title
		if (newTransaction?.id) {
			if (newTransaction.payment.mode === saleTypes.CASH) {
				setTitle('CASH SALES INVOICE');
			} else if (newTransaction.payment.mode === saleTypes.CREDIT) {
				setTitle('CHARGE SALES INVOICE');
			}
		}

		// Set client fields
		let newFields: Record<string, string | undefined>[] = [];
		if (newTransaction?.discount_option_additional_fields_values?.length) {
			const discountOptionFields = JSON.parse(
				newTransaction.discount_option_additional_fields_values,
			);

			newFields = Object.keys(discountOptionFields).map((key) => ({
				key,
				value: discountOptionFields[key],
			}));
		} else if (
			newTransaction?.client?.name ||
			newTransaction?.payment?.creditor_account
		) {
			newFields = [
				{
					key: 'NAME',
					value:
						newTransaction.client?.name ||
						getFullName(newTransaction.payment?.creditor_account) ||
						EMPTY_CELL,
				},
				{
					key: 'TIN',
					value:
						newTransaction.client?.tin ||
						newTransaction.payment?.creditor_account?.tin ||
						EMPTY_CELL,
				},
				{
					key: 'ADDRESS',
					value:
						newTransaction.client?.address ||
						newTransaction.payment?.creditor_account?.home_address ||
						EMPTY_CELL,
				},
			];
		}

		setFields(newFields);
	}, [transactionRetrieved, transaction]);

	const handlePrint = () => {
		if (!transactionData) {
			message.error(GENERIC_ERROR_MESSAGE);
			return;
		}

		printSalesInvoice(
			transactionData,
			siteSettings,
			transactionData.branch_machine,
			true,
		);
	};

	const handleCreateTxt = () => {
		if (!transactionData) {
			message.error(GENERIC_ERROR_MESSAGE);
			return;
		}

		setIsCreatingTxt(true);
		createSalesInvoiceTxt(
			transactionData,
			siteSettings,
			transactionData.branch_machine,
			true,
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
			title={title}
			width={425}
			centered
			closable
			open
			onCancel={onClose}
		>
			<Spin spinning={isFetching}>
				{transactionData?.id && (
					<>
						<ReceiptHeader
							branchMachine={transactionData.branch_machine}
							siteSettings={siteSettings}
							title={title}
						/>

						<Table
							className="mt-6"
							columns={columns}
							dataSource={dataSource}
							pagination={false}
							size="small"
							bordered
						/>

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
							{transactionData.discount_option && (
								<>
									<Descriptions.Item label="GROSS AMOUNT">
										{formatInPeso(transactionData.gross_amount)}&nbsp;
									</Descriptions.Item>
									<Descriptions.Item
										label={`DISCOUNT | ${transactionData.discount_option.code}`}
									>
										({formatInPeso(getComputedDiscount(transactionData))})
									</Descriptions.Item>
									{transactionData.discount_option.is_special_discount && (
										<Descriptions.Item label="VAT AMOUNT">
											({formatInPeso(transactionData.invoice.vat_amount)})
										</Descriptions.Item>
									)}
								</>
							)}
							<Descriptions.Item
								contentStyle={{ fontWeight: 'bold' }}
								label="TOTAL AMOUNT"
							>
								{formatInPeso(transactionData.total_amount)}&nbsp;
							</Descriptions.Item>
						</Descriptions>

						{transactionData.payment.mode === saleTypes.CASH && (
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
									paddingLeft: 30,
								}}
								size="small"
							>
								<Descriptions.Item label="AMOUNT RECEIVED">
									{formatInPeso(transactionData.payment.amount_tendered)}&nbsp;
								</Descriptions.Item>
								<Descriptions.Item label="AMOUNT DUE">
									{formatInPeso(transactionData.total_amount)}&nbsp;
								</Descriptions.Item>
								<Descriptions.Item
									contentStyle={{ fontWeight: 'bold' }}
									label="CHANGE"
								>
									{formatInPeso(
										Number(transactionData.payment.amount_tendered) -
											Number(transactionData.total_amount),
									)}
									&nbsp;
								</Descriptions.Item>
							</Descriptions>
						)}

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
								{formatInPeso(transactionData.invoice.vat_exempt)}&nbsp;
							</Descriptions.Item>
							<Descriptions.Item label="VATable Sales">
								{formatInPeso(transactionData.invoice.vat_sales)}&nbsp;
							</Descriptions.Item>
							<Descriptions.Item label="VAT Amount (12%)">
								{formatInPeso(transactionData.invoice.vat_amount)}&nbsp;
							</Descriptions.Item>
							<Descriptions.Item label="ZERO Rated">
								{formatInPeso(0)}&nbsp;
							</Descriptions.Item>
						</Descriptions>

						<Space className="mt-6 w-100" direction="vertical">
							<Text>
								GDT: {formatDateTime(transactionData.invoice.datetime_created)}
							</Text>
							<Text>PDT: {formatDateTime(dayjs(), false)}</Text>

							<Space className="w-100 justify-space-between">
								<Text>{transactionData.invoice.or_number}</Text>
								<Text>{dataSource.length} item(s)</Text>
							</Space>

							<Text>{transactionData.teller.employee_id}</Text>
						</Space>

						{transactionData?.adjustment_remarks
							?.previous_voided_transaction && (
							<Space className="w-100 justify-space-between">
								<Text>
									Prev Invoice #:{' '}
									{
										transactionData.adjustment_remarks
											.previous_voided_transaction.invoice.or_number
									}
								</Text>
							</Space>
						)}
						{transactionData?.adjustment_remarks?.new_updated_transaction && (
							<Space className="w-100 justify-space-between">
								<Text>
									New Invoice #:{' '}
									{
										transactionData.adjustment_remarks.new_updated_transaction
											.invoice.or_number
									}
								</Text>
							</Space>
						)}

						{fields.length > 0 && (
							<Descriptions
								colon={false}
								column={1}
								labelStyle={{
									width: 200,
									paddingLeft: 15,
								}}
								size="small"
							>
								{fields.map(({ key, value }) => (
									<Descriptions.Item key={key} label={key}>
										{value}
									</Descriptions.Item>
								))}
							</Descriptions>
						)}

						<ReceiptFooter siteSettings={siteSettings} />

						{transactionData?.status === transactionStatuses.FULLY_PAID && (
							<Text
								className="d-block text-center"
								style={{ whiteSpace: 'pre-line' }}
							>
								{siteSettings?.invoice_last_message}
							</Text>
						)}

						{[
							transactionStatuses.VOID_CANCELLED,
							transactionStatuses.VOID_EDITED,
						].includes(transactionData?.status) && (
							<Text className="mt-4 d-block text-center">
								VOIDED TRANSACTION
							</Text>
						)}
						<Text className="d-block text-center">
							&quot;{siteSettings?.thank_you_message}&quot;
						</Text>
					</>
				)}
			</Spin>

			<div
				dangerouslySetInnerHTML={{ __html: htmlPdf }}
				style={{ display: 'none' }}
			/>
		</Modal>
	);
};
