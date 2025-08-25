import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import React from 'react';
import imgNoTransaction from '../../../../public/no-transaction.png';
import { Branch, BranchMachine, User } from '../../../types';
import { ReceiptHeaderV2 } from '../../Printing';
import { DailyItemSoldSummary } from './index';

type Props = {
	dailyItemSoldSummary: DailyItemSoldSummary[];
	branch: Branch;
	branchMachine?: BranchMachine;
	user?: User;
	isForPrint?: boolean;
};

export const DailyItemSoldContent = ({
	dailyItemSoldSummary,
	branch,
	branchMachine,
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
			align: 'center',
			render: (quantity: number) => quantity.toLocaleString(),
		},
	];

	const currentDate = dayjs();
	const currentDateTime = currentDate.format('MM/DD/YYYY hh:mm A');

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
				<ReceiptHeaderV2 branchMachine={branchMachine} branchHeader={branch} />

				<br />
				<strong>DAILY ITEM SOLD</strong>
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
				<span>PDT: {currentDateTime}</span>
				<br />
				<br />
			</div>
		</>
	);
};
