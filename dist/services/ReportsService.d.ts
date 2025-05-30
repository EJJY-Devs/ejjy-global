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
    bulkExportReports: (body: BulkExport) => Promise<import("axios").AxiosResponse<string>>;
    generate: (body: Generate) => Promise<import("axios").AxiosResponse<boolean>>;
};
export default service;
