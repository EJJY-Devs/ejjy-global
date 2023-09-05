import { BranchMachine } from 'types/BranchMachine';
import { OrderOfPayment } from 'types/OrderOfPayment';
import { User } from 'types/User';
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
}
