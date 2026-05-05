import { useState, useCallback } from 'react';

interface ViewDeliveryInvoiceModalState {
	isOpen: boolean;
	selectedDeliveryInvoiceId: number | null;
}

export const useViewDeliveryInvoiceModal = () => {
	const [state, setState] = useState<ViewDeliveryInvoiceModalState>({
		isOpen: false,
		selectedDeliveryInvoiceId: null,
	});

	const openModal = useCallback((id: number) => {
		setState({
			isOpen: true,
			selectedDeliveryInvoiceId: id,
		});
	}, []);

	const closeModal = useCallback(() => {
		setState({
			isOpen: false,
			selectedDeliveryInvoiceId: null,
		});
	}, []);

	return {
		isOpen: state.isOpen,
		selectedDeliveryInvoiceId: state.selectedDeliveryInvoiceId,
		openModal,
		closeModal,
	};
};

export default useViewDeliveryInvoiceModal;
