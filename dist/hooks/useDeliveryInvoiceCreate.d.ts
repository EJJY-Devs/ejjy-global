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
export declare const useDeliveryInvoiceCreate: () => {
    mutateAsync: import("react-query").UseMutateAsyncFunction<any, unknown, CreateDeliveryInvoicePayload, unknown>;
    isLoading: boolean;
    error: unknown;
};
export default useDeliveryInvoiceCreate;
