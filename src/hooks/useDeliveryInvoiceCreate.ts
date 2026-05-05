import axios from 'axios';
import { useMutation } from 'react-query';

interface DeliveryInvoiceProduct {
	product_id: number;
	quantity: number;
	price_per_piece: number;
	amount: number;
}

interface CreateDeliveryInvoicePayload {
	teller_id: number;
	authorizer_id: number;
	creditor_account_id: number;
	branch_machine_id: number;
	products: DeliveryInvoiceProduct[];
}

const createDeliveryInvoice = async (payload: CreateDeliveryInvoicePayload) => {
	const response = await axios.post('/delivery-invoices/', payload);
	return response.data;
};

export const useDeliveryInvoiceCreate = () => {
	const { mutateAsync, isLoading, error } = useMutation(createDeliveryInvoice);
	return { mutateAsync, isLoading, error };
};

export default useDeliveryInvoiceCreate;
