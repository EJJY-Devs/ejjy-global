import { actions } from 'ducks/transactions';
import {
	DEFAULT_PAGE,
	MAX_PAGE_SIZE,
	request,
	timeRangeTypes,
} from 'ejjy-global';
import { wrapServiceWithCatch } from 'hooks/helper';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { TransactionsService } from 'services';
import { modifiedExtraCallback } from 'utils';
import { UseListQuery } from './inteface';
import { useActionDispatch } from './useActionDispatch';

export const useTransactions = () => {
	// STATES
	const [status, setStatus] = useState<any>(request.NONE);
	const [errors, setErrors] = useState<any>([]);

	// ACTIONS
	const listTransactionsAction = useActionDispatch(actions.listTransactions);
	const getTransactionAction = useActionDispatch(actions.getTransaction);
	const createTransactionAction = useActionDispatch(actions.createTransaction);
	const updateTransactionAction = useActionDispatch(actions.updateTransaction);
	const removeTransactionAction = useActionDispatch(actions.removeTransaction);
	const payTransactionAction = useActionDispatch(actions.payTransaction);
	const voidTransactionAction = useActionDispatch(actions.voidTransaction);

	// METHODS
	const listTransactions = (data, extraCallback = null) => {
		listTransactionsAction({
			...data,
			callback: modifiedExtraCallback(callback, extraCallback),
		});
	};

	const getTransaction = (transactionId, extraCallback = null) => {
		getTransactionAction({
			transactionId,
			callback: modifiedExtraCallback(callback, extraCallback),
		});
	};

	const createTransaction = (data, extraCallback = null) => {
		createTransactionAction({
			...data,
			callback: modifiedExtraCallback(callback, extraCallback),
		});
	};

	const updateTransaction = (data, extraCallback = null) => {
		updateTransactionAction({
			...data,
			callback: modifiedExtraCallback(callback, extraCallback),
		});
	};

	const removeTransaction = (id, extraCallback = null) => {
		removeTransactionAction({
			id,
			callback: modifiedExtraCallback(callback, extraCallback),
		});
	};

	const payTransaction = (data, extraCallback = null) => {
		payTransactionAction({
			...data,
			callback: modifiedExtraCallback(callback, extraCallback),
		});
	};

	const voidTransaction = (data, extraCallback = null) => {
		voidTransactionAction({
			...data,
			callback: modifiedExtraCallback(callback, extraCallback),
		});
	};

	const callback = ({
		status: responseStatus,
		errors: responseErrors = [],
	}) => {
		setStatus(responseStatus);
		setErrors(responseErrors);
	};

	return {
		listTransactions,
		getTransaction,
		createTransaction,
		updateTransaction,
		removeTransaction,
		payTransaction,
		voidTransaction,
		status,
		errors,
	};
};

const useTransactionsNew = ({ params, options }: UseListQuery) =>
	useQuery<any>(
		[
			'useTransactions',
			params?.isAdjusted,
			params?.statuses,
			params?.tellerId,
			params?.timeRange,
			params?.page,
			params?.pageSize,
		],
		() =>
			wrapServiceWithCatch(
				TransactionsService.list({
					is_adjusted: params?.isAdjusted,
					page_size: params?.pageSize || MAX_PAGE_SIZE,
					page: params?.page || DEFAULT_PAGE,
					statuses: params?.statuses,
					teller_id: params?.tellerId,
					time_range: params?.timeRange || timeRangeTypes.DAILY,
				}),
			),
		{
			initialData: { data: { results: [], count: 0 } },
			select: (query) => ({
				transactions: query.data.results,
				total: query.data.count,
			}),
			...options,
		},
	);

export const useTransactionRetrieve = ({ id, options }: UseListQuery) =>
	useQuery<any>(
		['useTransactionRetrieve', id],
		() => TransactionsService.retrieve(id),
		{
			initialData: { data: null },
			select: (query) => query.data,
			...options,
		},
	);

export const useTransactionComputeDiscount = () =>
	useMutation<any, any, any>(
		({ branchProducts, discountAmount, discountOptionId }: any) =>
			TransactionsService.compute({
				branch_products: branchProducts,
				discount_amount: discountAmount,
				discount_option_id: discountOptionId,
			}),
	);

export default useTransactionsNew;
