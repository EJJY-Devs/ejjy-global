import { AttendanceLogCategory, AttendanceLogType, BranchMachineType, CashBreakdownCategory, CashBreakdownType, PaymentType, ProductEntryType, UnitOfMeasurement, UserPendingApprovalType } from '../types';
export declare const appVersions: {
    V1: number;
    V2: number;
};
export declare const request: {
    NONE: number;
    REQUESTING: number;
    SUCCESS: number;
    ERROR: number;
};
export declare const productNavigations: {
    RESET: string;
    NEXT: string;
    PREV: string;
};
export declare const printerStatuses: {
    OK: string;
    PRINTING: string;
    NOT_AVAILABLE: string;
};
export declare const userTypes: {
    ADMIN: string;
    OFFICE_MANAGER: string;
    BRANCH_MANAGER: string;
    BRANCH_PERSONNEL: string;
};
export declare const cashBreakdownTypes: {
    START_SESSION: CashBreakdownType;
    MID_SESSION: CashBreakdownType;
    END_SESSION: CashBreakdownType;
};
export declare const cashBreakdownCategories: {
    CASH_BREAKDOWN: CashBreakdownCategory;
    CASH_IN: CashBreakdownCategory;
    CASH_OUT: CashBreakdownCategory;
    PRINT_ONLY: CashBreakdownCategory;
};
export declare const branchProductStatuses: {
    AVAILABLE: string;
    REORDER: string;
    OUT_OF_STOCK: string;
};
export declare const navigationTypes: {
    PREVIOUS: number;
    NEXT: number;
};
export declare const transactionStatuses: {
    NEW: string;
    FULLY_PAID: string;
    QUEUE: string;
    VOID_EDITED: string;
    VOID_CANCELLED: string;
    CANCELLED: string;
};
export declare const reportTypes: {
    DAILY_SALES: string;
    XREAD: string;
    ZREAD: string;
};
export declare const vatTypes: {
    VATABLE: string;
    VAT_EMPTY: string;
};
export declare const unitOfMeasurementTypes: {
    WEIGHING: UnitOfMeasurement;
    NON_WEIGHING: UnitOfMeasurement;
};
export declare const machineInputTypes: {
    KEYBOARD: string;
    TOUCH_SCREEN: string;
};
export declare const weighingInputTypes: {
    MANUAL: string;
    BUILT_IN_SCALE: string;
};
export declare const logTypes: {
    AUTHENTICATION: string;
    LOGIN: string;
    TRANSACTION: string;
};
export declare const timeRangeTypes: {
    DAILY: string;
    MONTHLY: string;
    DATE_RANGE: string;
};
export declare const connectivityTypes: {
    ONLINE_TO_OFFLINE: string;
    OFFLINE_TO_ONLINE: string;
};
export declare const saleTypes: {
    CASH: PaymentType;
    CREDIT: PaymentType;
};
export declare const paymentTypes: {
    CASH: PaymentType;
    CHECK: PaymentType;
    CREDIT: PaymentType;
    OTHERS: PaymentType;
};
export declare const invoiceTypes: {
    SALES_INVOICE: string;
    CHARGE_INVOICE: string;
};
export declare const orderOfPaymentPurposes: {
    PARTIAL_PAYMENT: string;
    FULL_PAYMENT: string;
    OTHERS: string;
};
export declare const discountTypes: {
    AMOUNT: string;
    PERCENTAGE: string;
};
export declare const backOrderTypes: {
    DAMAGED: string;
    FOR_RETURN: string;
};
export declare const markdownTypes: {
    REGULAR: string;
    WHOLESALE: string;
    SPECIAL: string;
    CUSTOM: string;
};
export declare const priceCodes: {
    R: null;
    X: string;
    Y: string;
    Z: string;
};
export declare const productEntryTypes: {
    SEARCHED: ProductEntryType;
    SCANNED: ProductEntryType;
};
export declare const pdfButtonsKey: {
    DOWNLOAD: string;
    PREVIEW: string;
};
export declare const appTypes: {
    BACK_OFFICE: string;
    HEAD_OFFICE: string;
};
export declare const productTypes: {
    DRY: string;
    WET: string;
};
export declare const requisitionSlipTypes: {
    MANUAL: string;
    AUTOMATIC: string;
};
export declare const requisitionSlipProductStatus: {
    ADDED_TO_OS: string;
    NOT_ADDED_TO_OS: string;
};
export declare const requisitionSlipActions: {
    NEW: string;
    SEEN: string;
    F_OS1_CREATING: string;
    F_OS1_CREATED: string;
    F_OS1_PREPARING: string;
    F_OS1_PREPARED: string;
    F_DS1_CREATING: string;
    F_DS1_CREATED: string;
    F_DS1_DELIVERING: string;
    F_DS1_DELIVERED_DONE: string;
    F_DS1_DELIVERED_ERROR: string;
    OUT_OF_STOCK: string;
};
export declare const productStatus: {
    AVAILABLE: string;
    REORDER: string;
    OUT_OF_STOCK: string;
};
export declare const quantityTypes: {
    BULK: string;
    PIECE: string;
};
export declare const orderSlipStatus: {
    RECEIVED: string;
    DELIVERED: string;
    PREPARING: string;
    PREPARED: string;
};
export declare const preparationSlipStatus: {
    NEW: string;
    PREPARING: string;
    PARTIALLY_COMPLETED: string;
    COMPLETED: string;
    ERROR: string;
};
export declare const backOrderStatus: {
    NEW: string;
    PREPARING: string;
    PARTIALLY_COMPLETED: string;
    COMPLETED: string;
    ERROR: string;
};
export declare const deliveryReceiptProductStatus: {
    RESOLVED: string;
    INVESTIGATION: string;
};
export declare const OSDRStatus: {
    DONE: string;
    ERROR: string;
};
export declare const deliveryReceiptStatus: {
    INVESTIGATION: string;
    RESOLVED: string;
    DONE: string;
};
export declare const productCheckingTypes: {
    DAILY: string;
    RANDOM: string;
};
export declare const pendingTransactionTypes: {
    PRODUCTS: string;
    USERS: string;
};
export declare const productCategoryTypes: {
    ASSORTED: string;
    BABOY: string;
    MANOK: string;
    GULAY: string;
    HOTDOG: string;
    NONE: string;
};
export declare const userPendingApprovalTypes: {
    CREATE: UserPendingApprovalType;
    UPDATE_USER_TYPE: UserPendingApprovalType;
    DELETE: UserPendingApprovalType;
};
export declare const returnItemSlipsStatuses: {
    DONE: string;
    PENDING: string;
    ERROR: string;
};
export declare const backOrdersStatuses: {
    DONE: string;
    PENDING: string;
    ERROR: string;
};
export declare const taxTypes: {
    VAT: string;
    NVAT: string;
};
export declare const accountTypes: {
    PERSONAL: string;
    CORPORATE: string;
    EMPLOYEE: string;
    GOVERNMENT: string;
};
export declare const inputTypes: {
    TEXT: string;
    TEXTAREA: string;
    NUMBER: string;
    MONEY: string;
};
export declare const serviceTypes: {
    NORMAL: string;
    ONLINE: string;
    OFFLINE: string;
};
export declare const requisitionSlipDetailsType: {
    SINGLE_VIEW: string;
    CREATE_EDIT: string;
};
export declare const attendanceCategories: {
    ATTENDANCE: AttendanceLogCategory;
    TRACKER: AttendanceLogCategory;
};
export declare const attendanceTypes: {
    IN: AttendanceLogType;
    OUT: AttendanceLogType;
};
export declare const attendanceSchedulePeriods: {
    MORNING: string;
    AFTERNOON: string;
};
export declare const attendanceScheduleTypes: {
    CLOCK_IN: string;
    CLOCK_OUT: string;
};
export declare const userLogTypes: {
    LOGIN: string;
    AUTHENTICATION: string;
    TRANSACTION: string;
    SESSIONS: string;
    ASSIGNMENTS: string;
    PRODUCTS: string;
    BRANCH_PRODUCTS: string;
};
export declare const branchMachineTypes: {
    SCALE: BranchMachineType;
    CASHIERING: BranchMachineType;
    SCALE_AND_CASHIERING: BranchMachineType;
};
export declare const closingTypes: {
    ALL: string;
    AUTOMATIC: string;
    MANUAL: string;
};
export declare const readReportTypes: {
    XREAD: string;
    ZREAD: string;
};
export declare const authorizationStatuses: {
    UNOPENED: string;
    OPENED: string;
    CLOSED: string;
};
export type ReportCategory = 'e-journals' | 'DAR';
export declare const reportCategories: {
    EJournals: ReportCategory;
    DailyAccumulatedReports: ReportCategory;
};
export type SpecialDiscountCode = 'SC' | 'PWD' | 'NAAC' | 'SP';
export declare const specialDiscountCodes: {
    SENIOR_CITIZEN: SpecialDiscountCode;
    PERSONS_WITH_DISABILITY: SpecialDiscountCode;
    NATIONAL_ATHLETES_AND_COACHES: SpecialDiscountCode;
    SOLO_PARENTS: SpecialDiscountCode;
};
export declare const salesInvoiceTitles: {
    CASH: string;
    CHARGE: string;
};
export type PrintingType = 'HTML' | 'native';
export declare const printingTypes: {
    HTML: PrintingType;
    NATIVE: PrintingType;
};
