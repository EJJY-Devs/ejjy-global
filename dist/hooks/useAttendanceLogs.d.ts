import { AxiosResponse } from 'axios';
import { AxiosErrorResponse, QueryResponse } from '../services/interfaces';
import { AttendanceLog, AttendanceLogCategory, AttendanceLogType } from '../types';
import { UseListQuery, UseListQueryParams } from './inteface';
interface ListQueryParams extends UseListQueryParams {
    attendanceCategory?: AttendanceLogCategory;
    attendanceType?: AttendanceLogType;
    branchId?: number;
    employeeId?: string;
}
declare const useAttendanceLogs: (data?: UseListQuery<AttendanceLog, ListQueryParams>) => import("react-query").UseQueryResult<QueryResponse<AttendanceLog>, Error>;
interface CreateBody {
    accountCode: number;
    attendanceCategory: AttendanceLogCategory;
    branchId: number;
}
export declare const useAttendanceLogCreate: () => import("react-query").UseMutationResult<AxiosResponse<AttendanceLog>, AxiosErrorResponse<any>, CreateBody, unknown>;
export default useAttendanceLogs;
