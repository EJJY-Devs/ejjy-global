import { AxiosResponse } from 'axios';
import { useMutation, UseMutationOptions, useQuery } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../globals';
import { UsersService } from '../services';
import {
	AuthenticateAnAction,
	Modify,
	Params,
	RequestUserTypeChange,
	UserPendingApproval,
} from '../services/UsersService';
import {
	AxiosErrorResponse,
	ListResponseData,
	QueryResponse,
} from '../services/interfaces';
import { User } from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery, UseRetrieveQuery } from './inteface';

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

export const useUserRetrieve = (data: UseRetrieveQuery<User>) => {
	const { id, options, serviceOptions } = data;

	return useQuery<User>(
		['useUserRetrieve', id],
		() =>
			wrapServiceWithCatch(UsersService.retrieve(id, serviceOptions?.baseURL)),
		options,
	);
};

export const useUserAuthenticate = (
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
	>(
		({ login, password, description, branchMachineId, branchId }) =>
			UsersService.authenticateAnAction(
				{
					login,
					password,
					description,
					branch_machine_id: branchMachineId,
					branch_id: branchId,
				},
				baseURL,
			),
		options,
	);

export const useUserCreate = (
	options?: UseMutationOptions<
		AxiosResponse<User>,
		AxiosErrorResponse,
		CamelCasedProperties<Modify>
	>,
	baseURL?: string,
) =>
	useMutation<
		AxiosResponse<User>,
		AxiosErrorResponse,
		CamelCasedProperties<Modify>
	>(
		({
			contactNumber,
			displayName,
			email,
			firstName,
			lastName,
			password,
			userType,
			username,
		}) =>
			UsersService.create(
				{
					contact_number: contactNumber,
					display_name: displayName,
					email,
					first_name: firstName,
					last_name: lastName,
					password,
					user_type: userType,
					username,
				},
				baseURL,
			),
		options,
	);

export const useUserEdit = (
	options?: UseMutationOptions<
		AxiosResponse<User>,
		AxiosErrorResponse,
		CamelCasedProperties<Modify & { id: number }>
	>,
	baseURL?: string,
) =>
	useMutation<
		AxiosResponse<User>,
		AxiosErrorResponse,
		CamelCasedProperties<Modify & { id: number }>
	>(
		({
			id,
			contactNumber,
			displayName,
			email,
			firstName,
			lastName,
			password,
			userType,
		}) =>
			UsersService.edit(
				id,
				{
					contact_number: contactNumber,
					display_name: displayName,
					email,
					first_name: firstName,
					last_name: lastName,
					password,
					user_type: userType,
				},
				baseURL,
			),
		options,
	);

export const useUserDelete = (
	options?: UseMutationOptions<AxiosResponse<void>, AxiosErrorResponse, number>,
	baseURL?: string,
) =>
	useMutation<AxiosResponse<void>, AxiosErrorResponse, number>(
		(id: number) => UsersService.delete(id, baseURL),
		options,
	);

export const useUserRequestUserTypeChange = (
	options?: UseMutationOptions<
		AxiosResponse<boolean>,
		AxiosErrorResponse,
		CamelCasedProperties<RequestUserTypeChange & { id: number }>
	>,
	baseURL?: string,
) =>
	useMutation<
		AxiosResponse<boolean>,
		AxiosErrorResponse,
		CamelCasedProperties<RequestUserTypeChange & { id: number }>
	>(
		({ id, newUserType }) =>
			UsersService.requestUserTypeChange(
				id,
				{ new_user_type: newUserType },
				baseURL,
			),
		options,
	);

export const useUserRequestUserDeletion = (
	options?: UseMutationOptions<
		AxiosResponse<boolean>,
		AxiosErrorResponse,
		number
	>,
	baseURL?: string,
) =>
	useMutation<AxiosResponse<boolean>, AxiosErrorResponse, number>(
		(id) => UsersService.requestUserDeletion(id, baseURL),
		options,
	);

export const useUserApproveUserPendingApproval = (
	options?: UseMutationOptions<
		AxiosResponse<boolean>,
		AxiosErrorResponse,
		CamelCasedProperties<UserPendingApproval & { id: number }>
	>,
	baseURL?: string,
) =>
	useMutation<
		AxiosResponse<boolean>,
		AxiosErrorResponse,
		CamelCasedProperties<UserPendingApproval & { id: number }>
	>(
		({ id, pendingApprovalType }) =>
			UsersService.approveUserPendingApproval(
				id,
				{ pending_approval_type: pendingApprovalType },
				baseURL,
			),
		options,
	);

export const useUserDeclineUserPendingApproval = (
	options?: UseMutationOptions<
		AxiosResponse<boolean>,
		AxiosErrorResponse,
		CamelCasedProperties<UserPendingApproval & { id: number }>
	>,
	baseURL?: string,
) =>
	useMutation<
		AxiosResponse<boolean>,
		AxiosErrorResponse,
		CamelCasedProperties<UserPendingApproval & { id: number }>
	>(
		({ id, pendingApprovalType }) =>
			UsersService.declineUserPendingApproval(
				id,
				{ pending_approval_type: pendingApprovalType },
				baseURL,
			),
		options,
	);

export default useUsers;
