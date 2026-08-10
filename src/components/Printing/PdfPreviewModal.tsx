import { DownloadOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React from 'react';

type Props = {
	src: string;
	title?: string;
	open: boolean;
	onClose: () => void;
	onDownload?: () => void;
};

export const PdfPreviewModal = ({
	src,
	title = 'PDF Preview',
	open,
	onClose,
	onDownload,
}: Props) => (
	<Modal
		bodyStyle={{ padding: 0, height: '80vh' }}
		footer={
			onDownload
				? [
						<Button
							key="download"
							icon={<DownloadOutlined />}
							type="primary"
							onClick={onDownload}
						>
							Download
						</Button>,
					]
				: null
		}
		title={title}
		width={900}
		centered
		destroyOnClose
		open={open}
		onCancel={onClose}
	>
		{src ? (
			<iframe
				src={src}
				style={{ width: '100%', height: '100%', border: 'none' }}
				title={title}
			/>
		) : null}
	</Modal>
);
