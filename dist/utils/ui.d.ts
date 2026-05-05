import { DefaultOptionType } from 'antd/lib/select';
import { SpecialDiscountCode } from '../globals';
import { AttendanceLogCategory, AttendanceLogType, CashBreakdownCategory, CashBreakdownType, CashieringTransactionProduct, PaymentType, Product, RequisitionSlip, VatType, UserType } from '../types';
export declare const getSubtotal: (products: CashieringTransactionProduct[]) => number;
export declare const getFullName: (user: any) => string;
export declare const getKeyDownCombination: (keyboardEvent: KeyboardEvent) => string;
export declare const getUserTypeDescription: (userType: UserType) => "" | "Admin" | "Branch Manager" | "Branch Personnel" | "Office Manager";
export declare const getCashBreakdownTypeDescription: (category: CashBreakdownCategory, type: CashBreakdownType) => string;
export declare const getAttendanceLogDescription: (category: AttendanceLogCategory, type: AttendanceLogType) => string;
export declare const getModeOfPaymentDescription: (modeOfPayment: PaymentType) => string;
export declare const getInvoiceType: (invoiceType: string) => string;
export declare const getTaxTypeDescription: (taxType?: VatType) => string;
export declare const getTransactionStatusDescription: (status: string) => "-" | "New" | "Fully Paid" | "Hold" | "Void Cancelled" | "Edited" | "Cancelled";
export declare const getRequestor: (requisitionSlip: RequisitionSlip) => string;
export declare const getProductCode: (product: Product) => string;
export declare const getOrderSlipStatusBranchManagerText: (status: string, percentage?: number, osdrStatus?: string) => string;
export declare const filterOption: (input: string, option?: DefaultOptionType | undefined) => boolean;
type AuthorizationProps = {
    title?: string;
    description?: string;
    userTypes?: string[];
    onSuccess: () => void;
};
export declare const authorization: ({ title, description, userTypes, onSuccess, }: AuthorizationProps) => void;
export declare const showErrorMessages: (errors: string | string[]) => void;
export type NaacFields = {
    coach: string;
    id: string;
};
export type SPFields = {
    name: string;
    id: string;
    childName: string;
    childBirthdate: string;
    childAge: string;
};
export type PWDFields = {
    name: string;
    id: string;
    tin: string;
};
export type SCFields = {
    name: string;
    id: string;
    tin: string;
};
export declare const getDiscountFields: (discountCode: SpecialDiscountCode, fieldsJSON: string) => NaacFields | SPFields | PWDFields | undefined;
export declare const isUserFromBranch: (userType: UserType) => boolean;
export declare const isDualType: (product: Product) => string | undefined;
export {};
