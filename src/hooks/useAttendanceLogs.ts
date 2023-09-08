import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../globals';
import { AttendanceLogsService } from '../services';
import { Create, Params } from '../services/AttendanceLogsService';
import {
	AxiosErrorResponse,
	ListResponseData,
	QueryResponse,
} from '../services/interfaces';
import { AttendanceLog } from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery } from './inteface';

const useAttendanceLogs = (
	data: UseListQuery<AttendanceLog, CamelCasedProperties<Params>> = {},
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

export const useAttendanceLogCreate = () =>
	useMutation<
		AxiosResponse<AttendanceLog>,
		AxiosErrorResponse,
		CamelCasedProperties<Create>
	>(({ accountCode, attendanceCategory, branchId }) =>
		AttendanceLogsService.create({
			account_code: accountCode,
			attendance_category: attendanceCategory,
			branch_id: branchId,
		}),
	);

export default useAttendanceLogs;
