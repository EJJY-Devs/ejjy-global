import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import React from 'react';
import imgNoTransaction from '../../../../public/no-transaction.png';
import { SiteSettings, User } from '../../../types';
import { formatDate, formatTime } from '../../../utils';
import { ReceiptFooter, ReceiptHeader } from '../../Printing';
import { DailyItemSoldSummary } from './index';

type Props = {
	dailyItemSoldSummary: DailyItemSoldSummary[];
	siteSettings: SiteSettings;
	user?: User;
	isForPrint?: boolean;
};

export const DailyItemSoldContent = ({
	dailyItemSoldSummary,
	siteSettings,
	isForPrint,
}: Props) => {
	const columns: ColumnsType<DailyItemSoldSummary> = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			width: '70%',
		},
		{
			title: 'Quantity',
			dataIndex: 'quantity',
			key: 'quantity',
			width: '30%',
			align: 'right',
			render: (quantity: number) => quantity.toLocaleString(),
		},
	];

	const currentDate = dayjs();

	return (
		<>
			{dailyItemSoldSummary.length === 0 && !isForPrint && (
				<img
					alt="no transaction"
					className="pointer-events-none absolute left-0 top-0 w-full"
					src={imgNoTransaction}
				/>
			)}

			<div className="relative bg-white px-2 pt-2 text-center font-mono text-sm leading-4">
				<ReceiptHeader />

				<br />
				<span className="font-bold">DAILY ITEM SOLD SUMMARY</span>
				<br />
				<br />

				{dailyItemSoldSummary.length === 0 ? (
					<div className="py-8 text-center">
						<span>No items sold today</span>
					</div>
				) : (
					<Table
						columns={columns}
						dataSource={dailyItemSoldSummary}
						pagination={false}
						rowKey="name"
						size="small"
						className="daily-item-sold-table"
					/>
				)}

				<br />
				<span>Date: {formatDate(currentDate)}</span>
				<br />
				<span>Time: {formatTime(currentDate)}</span>
				<br />
				<br />

				<ReceiptFooter siteSettings={siteSettings} />
			</div>
		</>
	);
};
