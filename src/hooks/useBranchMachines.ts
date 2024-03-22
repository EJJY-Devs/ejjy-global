import { AxiosResponse } from 'axios';
import { UseMutationOptions, useMutation, useQuery } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { BranchMachinesService } from '../services';
import { Modify, Params, Ping } from '../services/BranchMachinesService';
import {
	AxiosErrorResponse,
	ListResponseData,
	QueryResponse,
} from '../services/interfaces';
import { BranchMachine } from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery, UseRetrieveQuery } from './inteface';

const useBranchMachines = (
	data: UseListQuery<BranchMachine, CamelCasedProperties<Params>> = {},
) => {
	const { params, options, serviceOptions } = data;

	return useQuery<
		ListResponseData<BranchMachine>,
		Error,
		QueryResponse<BranchMachine>
	>(
		['useBranchMachines', params],
		() =>
			wrapServiceWithCatch(
				BranchMachinesService.list(
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

export const useBranchMachineRetrieve = (
	data: UseRetrieveQuery<BranchMachine>,
) => {
	const { id, options, serviceOptions } = data;

	return useQuery<BranchMachine>(
		['useBranchMachineRetrieve', id],
		() =>
			wrapServiceWithCatch(
				BranchMachinesService.retrieve(
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

export const useBranchMachinePing = () =>
	useMutation<
		AxiosResponse<boolean>,
		AxiosErrorResponse,
		CamelCasedProperties<Ping>
	>(({ onlineBranchMachineId, onlineApiUrlOverride }) =>
		BranchMachinesService.ping({
			online_branch_machine_id: onlineBranchMachineId,
			online_api_url_override: onlineApiUrlOverride,
		}),
	);

export const useBranchMachineCreate = (
	options?: UseMutationOptions<
		AxiosResponse<BranchMachine>,
		AxiosErrorResponse,
		CamelCasedProperties<Modify>
	>,
	baseURL?: string,
) =>
	useMutation<
		AxiosResponse<BranchMachine>,
		AxiosErrorResponse,
		CamelCasedProperties<Modify>
	>(
		({
			branchId,
			machineIdentificationNumber,
			name,
			permitToUse,
			serverUrl,
			storageSerialNumber,
			type,
		}: any) =>
			BranchMachinesService.create(
				{
					branch_id: branchId,
					machine_identification_number: machineIdentificationNumber,
					name,
					permit_to_use: permitToUse,
					server_url: serverUrl,
					storage_serial_number: storageSerialNumber,
					type,
				},
				baseURL,
			),
		options,
	);

export const useBranchMachineEdit = (
	options?: UseMutationOptions<
		AxiosResponse<BranchMachine>,
		AxiosErrorResponse,
		CamelCasedProperties<Modify>
	>,
	baseURL?: string,
) =>
	useMutation<
		AxiosResponse<BranchMachine>,
		AxiosErrorResponse,
		CamelCasedProperties<Modify>
	>(
		({
			id,
			branchId,
			machineIdentificationNumber,
			name,
			permitToUse,
			serverUrl,
			storageSerialNumber,
			type,
		}: any) =>
			BranchMachinesService.edit(
				id,
				{
					branch_id: branchId,
					machine_identification_number: machineIdentificationNumber,
					name,
					permit_to_use: permitToUse,
					server_url: serverUrl,
					storage_serial_number: storageSerialNumber,
					type,
				},
				baseURL,
			),
		options,
	);

export const useBranchMachineDelete = (
	options?: UseMutationOptions<AxiosResponse<void>, AxiosErrorResponse, number>,
	baseURL?: string,
) =>
	useMutation<AxiosResponse<void>, AxiosErrorResponse, number>(
		(id: number) => BranchMachinesService.delete(id, baseURL),
		options,
	);

export default useBranchMachines;
