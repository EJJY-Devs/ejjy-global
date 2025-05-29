import { Product } from './Product';
import { Transaction } from './Transaction';
import { User } from './User';
import { Branch } from './Branch';
export type DeliveryReceiptUser = Pick<User, 'id' | 'user_type' | 'first_name' | 'last_name' | 'employee_id'>;
export type DeliveryReceiptType = 'for_return' | 'damaged';
export interface DeliveryReceiptProduct {
    id: number;
    quantity_returned: string;
    quantity_received?: string;
    status: string;
    product: Product;
    remarks?: string;
    current_price_per_piece: string;
}
export interface DeliveryReceipt {
    id: number;
    datetime_created: string;
    datetime_sent?: string;
    datetime_received?: string;
    sender: DeliveryReceiptUser;
    receiver: DeliveryReceiptUser;
    products: DeliveryReceiptProduct[];
    status: string;
    overall_remarks?: string;
    type: DeliveryReceiptType;
    transaction: Transaction;
    customer_name?: string;
    customer_address?: string;
    customer_tin?: string;
    encoded_by: DeliveryReceiptUser;
    branch?: Branch;
}
type CreateDeliveryReceiptProduct = {
    quantity_returned: string;
    product_id: number;
    price_per_piece: string;
    remarks: string;
};
export interface CreateDeliveryReceipt {
    sender_id: number;
    products: CreateDeliveryReceiptProduct[];
    transaction_id: number;
    overall_remarks: string;
    type: DeliveryReceiptType;
    supplier_name?: string;
    supplier_address?: string;
    supplier_tin?: string;
    encoded_by_id: number;
}
export type ReceivingReportProduct = {
    id: number;
    cost_per_piece: number;
    quantity: number;
    product: Product;
};
export type ReceivingReport = {
    id: number;
    datetime_created: string;
    supplier_name: string;
    supplier_address: string;
    supplier_tin: string;
    encoded_by: User;
    checked_by: User;
    receiving_voucher_products: ReceivingReportProduct[];
    amount_paid: number;
    branch: Branch;
};
export {};
