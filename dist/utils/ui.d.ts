import { DefaultOptionType } from 'antd/lib/select';
import { AttendanceLogCategory, AttendanceLogType, CashBreakdownCategory, CashBreakdownType, CashieringTransactionProduct, PaymentType, Product, UserType } from '../types';
export declare const getSubtotal: (products: CashieringTransactionProduct[]) => number;
export declare const getFullName: (user: any) => string;
export declare const getKeyDownCombination: (keyboardEvent: KeyboardEvent) => string;
export declare const getUserTypeDescription: (userType: UserType) => "" | "Admin" | "Branch Manager" | "Branch Personnel" | "Office Manager";
export declare const getCashBreakdownTypeDescription: (category: CashBreakdownCategory, type: CashBreakdownType) => string;
export declare const getAttendanceLogDescription: (category: AttendanceLogCategory, type: AttendanceLogType) => string;
export declare const getModeOfPaymentDescription: (modeOfPayment: PaymentType) => string | undefined;
export declare const filterOption: (input: string, option?: DefaultOptionType | undefined) => boolean;
interface Authorization {
    title?: string;
    onSuccess: () => void;
}
export declare const authorization: ({ title, onSuccess, }: Authorization) => void;
export declare const showErrorMessages: (errors: string | string[]) => void;
export declare const isUserFromBranch: (userType: UserType) => boolean;
export declare const isDualType: (product: Product) => string | undefined;
export {};
