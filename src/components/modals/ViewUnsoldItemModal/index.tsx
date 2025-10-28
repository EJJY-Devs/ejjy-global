import { FileTextOutlined, PrinterOutlined } from '@ant-design/icons';
import { Button, Modal, Spin } from 'antd';
import React, { useState } from 'react';
import imgNoTransaction from '../../../../public/no-transaction.png';
import { usePdf } from '../../../hooks';
import { printUnsoldItem } from '../../../print';
import { Branch, BranchMachine, User } from '../../../types';
import { PdfButtons } from '../../Printing';
import { UnsoldItemContent } from './UnsoldItemContent';

export interface UnsoldItemSummary {
	id?: number;
	name: string;
	quantity: number;
	datetime_created?: string;
}

type Props = {
	unsoldItemSummary: UnsoldItemSummary[];
	branch: Branch;
	branchMachine?: BranchMachine;
	user?: User;
	isForPrint?: boolean;
	loading?: boolean; // Added loading prop
	reportDate?: string; // Optional date for the report
	onClose: () => void;
};

export const ViewUnsoldItemModal = ({
	unsoldItemSummary,
	branch,
	branchMachine,
	user,
	loading = false, // Default to false
	reportDate,
	onClose,
}: Props) => {
	// STATES
	const [isCreatingTxt, setIsCreatingTxt] = useState<boolean>(false);

	// CUSTOM HOOKS
	const { htmlPdf, isLoadingPdf, previewPdf, downloadPdf } = usePdf({
		title: `UnsoldItemSummary_${new Date().toISOString().split('T')[0]}`,
		image:
			unsoldItemSummary.length === 0 && !loading
				? {
						src: imgNoTransaction,
						x: 50,
						y: 50,
						w: 300,
						h: 600,
					}
				: undefined,
		print: () =>
			printUnsoldItem({
				unsoldItemSummary,
				branch,
				branchMachine,
				user,
				isPdf: true,
				reportDate,
			}),
	});

	// METHODS
	const handlePrint = () => {
		printUnsoldItem({
			unsoldItemSummary,
			branch,
			branchMachine,
			user,
			reportDate,
		});
	};

	const handleCreateTxt = () => {
		setIsCreatingTxt(true);
		// TODO: Implement createUnsoldItemTxt when TXT printing is needed
		console.log('Create unsold item TXT:', {
			unsoldItemSummary,
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
					disabled={isLoadingPdf || isCreatingTxt || loading}
					icon={<PrinterOutlined />}
					type="primary"
					onClick={handlePrint}
				>
					Print
				</Button>,
				<PdfButtons
					key="pdf"
					downloadPdf={downloadPdf}
					isDisabled={isLoadingPdf || loading}
					isLoading={isLoadingPdf}
					previewPdf={previewPdf}
				/>,
				<Button
					key="txt"
					disabled={isLoadingPdf || isCreatingTxt || loading}
					icon={<FileTextOutlined />}
					loading={isCreatingTxt}
					type="primary"
					onClick={handleCreateTxt}
				>
					Create TXT
				</Button>,
			]}
			title="Unsold Items"
			width={425}
			centered
			closable
			open
			onCancel={onClose}
		>
			<Spin spinning={loading} tip="Loading products...">
				<UnsoldItemContent
					unsoldItemSummary={unsoldItemSummary}
					branch={branch}
					branchMachine={branchMachine}
					user={user}
					reportDate={reportDate}
				/>
			</Spin>

			<div
				dangerouslySetInnerHTML={{ __html: htmlPdf }}
				style={{ display: 'none' }}
			/>
		</Modal>
	);
};
