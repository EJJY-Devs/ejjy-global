import { Account } from './Account';
import { BranchMachine } from './BranchMachine';
import { BranchProduct } from './BranchProduct';
import { DiscountOption } from './DiscountOption';
import { User } from './User';
import { BackOrder } from './BackOrder';
export interface Client {
    id: number;
    name?: string;
    address?: string;
    tin?: string;
}
export interface Invoice {
    datetime_created: string;
    id: number;
    or_number: string;
    location?: string;
    proprietor?: string;
    tin?: string;
    permit_number?: string;
    software_developer?: string;
    software_developer_tin?: string;
    pos_accreditation_number?: string;
    pos_accreditation_date?: string;
    vat_exempt: string;
    vat_sales: string;
    vat_12_percent: number;
    generated_by: {
        first_name: string;
        last_name: string;
    };
    vat_exempt_discount: string;
    vat_sales_discount: string;
    total_transactions: number;
    vat_amount: number;
}
export type PaymentType = 'cash' | 'credit_pay';
export interface Payment {
    amount_tendered: string;
    mode: PaymentType;
    credit_payment_authorizer: User;
    creditor_account_id: string;
    creditor_account: Account;
}
export type Teller = Pick<User, 'id' | 'first_name' | 'last_name' | 'employee_id'>;
export interface TransactionProduct {
    id: number;
    datetime_created: string;
    price_per_piece: string;
    discount_per_piece: string;
    quantity: string;
    original_quantity?: string;
    branch_product: BranchProduct;
    amount: number;
}
interface VoidedTransaction {
    id: number;
    invoice: Invoice;
}
export interface AdjustmentRemark {
    previous_voided_transaction: VoidedTransaction;
    new_updated_transaction: VoidedTransaction;
    back_order: BackOrder;
    discount_option: DiscountOption;
}
export type TransactionStatus = 'new' | 'hold' | 'void_cancelled' | 'void_edited' | 'fully_paid';
export interface Transaction {
    id: number;
    datetime_created: string;
    overall_discount: string;
    status: TransactionStatus;
    client: Client;
    reverse: string;
    gross_amount: number;
    total_amount: number;
    total_paid_amount: number;
    is_fully_paid: boolean;
    is_before_reporting_period: boolean;
    teller: Teller;
    void_authorizer: Teller;
    discount_authorizer: Teller;
    products: TransactionProduct[];
    invoice: Invoice;
    previous_voided_transaction_id: number;
    new_updated_transaction_id: number;
    payment: Payment;
    discount_option: DiscountOption;
    discount_option_additional_fields_values?: string;
    branch_machine: BranchMachine;
    adjustment_remarks: AdjustmentRemark;
    has_lacking_balance_log: boolean;
    customer_account: Account;
    invoice_type: string;
}
export {};
