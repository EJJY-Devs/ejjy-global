import { FileExcelOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

type Props = {
	downloadExcel: () => void;
	isDisabled?: boolean;
	isLoading?: boolean;
};

export const ExcelButton = ({
	downloadExcel,
	isDisabled,
	isLoading,
}: Props) => (
	<Button
		className="ml-2"
		disabled={isDisabled}
		icon={<FileExcelOutlined />}
		loading={isLoading}
		type="primary"
		onClick={downloadExcel}
	>
		Excel
	</Button>
);
