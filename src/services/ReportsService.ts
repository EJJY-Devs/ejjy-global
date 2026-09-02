import axios, { AxiosRequestConfig } from 'axios';

export type BulkExportData = {
	folder_name: string;
	file_name: string;
	contents: string | null;
};

interface BulkExport {
	data?: BulkExportData[];
}

interface Generate {
	branch_id?: number;
	branch_machine_id?: number;
	user_id?: number;
}

const service = {
	bulkExportReports: async (
		body: BulkExport,
		onUploadProgress?: AxiosRequestConfig['onUploadProgress'],
		baseURL?: string,
	) =>
		axios.post<string>('/reports/bulk-export/', body, {
			onUploadProgress,
			baseURL,
		}),

	generate: async (body: Generate, baseURL?: string) =>
		axios.post<boolean>('/reports/generate-reports/', body, { baseURL }),
};

export default service;
