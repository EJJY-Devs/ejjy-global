import axios from 'axios';

export type BulkExportData = {
	folder_name: string;
	file_name: string;
	contents: string;
};

interface BulkExport {
	data: BulkExportData[];
}

interface Generate {
	branch_id: number;
}

const service = {
	bulkExportReports: async (body: BulkExport) =>
		axios.post('/reports/bulk-export/', body),

	generate: async (body: Generate) =>
		axios.post('/reports/generate-reports/', body),
};

export default service;
