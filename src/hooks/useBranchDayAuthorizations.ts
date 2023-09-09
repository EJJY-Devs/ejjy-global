import { useQuery } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { BranchDayAuthorizationsService } from '../services';
import { Params } from '../services/BranchDayAuthorizationsService';
import { ListResponseData, QueryResponse } from '../services/interfaces';
import { BranchDayAuthorization } from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery } from './inteface';

const useBranchDayAuthorizations = (
	data: UseListQuery<BranchDayAuthorization, CamelCasedProperties<Params>> = {},
) => {
	const { params, options, serviceOptions } = data;

	return useQuery<
		ListResponseData<BranchDayAuthorization>,
		Error,
		QueryResponse<BranchDayAuthorization>
	>(
		['useBranchDayAuthorizations', params],
		() =>
			wrapServiceWithCatch(
				BranchDayAuthorizationsService.list(
					{
						branch_id: params?.branchId,
					},
					serviceOptions?.baseURL,
					serviceOptions?.type,
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

export default useBranchDayAuthorizations;
