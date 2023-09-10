import {
	DownloadOutlined,
	DownOutlined,
	FilePdfOutlined,
	PrinterOutlined,
} from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import React from 'react';
import { pdfButtonsKey } from '../../globals';

interface Props {
	downloadPdf: () => void;
	isDisabled?: boolean;
	isLoading?: boolean;
	previewPdf: () => void;
}

export const PdfButtons = ({
	downloadPdf,
	isDisabled,
	isLoading,
	previewPdf,
}: Props) => (
	<Dropdown
		className="ml-2"
		disabled={isDisabled}
		menu={{
			items: [
				{
					label: 'Preview',
					key: pdfButtonsKey.PREVIEW,
					icon: <FilePdfOutlined />,
				},
				{
					label: 'Download',
					key: pdfButtonsKey.DOWNLOAD,
					icon: <DownloadOutlined />,
				},
			],
			onClick: (item) => {
				if (item.key === pdfButtonsKey.PREVIEW) {
					previewPdf();
				} else if (item.key === pdfButtonsKey.DOWNLOAD) {
					downloadPdf();
				}
			},
		}}
	>
		<Button loading={isLoading} type="primary">
			<PrinterOutlined />
			PDF
			<DownOutlined className="pl-2" />
		</Button>
	</Dropdown>
);
