import { useQuery } from 'react-query';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../globals';
import { BranchesService } from '../services';
import { ListResponseData, QueryResponse } from '../services/interfaces';
import { Branch } from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery, UseRetrieveQuery } from './inteface';

const useBranches = (data: UseListQuery<Branch> = {}) => {
	const { params, options, serviceOptions } = data;

	return useQuery<ListResponseData<Branch>, Error, QueryResponse<Branch>>(
		['useBranches', params],
		() =>
			wrapServiceWithCatch(
				BranchesService.list(
					{
						page_size: params?.pageSize || DEFAULT_PAGE_SIZE,
						page: params?.page || DEFAULT_PAGE,
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

export const useBranchRetrieve = (data: UseRetrieveQuery<Branch>) => {
	const { id, options, serviceOptions } = data;

	return useQuery<Branch>(
		['useBranchRetrieve', id],
		() =>
			wrapServiceWithCatch(
				BranchesService.retrieve(
					id,
					serviceOptions?.baseURL,
					serviceOptions?.type,
				),
			),
		{
			enabled: typeof id === 'number',
			...options,
		},
	);
};

export default useBranches;
