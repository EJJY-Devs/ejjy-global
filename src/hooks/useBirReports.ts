import { useQuery } from 'react-query';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../globals';
import { BirReportsService } from '../services';
import { ListResponseData, QueryResponse } from '../services/interfaces';
import { BirReport } from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery, UseListQueryParams } from './inteface';

interface ListQueryParams extends UseListQueryParams {
	branchMachineId?: number;
}

const useBirReports = (data: UseListQuery<BirReport, ListQueryParams> = {}) => {
	const { params, options, serviceOptions } = data;

	return useQuery<ListResponseData<BirReport>, Error, QueryResponse<BirReport>>(
		['useBirReports', params],
		async () =>
			wrapServiceWithCatch(
				BirReportsService.list(
					{
						branch_machine_id: params?.branchMachineId,
						page: params?.page || DEFAULT_PAGE,
						page_size: params?.pageSize || DEFAULT_PAGE_SIZE,
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

export default useBirReports;
