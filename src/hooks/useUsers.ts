import { AxiosResponse } from 'axios';
import { useMutation, UseMutationOptions, useQuery } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../globals';
import { UsersService } from '../services';
import { AuthenticateAnAction, Params } from '../services/UsersService';
import {
	AxiosErrorResponse,
	ListResponseData,
	QueryResponse,
} from '../services/interfaces';
import { User } from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery } from './inteface';

const useUsers = (
	data: UseListQuery<User, CamelCasedProperties<Params>> = {},
) => {
	const { params, options, serviceOptions } = data;

	return useQuery<ListResponseData<User>, Error, QueryResponse<User>>(
		[
			'useUsers',
			params?.branchId,
			params?.isPendingCreateApproval,
			params?.isPendingUpdateUserTypeApproval,
			params?.isPendingDeleteApproval,
			params?.ordering,
			params?.page,
			params?.pageSize,
			params?.search,
		],
		async () =>
			wrapServiceWithCatch(
				UsersService.list(
					{
						branch_id: params?.branchId,
						ordering: params?.ordering,
						page: params?.page || DEFAULT_PAGE,
						page_size: params?.pageSize || DEFAULT_PAGE_SIZE,
						is_pending_create_approval: params?.isPendingCreateApproval,
						is_pending_update_user_type_approval:
							params?.isPendingUpdateUserTypeApproval,
						is_pending_delete_approval: params?.isPendingDeleteApproval,
						search: params?.search,
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

export const useUsersAuthenticate = (
	options?: UseMutationOptions<
		AxiosResponse<User>,
		AxiosErrorResponse,
		CamelCasedProperties<AuthenticateAnAction>
	>,
	baseURL?: string,
) =>
	useMutation<
		AxiosResponse<User>,
		AxiosErrorResponse,
		CamelCasedProperties<AuthenticateAnAction>
	>(({ login, password, description }) =>
		UsersService.authenticateAnAction(
			{
				login,
				password,
				description,
			},
			baseURL,
		),
	);

export default useUsers;
