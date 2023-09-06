import { Product } from './Product';
import { Transaction } from './Transaction';
import { User } from './User';
export type BackOrderUser = Pick<User, 'id' | 'user_type' | 'first_name' | 'last_name' | 'employee_id'>;
export interface BackOrderProduct {
    id: number;
    quantity_returned: string;
    quantity_received?: string;
    status: string;
    product: Product;
    remarks?: string;
    current_price_per_piece: string;
}
export interface BackOrder {
    id: number;
    datetime_created: string;
    datetime_sent?: string;
    datetime_received?: string;
    sender: BackOrderUser;
    receiver: BackOrderUser;
    products: BackOrderProduct[];
    status: string;
    overall_remarks?: string;
    type: 'for_return' | 'damaged';
    transaction: Transaction;
    supplier_name?: string;
    supplier_address?: string;
    supplier_tin?: string;
    encoded_by: BackOrderUser;
}
type CreateBackOrderProduct = {
    quantity_returned: string;
    product_id: number;
    price_per_piece: string;
    remarks: string;
};
export interface CreateBackOrder {
    sender_id: number;
    products: CreateBackOrderProduct[];
    transaction_id: number;
    overall_remarks: string;
    type: 'for_return' | 'damaged';
    supplier_name?: string;
    supplier_address?: string;
    supplier_tin?: string;
    encoded_by_id: number;
}
export {};
