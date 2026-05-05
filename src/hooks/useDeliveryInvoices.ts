import axios from 'axios';
import { useQuery } from 'react-query';
import { DeliveryInvoice } from '../types';

interface Params {
	branchMachineId?: number;
	timeRange?: string;
}

interface Query {
	params?: Params;
}

interface DeliveryInvoicesResponse {
	results: DeliveryInvoice[];
	count: number;
}

const fetchDeliveryInvoices = async (params: Params) => {
	const response = await axios.get<DeliveryInvoicesResponse>('/delivery-invoices/', {
		params: {
			branch_machine_id: params.branchMachineId,
			time_range: params.timeRange,
		},
	});
	return response.data;
};

export const useDeliveryInvoices = ({ params = {} }: Query) =>
	useQuery(
		['useDeliveryInvoices', params.branchMachineId, params.timeRange],
		() => fetchDeliveryInvoices(params),
		{ keepPreviousData: true },
	);

export default useDeliveryInvoices;
