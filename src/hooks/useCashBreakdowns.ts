import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { CamelCasedProperties, CamelCasedPropertiesDeep } from 'type-fest';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../globals';
import { CashBreakdownsService } from '../services';
import { Create, Params } from '../services/CashBreakdownsService';
import {
	AxiosErrorResponse,
	ListResponseData,
	QueryResponse,
} from '../services/interfaces';
import { CashBreakdown } from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery } from './inteface';

const useCashBreakdowns = (
	data: UseListQuery<CashBreakdown, CamelCasedProperties<Params>> = {},
) => {
	const { params, options, serviceOptions } = data;

	return useQuery<
		ListResponseData<CashBreakdown>,
		Error,
		QueryResponse<CashBreakdown>
	>(
		['useCashBreakdowns', params],
		() =>
			wrapServiceWithCatch(
				CashBreakdownsService.list(
					{
						cashiering_session_id: params?.cashieringSessionId,
						page: params?.page || DEFAULT_PAGE,
						page_size: params?.pageSize || DEFAULT_PAGE_SIZE,
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

export const useCashBreakdownCreate = () =>
	useMutation<
		AxiosResponse<CashBreakdown>,
		AxiosErrorResponse,
		CamelCasedPropertiesDeep<Partial<Create>>
	>((body) =>
		CashBreakdownsService.create({
			bills_100: body.bills100,
			bills_1000: body.bills1000,
			bills_20: body.bills20,
			bills_200: body.bills200,
			bills_50: body.bills50,
			bills_500: body.bills500,
			branch_machine_id: body.branchMachineId,
			cashiering_session_id: body.cashieringSessionId,
			cash_out_metadata: body.cashOutMetadata
				? {
						payee: body.cashOutMetadata.payee,
						particulars: body.cashOutMetadata.particulars,
						amount: body.cashOutMetadata.amount,
						prepared_by_user_id: body.cashOutMetadata.preparedByUserId,
						approved_by_user_id: body.cashOutMetadata.approvedByUserId,
						received_by: body.cashOutMetadata.receivedBy,
					}
				: undefined,
			category: body.category,
			coins_1: body.coins1,
			coins_10: body.coins10,
			coins_20: body.coins20,
			coins_25: body.coins25,
			coins_5: body.coins5,
			coins_50: body.coins50,
			remarks: body.remarks,
			type: body.type,
		}),
	);

export default useCashBreakdowns;
