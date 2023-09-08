import { useMutation } from 'react-query';
import { CollectionReceiptsService } from 'services';

export const useCollectionReceiptCreate = (options = {}) =>
	useMutation<any, any, any>(
		({
			amount,
			bankBranch,
			bankName,
			branchMachineId,
			checkDate,
			checkNumber,
			createdById,
			orderOfPaymentId,
		}: any) =>
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
