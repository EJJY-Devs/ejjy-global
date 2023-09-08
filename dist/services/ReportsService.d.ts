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
declare const service: {
    bulkExportReports: (body: BulkExport) => Promise<import("axios").AxiosResponse<any>>;
    generate: (body: Generate) => Promise<import("axios").AxiosResponse<any>>;
};
export default service;
