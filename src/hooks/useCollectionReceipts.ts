import { AxiosResponse } from 'axios';
import { UseMutationOptions, useMutation } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { CollectionReceiptsService } from '../services';
import { Create } from '../services/CollectionReceiptsService';
import { AxiosErrorResponse } from '../services/interfaces';
import { CollectionReceipt } from '../types';

export const useCollectionReceiptCreate = (
	options?: UseMutationOptions<
		AxiosResponse<CollectionReceipt>,
		AxiosErrorResponse,
		CamelCasedProperties<Create>
	>,
) =>
	useMutation<
		AxiosResponse<CollectionReceipt>,
		AxiosErrorResponse,
		CamelCasedProperties<Create>
	>(
		({
			amount,
			bankBranch,
			bankName,
			branchMachineId,
			checkDate,
			checkNumber,
			createdById,
			orderOfPaymentId,
		}) =>
			CollectionReceiptsService.create({
				amount,
				bank_branch: bankBranch,
				bank_name: bankName,
				branch_machine_id: branchMachineId,
				check_date: checkDate,
				check_number: checkNumber,
				created_by_id: createdById,
				order_of_payment_id: orderOfPaymentId,
			}),
		options,
	);
