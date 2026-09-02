import { AxiosRequestConfig } from 'axios';
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
declare const service: {
    bulkExportReports: (body: BulkExport, onUploadProgress?: AxiosRequestConfig['onUploadProgress'], baseURL?: string) => Promise<import("axios").AxiosResponse<string>>;
    generate: (body: Generate, baseURL?: string) => Promise<import("axios").AxiosResponse<boolean>>;
};
export default service;
