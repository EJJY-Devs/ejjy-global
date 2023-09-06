import { useQuery } from 'react-query';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../globals';
import { ListResponseData, QueryResponse } from '../services/interfaces';
import { Account } from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery, UseListQueryParams, UseRetrieveQuery } from './inteface';
import { AccountsService } from '../services';

interface ListQueryParams extends UseListQueryParams {
	accountCode: string;
	type?: string;
	withCreditRegistration?: boolean;
	withSupplierRegistration?: boolean;
}

const useAccounts = (data: UseListQuery<Account, ListQueryParams> = {}) => {
	const { params, options, serviceOptions } = data;

	return useQuery<ListResponseData<Account>, Error, QueryResponse<Account>>(
		['useAccounts', { ...params }],
		() =>
			wrapServiceWithCatch(
				AccountsService.list(
					{
						account_code: params?.accountCode,
						page_size: params?.pageSize || DEFAULT_PAGE_SIZE,
						page: params?.page || DEFAULT_PAGE,
						search: params?.search,
						type: params?.type,
						with_credit_registration: params?.withCreditRegistration,
						with_supplier_registration: params?.withSupplierRegistration,
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

export const useAccountRetrieve = (data: UseRetrieveQuery<Account>) => {
	const { id, options, serviceOptions } = data;

	useQuery<Account>(
		['useAccountRetrieve', id],
		() =>
			wrapServiceWithCatch(
				AccountsService.retrieve(id, serviceOptions?.baseURL),
			),
		{
			enabled: typeof id === 'number',
			...options,
		},
	);
};

export default useAccounts;
