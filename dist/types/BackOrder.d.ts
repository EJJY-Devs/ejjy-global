import { Product } from "./Product";
import { Transaction } from "./Transaction";
type User = {
    id: number;
    user_type: "admin" | "office_manager" | "branch_manager" | "branch_personnel";
    first_name?: string;
    last_name?: string;
    employee_id: string;
};
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
    sender: User;
    receiver: User;
    products: BackOrderProduct[];
    status: string;
    overall_remarks?: string;
    type: "for_return" | "damaged";
    transaction: Transaction;
    supplier_name?: string;
    supplier_address?: string;
    supplier_tin?: string;
    encoded_by: User;
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
    type: "for_return" | "damaged";
    supplier_name?: string;
    supplier_address?: string;
    supplier_tin?: string;
    encoded_by_id: number;
}
export {};
