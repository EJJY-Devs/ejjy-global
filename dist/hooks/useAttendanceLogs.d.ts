import { AxiosResponse } from 'axios';
import { CamelCasedProperties } from 'type-fest';
import { Params } from '../services/AttendanceLogsService';
import { AxiosErrorResponse, QueryResponse } from '../services/interfaces';
import { AttendanceLog } from '../types';
import { UseListQuery } from './inteface';
declare const useAttendanceLogs: (data?: UseListQuery<AttendanceLog, CamelCasedProperties<Params>>) => import("react-query").UseQueryResult<QueryResponse<AttendanceLog>, Error>;
export declare const useAttendanceLogCreate: () => import("react-query").UseMutationResult<AxiosResponse<AttendanceLog>, AxiosErrorResponse<any>, {
    accountCode: string;
    attendanceCategory: import("../types").AttendanceLogCategory;
    branchId: number;
    pin: string;
}, unknown>;
export default useAttendanceLogs;
