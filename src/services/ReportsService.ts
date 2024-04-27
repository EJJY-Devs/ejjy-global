import axios from 'axios';

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
}

const service = {
	bulkExportReports: async (body: BulkExport) =>
		axios.post<string>('/reports/bulk-export/', body),

	generate: async (body: Generate) =>
		axios.post<boolean>('/reports/generate-reports/', body),
};

export default service;
