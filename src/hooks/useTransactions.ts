import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, timeRangeTypes } from '../globals';
import { TransactionsService } from '../services';
import {
	ComputeDiscount,
	ComputeDiscountResponse,
	Create,
	Edit,
	Params,
	Pay,
	Void,
} from '../services/TransactionsService';
import {
	AxiosErrorResponse,
	ListResponseData,
	QueryResponse,
} from '../services/interfaces';
import { Transaction } from '../types';
import { standardRound } from '../utils';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery, UseRetrieveQuery } from './inteface';

const useTransactions = (
	data: UseListQuery<Transaction, CamelCasedProperties<Params>> = {},
) => {
	const { params, options, serviceOptions } = data;

	return useQuery<
		ListResponseData<Transaction>,
		Error,
		QueryResponse<Transaction>
	>(
		['useTransactions', { ...params }],
		() =>
			wrapServiceWithCatch(
				TransactionsService.list(
					{
						is_adjusted: params?.isAdjusted,
						page_size: params?.pageSize || DEFAULT_PAGE_SIZE,
						page: params?.page || DEFAULT_PAGE,
						statuses: params?.statuses,
						teller_id: params?.tellerId,
						time_range: params?.timeRange || timeRangeTypes.DAILY,
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

export const useTransactionRetrieve = (data: UseRetrieveQuery<Transaction>) => {
	const { id, options, serviceOptions } = data;

	return useQuery<Transaction>(
		['useTransactionRetrieve', id],
		() => TransactionsService.retrieve(id, serviceOptions?.baseURL),
		{
			enabled: typeof id === 'number',
			...options,
		},
	);
};

export const useTransactionComputeDiscount = () =>
	useMutation<
		AxiosResponse<ComputeDiscountResponse>,
		AxiosErrorResponse,
		CamelCasedProperties<ComputeDiscount>
	>(({ branchProducts, discountAmount, discountOptionId }) =>
		TransactionsService.compute({
			branch_products: branchProducts,
			discount_amount: discountAmount,
			discount_option_id: discountOptionId,
		}),
	);

export const useTransactionCreate = () =>
	useMutation<
		AxiosResponse<Transaction>,
		AxiosErrorResponse,
		CamelCasedProperties<Create>
	>(
		({
			branchMachineId,
			client,
			customerAccountId,
			overallDiscount = 0,
			previousVoidedTransactionId,
			products,
			status,
			tellerId,
		}) =>
			TransactionsService.create({
				branch_machine_id: branchMachineId,
				client,
				customer_account_id: customerAccountId,
				overall_discount: standardRound(Number(overallDiscount)),
				previous_voided_transaction_id: previousVoidedTransactionId,
				products,
				status,
				teller_id: tellerId,
			}),
	);

export const useTransactionPay = () =>
	useMutation<
		AxiosResponse<Transaction>,
		AxiosErrorResponse,
		CamelCasedProperties<Pay>
	>(
		({
			amountTendered,
			branchMachineId,
			cashierUserId,
			creditPaymentAuthorizerId,
			creditorAccountId,
			discountAuthorizerId,
			discountAmount,
			discountOptionAdditionalFieldsValues,
			discountOptionId,
			transactionId,
		}) =>
			TransactionsService.pay({
				amount_tendered: amountTendered,
				branch_machine_id: branchMachineId,
				cashier_user_id: cashierUserId,
				credit_payment_authorizer_id: creditPaymentAuthorizerId,
				creditor_account_id: creditorAccountId,
				discount_authorizer_id: discountAuthorizerId,
				discount_amount: discountAmount,
				discount_option_additional_fields_values:
					discountOptionAdditionalFieldsValues,
				discount_option_id: discountOptionId,
				transaction_id: transactionId,
			}),
	);

export const useTransactionEdit = () =>
	useMutation<
		AxiosResponse<Transaction>,
		AxiosErrorResponse,
		CamelCasedProperties<Edit>
	>(({ id, products, overallDiscount, status }) =>
		TransactionsService.update({
			id,
			products,
			overall_discount: overallDiscount,
			status,
		}),
	);

export const useTransactionVoid = () =>
	useMutation<
		AxiosResponse<Transaction>,
		AxiosErrorResponse,
		CamelCasedProperties<Void>
	>(({ id, branchMachineId, cashierUserId, voidAuthorizerId }) =>
		TransactionsService.void({
			id,
			branch_machine_id: branchMachineId,
			cashier_user_id: cashierUserId,
			void_authorizer_id: voidAuthorizerId,
		}),
	);

export const useTransactionDelete = () =>
	useMutation<AxiosResponse<void>, AxiosErrorResponse, number>((id: number) =>
		TransactionsService.delete(id),
	);

export default useTransactions;
