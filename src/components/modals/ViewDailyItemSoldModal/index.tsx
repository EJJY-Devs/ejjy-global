import { FileTextOutlined, PrinterOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import imgNoTransaction from '../../../../public/no-transaction.png';
import { usePdf } from '../../../hooks';
import { printDailyItemSold } from '../../../print';
import { Branch, BranchMachine, User } from '../../../types';
import { PdfButtons } from '../../Printing';
import { DailyItemSoldContent } from './DailyItemSoldContent';

export interface DailyItemSoldSummary {
	id?: number;
	name: string;
	quantity: number;
	datetime_created?: string;
}

type Props = {
	dailyItemSoldSummary: DailyItemSoldSummary[];
	branch: Branch;
	branchMachine?: BranchMachine;
	user?: User;
	isForPrint?: boolean;
	onClose: () => void;
};

export const ViewDailyItemSoldModal = ({
	dailyItemSoldSummary,
	branch,
	branchMachine,
	user,
	isForPrint,
	onClose,
}: Props) => {
	// STATES
	const [isCreatingTxt, setIsCreatingTxt] = useState<boolean>(false);

	// CUSTOM HOOKS
	const { htmlPdf, isLoadingPdf, previewPdf, downloadPdf } = usePdf({
		title: `DailyItemSoldSummary_${new Date().toISOString().split('T')[0]}`,
		image:
			dailyItemSoldSummary.length === 0
				? {
						src: imgNoTransaction,
						x: 50,
						y: 50,
						w: 300,
						h: 600,
					}
				: undefined,
		print: () =>
			printDailyItemSold({
				dailyItemSoldSummary,
				branch,
				branchMachine,
				user,
				isPdf: true,
			}),
	});

	// METHODS
	const handlePrint = () => {
		printDailyItemSold({
			dailyItemSoldSummary,
			branch,
			branchMachine,
			user,
		});
	};

	const handleCreateTxt = () => {
		setIsCreatingTxt(true);
		// TODO: Implement createDailyItemSoldTxt when TXT printing is needed
		console.log('Create daily item sold TXT:', {
			dailyItemSoldSummary,
			branch,
			branchMachine,
			user,
		});
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
			title="Daily Item Sold"
			width={425}
			centered
			closable
			open
			onCancel={onClose}
		>
			<DailyItemSoldContent
				dailyItemSoldSummary={dailyItemSoldSummary}
				branch={branch}
				branchMachine={branchMachine}
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
