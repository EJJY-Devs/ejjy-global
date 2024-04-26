import { AxiosResponse } from 'axios';
import { useMutation, UseMutationOptions, useQuery } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../globals';
import { UsersService } from '../services';
import { AuthenticateAnAction } from '../services/UsersService';
import {
	AxiosErrorResponse,
	ListResponseData,
	QueryResponse,
} from '../services/interfaces';
import { User } from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery } from './inteface';

const useUsers = (data: UseListQuery<User> = {}) => {
	const { params, options, serviceOptions } = data;

	return useQuery<ListResponseData<User>, Error, QueryResponse<User>>(
		['useUsers', params],
		async () =>
			wrapServiceWithCatch(
				UsersService.list(
					{
						page: params?.page || DEFAULT_PAGE,
						page_size: params?.pageSize || DEFAULT_PAGE_SIZE,
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
