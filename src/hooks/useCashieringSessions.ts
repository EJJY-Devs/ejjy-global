import { AxiosResponse } from 'axios';
import { UseMutationOptions, useMutation, useQuery } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../globals';
import { CashieringSessionsService } from '../services';
import { End, Start } from '../services/CashieringSessionsService';
import {
	AxiosErrorResponse,
	ListResponseData,
	QueryResponse,
} from '../services/interfaces';
import { CashieringSession } from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery, UseRetrieveQuery } from './inteface';

const useCashieringSessions = (data: UseListQuery<CashieringSession> = {}) => {
	const { params, options, serviceOptions } = data;

	return useQuery<
		ListResponseData<CashieringSession>,
		Error,
		QueryResponse<CashieringSession>
	>(
		['useCashieringSessions', params],
		() =>
			wrapServiceWithCatch(
				CashieringSessionsService.list(
					{
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

export const useCashieringSessionRetrieve = (
	data: UseRetrieveQuery<CashieringSession>,
) => {
	const { id, options, serviceOptions } = data;

	return useQuery<CashieringSession>(
		['useCashieringSessionRetrieve'],
		() =>
			wrapServiceWithCatch(
				CashieringSessionsService.retrieve(id, serviceOptions?.baseURL),
			),
		{
			enabled: typeof id === 'number',
			...options,
		},
	);
};

export const useCashieringSessionValidate = (
	options?: UseMutationOptions<
		AxiosResponse<boolean>,
		AxiosErrorResponse,
		number
	>,
) =>
	useMutation<AxiosResponse<boolean>, AxiosErrorResponse, number>(
		(id: number) => CashieringSessionsService.validate(id),
		options,
	);

export const useCashieringSessionStart = (
	options: UseMutationOptions<
		AxiosResponse<CashieringSession>,
		AxiosErrorResponse,
		CamelCasedProperties<Start>
	>,
) => {
	// TODO: Call this action on the app side and not here.
	// const saveSession = useActionDispatch(actions.save);

	return useMutation<
		AxiosResponse<CashieringSession>,
		AxiosErrorResponse,
		CamelCasedProperties<Start>
	>(
		({ branchMachineId, branchMachineRegistrationCount, login, password }) =>
			CashieringSessionsService.start({
				branch_machine_id: branchMachineId,
				branch_machine_registration_count: branchMachineRegistrationCount,
				login,
				password,
			}),
		options,
		// {
		// TODO: Call this action on the app side and not here.
		// 	onSuccess: async ({ data }) => {
		// 		const { data: siteSettings } = await SiteSettingsService.get();

		// 		saveSession({
		// 			...data,
		// 			siteSettings,
		// 		});
		// 	},
		// },
	);
};

export const useCashieringSessionEnd = (
	options?: UseMutationOptions<
		AxiosResponse<CashieringSession>,
		AxiosErrorResponse,
		CamelCasedProperties<End>
	>,
) =>
	useMutation<
		AxiosResponse<CashieringSession>,
		AxiosErrorResponse,
		CamelCasedProperties<End>
	>(
		({ id, branchMachineId, isAutomaticallyClosed }) =>
			CashieringSessionsService.end({
				id,
				branch_machine_id: branchMachineId,
				is_automatically_closed: isAutomaticallyClosed,
			}),
		options,
	);

export default useCashieringSessions;
