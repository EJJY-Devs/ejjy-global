import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../globals';
import { AttendanceLogsService } from '../services';
import {
	AxiosErrorResponse,
	ListResponseData,
	QueryResponse,
} from '../services/interfaces';
import {
	AttendanceLog,
	AttendanceLogCategory,
	AttendanceLogType,
} from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery, UseListQueryParams } from './inteface';

interface ListQueryParams extends UseListQueryParams {
	attendanceCategory?: AttendanceLogCategory;
	attendanceType?: AttendanceLogType;
	branchId?: number;
	employeeId?: string;
}

const useAttendanceLogs = (
	data: UseListQuery<AttendanceLog, ListQueryParams> = {},
) => {
	const { params, options, serviceOptions } = data;

	return useQuery<
		ListResponseData<AttendanceLog>,
		Error,
		QueryResponse<AttendanceLog>
	>(
		['useAttendanceLogs', params],
		() =>
			wrapServiceWithCatch(
				AttendanceLogsService.list(
					{
						attendance_category: params?.attendanceCategory,
						attendance_type: params?.attendanceType,
						branch_id: params?.branchId,
						employee_id: params?.employeeId,
						page_size: params?.pageSize || DEFAULT_PAGE_SIZE,
						page: params?.page || DEFAULT_PAGE,
						time_range: params?.timeRange,
					},
					serviceOptions?.baseURL,
				),
			),
		{
			placeholderData: {
				results: [],
				count: 0,
			},
			select: (query) => ({
				list: query.results,
				total: query.count,
			}),
			...options,
		},
	);
};

interface CreateBody {
	accountCode: number;
	attendanceCategory: AttendanceLogCategory;
	branchId: number;
}

export const useAttendanceLogCreate = () =>
	useMutation<AxiosResponse<AttendanceLog>, AxiosErrorResponse, CreateBody>(
		({ accountCode, attendanceCategory, branchId }) =>
			AttendanceLogsService.create({
				account_code: accountCode,
				attendance_category: attendanceCategory,
				branch_id: branchId,
			}),
	);

export default useAttendanceLogs;
