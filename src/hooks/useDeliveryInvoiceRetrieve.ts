import axios from 'axios';
import { useQuery } from 'react-query';
import { DeliveryInvoice } from '../types';
import { UseRetrieveQuery } from './inteface';
import { ServiceOptions } from './inteface';

interface UseDeliveryInvoiceRetrieveQuery<T>
	extends Omit<UseRetrieveQuery<T>, 'id'> {
	id: number | string;
	serviceOptions?: ServiceOptions;
}

export const useDeliveryInvoiceRetrieve = (
	data: UseDeliveryInvoiceRetrieveQuery<DeliveryInvoice>,
) => {
	const { id, options, serviceOptions } = data;

	const idType = typeof id;

	return useQuery<DeliveryInvoice>(
		['useDeliveryInvoiceRetrieve', id],
		() =>
			axios
				.get<DeliveryInvoice>(`/delivery-invoices/${id}/`, {
					baseURL: serviceOptions?.baseURL,
				})
				.then((res) => res.data),
		{
			enabled: idType === 'number' || idType === 'string',
			...options,
		},
	);
};

export default useDeliveryInvoiceRetrieve;
