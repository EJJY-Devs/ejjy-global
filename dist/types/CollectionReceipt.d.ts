import { BranchMachine } from './BranchMachine';
import { OrderOfPayment } from './OrderOfPayment';
import { User } from './User';
export interface CollectionReceipt {
    id: number;
    datetime_created: string;
    created_by: User;
    order_of_payment: OrderOfPayment;
    amount: string;
    bank_name?: string;
    bank_branch?: string;
    check_number?: string;
    check_date?: string;
    branch_machine: BranchMachine;
    mode: string;
    reference_number: string;
}
