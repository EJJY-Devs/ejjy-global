import { actions } from 'ducks/sessions';
import {
	DEFAULT_PAGE,
	DEFAULT_PAGE_SIZE,
	CashieringSession,
} from 'ejjy-global';
import { wrapServiceWithCatch } from 'hooks/helper';
import { Mutate, UseListQuery, UseRetrieveQuery } from 'hooks/inteface';
import { useActionDispatch } from 'hooks/useActionDispatch';
import { useMutation, useQuery } from 'react-query';
import { CashieringSessionsService, SiteSettingsService } from 'services';
import { ListResponseData, QueryResponse } from 'services/interfaces';

interface ListQuery extends UseListQuery<CashieringSession> {
	params?: {
		page?: number;
		pageSize?: number;
		timeRange?: string;
	};
}

const useCashieringSessions = (data: ListQuery = {}) => {
	const { params, options } = data;

	return useQuery<
		ListResponseData<CashieringSession>,
		Error,
		QueryResponse<CashieringSession>
	>(
		[
			'useCashieringSessions',
			params?.page,
			params?.pageSize,
			params?.timeRange,
		],
		() =>
			wrapServiceWithCatch(
				CashieringSessionsService.list({
					page: params?.page || DEFAULT_PAGE,
					page_size: params?.pageSize || DEFAULT_PAGE_SIZE,
					time_range: params?.timeRange,
				}),
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
	const { id, options } = data;

	return useQuery<CashieringSession>(
		['useCashieringSessionRetrieve'],
		() => wrapServiceWithCatch(CashieringSessionsService.retrieve(id)),
		options,
	);
};

export const useCashieringSessionValidate = ({ options }: Mutate = {}) =>
	useMutation<any, any, any>(
		(id) => CashieringSessionsService.validate(id),
		options,
	);

export const useCashieringSessionStart = () => {
	const saveSession = useActionDispatch(actions.save);

	return useMutation<any, any, any>(
		({ branchMachineId, branchMachineRegistrationCount, login, password }) =>
			CashieringSessionsService.start({
				branch_machine_id: branchMachineId,
				branch_machine_registration_count: branchMachineRegistrationCount,
				login,
				password,
			}),
		{
			onSuccess: async ({ data }) => {
				const { data: siteSettings } = await SiteSettingsService.get();

				saveSession({
					...data,
					siteSettings,
				});
			},
		},
	);
};

export const useCashieringSessionEnd = () => {
	const clearSession = useActionDispatch(actions.clear);

	return useMutation<any, any, any>(
		({ id, branchMachineId, isAutomaticallyClosed }) =>
			CashieringSessionsService.end(id, {
				branch_machine_id: branchMachineId,
				is_automatically_closed: isAutomaticallyClosed,
			}),
		{
			onSuccess: clearSession,
		},
	);
};

export default useCashieringSessions;
