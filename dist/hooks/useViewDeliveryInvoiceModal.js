"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useViewDeliveryInvoiceModal = void 0;
const react_1 = require("react");
const useViewDeliveryInvoiceModal = () => {
    const [state, setState] = (0, react_1.useState)({
        isOpen: false,
        selectedDeliveryInvoiceId: null,
    });
    const openModal = (0, react_1.useCallback)((id) => {
        setState({
            isOpen: true,
            selectedDeliveryInvoiceId: id,
        });
    }, []);
    const closeModal = (0, react_1.useCallback)(() => {
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
exports.useViewDeliveryInvoiceModal = useViewDeliveryInvoiceModal;
exports.default = exports.useViewDeliveryInvoiceModal;
