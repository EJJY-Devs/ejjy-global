import { Button } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import React, { useCallback, useEffect, useState } from 'react';
import {
	DEFAULT_PAGE,
	DEFAULT_PAGE_SIZE,
	SpecialDiscountCode,
} from '../../globals';
import { useQueryParams } from '../../hooks';
import { SiteSettings, Transaction } from '../../types';
import {
	formatDate,
	formatInPeso,
	getDiscountFields,
	NaacFields,
	PWDFields,
	SCFields,
	SPFields,
} from '../../utils';
import { ViewTransactionModal } from '../modals';
import { birAnnexTransactionsTabs } from './data';

type Props = {
	category: string;
	discountCode: SpecialDiscountCode;
	isLoading: boolean;
	siteSettings: SiteSettings;
	transactions: Transaction[];
	transactionsTotal: number;
};

export const BirAnnexTransactions = ({
	category,
	discountCode,
	isLoading,
	siteSettings,
	transactions,
	transactionsTotal,
}: Props) => {
	const [dataSource, setDataSource] = useState<any>([]);
	const [selectedTransaction, setSelectedTransaction] =
		useState<Transaction | null>(null);

	const { params, setQueryParams } = useQueryParams();

	useEffect(() => {
		if (transactions && discountCode) {
			const listPwdSc = [
				birAnnexTransactionsTabs.SENIOR_CITIZEN_SALES_REPORT,
				birAnnexTransactionsTabs.PERSONS_WITH_DISABILITY_SALES_REPORT,
			];
			const listNaacSp = [
				birAnnexTransactionsTabs.NATIONAL_ATHLETES_AND_COACHES_SALES_REPORT,
				birAnnexTransactionsTabs.SOLO_PARENTS_SALES_REPORT,
			];

			const data = transactions.map((transaction) => {
				const content: any = {
					key: transaction.id,
					date: formatDate(transaction.datetime_created),
					orNumber: (
						<Button
							type="link"
							onClick={() => setSelectedTransaction(transaction)}
						>
							{transaction.invoice.or_number}
						</Button>
					),
					netSales: formatInPeso(transaction.invoice.vat_sales),
				};

				let fields = getDiscountFields(
					discountCode,
					transaction.discount_option_additional_fields_values || '',
				);

				if (
					category ===
					birAnnexTransactionsTabs.NATIONAL_ATHLETES_AND_COACHES_SALES_REPORT
				) {
					fields = fields as NaacFields;

					content['coach'] = fields.coach;
					content['id'] = fields.id;
				} else if (
					category === birAnnexTransactionsTabs.SOLO_PARENTS_SALES_REPORT
				) {
					fields = fields as SPFields;

					content['name'] = fields.name;
					content['id'] = fields.id;
					content['childName'] = fields.childName;
					content['childBirthdate'] = fields.childBirthdate;
					content['childAge'] = fields.childAge;
				} else if (
					category === birAnnexTransactionsTabs.SENIOR_CITIZEN_SALES_REPORT
				) {
					fields = fields as SCFields;

					content['name'] = fields.name;
					content['id'] = fields.id;
					content['tin'] = fields.tin;
				} else if (
					category ===
					birAnnexTransactionsTabs.PERSONS_WITH_DISABILITY_SALES_REPORT
				) {
					fields = fields as PWDFields;

					content['name'] = fields.name;
					content['id'] = fields.id;
					content['tin'] = fields.tin;
				}

				if (listNaacSp.includes(category)) {
					content['gross'] = formatInPeso(transaction.gross_amount);
					content['salesDiscount'] = formatInPeso(transaction.overall_discount);
				}

				if (listPwdSc.includes(category)) {
					content['sales'] = formatInPeso(transaction.total_amount);
					content['vatAmount'] = formatInPeso(transaction.invoice.vat_amount);
					content['vatExemptSales'] = formatInPeso(
						transaction.invoice.vat_exempt,
					);
					content['5%'] = formatInPeso(0);
					content['20%'] = formatInPeso(transaction.overall_discount);
				}

				return content;
			});

			setDataSource(data);
		}
	}, [transactions, category]);

	const getColumns = useCallback((): any => {
		const categoryColumnsMap = {
			[birAnnexTransactionsTabs.NATIONAL_ATHLETES_AND_COACHES_SALES_REPORT]: [
				{ title: 'Name of National Athlete/Coach', dataIndex: 'coach' },
				{ title: 'PNSTM ID No.', dataIndex: 'id' },
			],
			[birAnnexTransactionsTabs.SOLO_PARENTS_SALES_REPORT]: [
				{ title: 'Name of Solo Parent', dataIndex: 'name' },
				{ title: 'SPIC No.', dataIndex: 'id' },
				{ title: 'Name of child', dataIndex: 'childName' },
				{ title: 'Birth Date of child', dataIndex: 'childBirthdate' },
				{ title: 'Age of child', dataIndex: 'childAge' },
			],
			[birAnnexTransactionsTabs.SENIOR_CITIZEN_SALES_REPORT]: [
				{ title: 'Name of Senior Citizen (SC)', dataIndex: 'name' },
				{ title: 'OSCA ID No./ SC ID No.', dataIndex: 'id' },
				{ title: 'SC TIN', dataIndex: 'tin' },
			],
			[birAnnexTransactionsTabs.PERSONS_WITH_DISABILITY_SALES_REPORT]: [
				{ title: 'Name of Person with Disability (PWD)', dataIndex: 'name' },
				{ title: 'PWD ID No.', dataIndex: 'id' },
				{ title: 'PWD TIN', dataIndex: 'tin' },
			],
		};

		const columnsNaacSp = [
			{ title: 'Gross Sales/Receipts', dataIndex: 'gross' },
			{ title: 'Sales Discount (VAT+Disc)', dataIndex: 'salesDiscount' },
		];

		const columnsScPwd = [
			{ title: 'Sales (inclusive of VAT)', dataIndex: 'sales' },
			{ title: 'VAT Amount', dataIndex: 'vatAmount' },
			{ title: 'VAT Exempt Sales', dataIndex: 'vatExemptSales' },
			{
				title: 'Discount',
				children: [
					{ title: '5%', dataIndex: '5%' },
					{ title: '20%', dataIndex: '20%' },
				],
			},
		];

		const salesColumnsMap = {
			[birAnnexTransactionsTabs.NATIONAL_ATHLETES_AND_COACHES_SALES_REPORT]:
				columnsNaacSp,
			[birAnnexTransactionsTabs.SOLO_PARENTS_SALES_REPORT]: columnsNaacSp,
			[birAnnexTransactionsTabs.SENIOR_CITIZEN_SALES_REPORT]: columnsScPwd,
			[birAnnexTransactionsTabs.PERSONS_WITH_DISABILITY_SALES_REPORT]:
				columnsScPwd,
		};

		return [
			{ title: 'Date', dataIndex: 'date' },
			...(categoryColumnsMap[category] || []),
			{ title: 'SI / OR Number', dataIndex: 'orNumber' },
			...(salesColumnsMap[category] || []),
			{ title: 'Net Sales', dataIndex: 'netSales' },
		];
	}, [category]);

	return (
		<>
			<Table
				columns={getColumns()}
				dataSource={dataSource}
				loading={isLoading}
				pagination={{
					current: Number(params.page) || DEFAULT_PAGE,
					total: transactionsTotal,
					pageSize: Number(params.pageSize) || DEFAULT_PAGE_SIZE,
					onChange: (page, newPageSize) => {
						setQueryParams(
							{
								page,
								pageSize: newPageSize,
							},
							{ shouldResetPage: true },
						);
					},
					disabled: !dataSource,
					position: ['bottomCenter'],
				}}
				scroll={{ x: 1500 }}
				size="middle"
				bordered
			/>

			{selectedTransaction && (
				<ViewTransactionModal
					siteSettings={siteSettings}
					transaction={selectedTransaction}
					onClose={() => setSelectedTransaction(null)}
				/>
			)}
		</>
	);
};
