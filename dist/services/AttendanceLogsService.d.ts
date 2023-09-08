import { AttendanceLog, AttendanceLogCategory, AttendanceLogType } from '../types';
import { ListQueryParams, ListResponseData } from './interfaces';
export interface Params extends ListQueryParams {
    attendance_category?: AttendanceLogCategory;
    attendance_type?: AttendanceLogType;
    branch_id?: number;
    employee_id?: string;
}
export interface Create {
    account_code: number;
    attendance_category: AttendanceLogCategory;
    branch_id: number;
}
declare const service: {
    list: (params: Params, baseURL?: string) => Promise<ListResponseData<AttendanceLog>>;
    create: (body: Create) => Promise<import("axios").AxiosResponse<AttendanceLog>>;
};
export default service;
