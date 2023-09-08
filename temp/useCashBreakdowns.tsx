import { DEFAULT_PAGE, MAX_PAGE_SIZE } from 'ejjy-global';
import { wrapServiceWithCatch } from 'hooks/helper';
import { UseListQuery } from 'hooks/inteface';
import { useMutation, useQuery } from 'react-query';
import { CashBreakdownsService } from 'services';

const useCashBreakdowns = ({ params, options }: UseListQuery) =>
	useQuery<any>(
		['useCashBreakdowns', params?.cashieringSessionId],
		() =>
			wrapServiceWithCatch(
				CashBreakdownsService.list({
					page: DEFAULT_PAGE,
					page_size: MAX_PAGE_SIZE,
					cashiering_session_id: params?.cashieringSessionId,
				}),
			),
		{
			initialData: { data: { results: [], count: 0 } },
			select: (query) => ({
				cashBreakdowns: query.data.results,
				total: query.data.count,
			}),
			...options,
		},
	);

export const useCashBreakdownCreate = () =>
	useMutation<any, any, any>(
		({
			bills_100,
			bills_1000,
			bills_20,
			bills_200,
			bills_50,
			bills_500,
			branchMachineId,
			cashieringSessionId,
			cashOutMetadata,
			category,
			coins_1,
			coins_10,
			coins_20,
			coins_25,
			coins_5,
			coins_50,
			remarks,
			type,
		}: any) =>
			CashBreakdownsService.create({
				bills_100,
				bills_1000,
				bills_20,
				bills_200,
				bills_50,
				bills_500,
				branch_machine_id: branchMachineId,
				cashiering_session_id: cashieringSessionId,
				cash_out_metadata: cashOutMetadata
					? {
							payee: cashOutMetadata.payee,
							particulars: cashOutMetadata.particulars,
							amount: cashOutMetadata.amount,
							prepared_by_user_id: cashOutMetadata.preparedByUserId,
							approved_by_user_id: cashOutMetadata.approvedByUserId,
							received_by: cashOutMetadata.receivedBy,
					  }
					: undefined,
				category,
				coins_1,
				coins_10,
				coins_20,
				coins_25,
				coins_5,
				coins_50,
				remarks,
				type,
			}),
	);

export default useCashBreakdowns;
