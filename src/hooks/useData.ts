import { AxiosResponse } from 'axios';
import {
	UseMutationOptions,
	UseQueryOptions,
	useMutation,
	useQuery,
} from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { DataService } from '../services';
import { Params, Upload } from '../services/DataService';
import { AxiosErrorResponse } from '../services/interfaces';
import { wrapServiceWithCatch } from './helper';

export const REFETCH_SYNC_INTERVAL_MS = 60000;

export const useUploadData = (
	options?: UseMutationOptions<
		AxiosResponse<boolean>,
		AxiosErrorResponse,
		CamelCasedProperties<Upload>
	>,
) =>
	useMutation<
		AxiosResponse<boolean>,
		AxiosErrorResponse,
		CamelCasedProperties<Upload>
	>(
		({ branchMachineId, isBackOffice }) =>
			DataService.upload({
				branch_machine_id: branchMachineId,
				is_back_office: isBackOffice,
			}),
		options,
	);

interface InitializeDataQuery<T, TParams> {
	options?: UseQueryOptions<T, Error>;
	params?: TParams;
}

export const useInitializeData = (
	data: InitializeDataQuery<void, CamelCasedProperties<Params>> = {},
) => {
	const { params, options } = data;

	return useQuery<void, Error>(
		['useInitializeData', params],
		() =>
			wrapServiceWithCatch(
				DataService.initialize({
					branch_id: params?.branchId,
					branch_machine_id: params?.branchMachineId,
				}),
			),
		{
			refetchInterval: REFETCH_SYNC_INTERVAL_MS,
			refetchIntervalInBackground: true,
			notifyOnChangeProps: ['isLoading'],
			...options,
		},
	);
};
