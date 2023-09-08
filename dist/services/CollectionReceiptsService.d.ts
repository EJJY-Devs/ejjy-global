import { CollectionReceipt } from '../types';
export interface Create {
    amount: string;
    bank_branch?: string;
    bank_name?: string;
    branch_machine_id: number;
    check_date?: string;
    check_number?: string;
    created_by_id: number;
    order_of_payment_id: number;
}
declare const service: {
    create: (body: Create) => Promise<import("axios").AxiosResponse<CollectionReceipt>>;
};
export default service;
