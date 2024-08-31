"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceTypes = exports.inputTypes = exports.accountTypes = exports.taxTypes = exports.backOrdersStatuses = exports.returnItemSlipsStatuses = exports.userPendingApprovalTypes = exports.productCategoryTypes = exports.pendingTransactionTypes = exports.productCheckingTypes = exports.deliveryReceiptStatus = exports.OSDRStatus = exports.deliveryReceiptProductStatus = exports.backOrderStatus = exports.preparationSlipStatus = exports.orderSlipStatus = exports.quantityTypes = exports.productStatus = exports.requisitionSlipActions = exports.requisitionSlipProductStatus = exports.requisitionSlipTypes = exports.productTypes = exports.appTypes = exports.pdfButtonsKey = exports.productEntryTypes = exports.priceCodes = exports.markdownTypes = exports.backOrderTypes = exports.discountTypes = exports.orderOfPaymentPurposes = exports.paymentTypes = exports.saleTypes = exports.connectivityTypes = exports.timeRangeTypes = exports.logTypes = exports.weighingInputTypes = exports.machineInputTypes = exports.unitOfMeasurementTypes = exports.vatTypes = exports.reportTypes = exports.transactionStatuses = exports.navigationTypes = exports.branchProductStatuses = exports.cashBreakdownCategories = exports.cashBreakdownTypes = exports.userTypes = exports.printerStatuses = exports.productNavigations = exports.request = exports.appVersions = void 0;
exports.specialDiscountCodes = exports.reportCategories = exports.authorizationStatuses = exports.readReportTypes = exports.closingTypes = exports.branchMachineTypes = exports.userLogTypes = exports.attendanceScheduleTypes = exports.attendanceSchedulePeriods = exports.attendanceTypes = exports.attendanceCategories = exports.requisitionSlipDetailsType = void 0;
exports.appVersions = {
    V1: 1,
    V2: 2,
};
exports.request = {
    NONE: 0,
    REQUESTING: 1,
    SUCCESS: 2,
    ERROR: 3,
};
exports.productNavigations = {
    RESET: 'reset',
    NEXT: 'next',
    PREV: 'prev',
};
exports.printerStatuses = {
    OK: 'OK',
    PRINTING: 'PRINTING',
    NOT_AVAILABLE: 'NOT_AVAILABLE',
};
exports.userTypes = {
    ADMIN: 'admin',
    OFFICE_MANAGER: 'office_manager',
    BRANCH_MANAGER: 'branch_manager',
    BRANCH_PERSONNEL: 'branch_personnel',
};
exports.cashBreakdownTypes = {
    START_SESSION: 'start_session',
    MID_SESSION: 'mid_session',
    END_SESSION: 'end_session',
};
exports.cashBreakdownCategories = {
    CASH_BREAKDOWN: 'cash_breakdown',
    CASH_IN: 'cash_in',
    CASH_OUT: 'cash_out',
};
exports.branchProductStatuses = {
    AVAILABLE: 'available',
    REORDER: 'reorder',
    OUT_OF_STOCK: 'out_of_stock',
};
exports.navigationTypes = {
    PREVIOUS: -1,
    NEXT: 1,
};
exports.transactionStatuses = {
    NEW: 'new',
    FULLY_PAID: 'fully_paid',
    QUEUE: 'hold',
    VOID_EDITED: 'void_edited',
    VOID_CANCELLED: 'void_cancelled',
};
exports.reportTypes = {
    DAILY_SALES: 'DAILY_SALES',
    XREAD: 'XREAD',
    ZREAD: 'ZREAD',
};
exports.vatTypes = {
    VATABLE: 'V',
    VAT_EMPTY: 'VE',
};
exports.unitOfMeasurementTypes = {
    WEIGHING: 'weighing',
    NON_WEIGHING: 'non_weighing',
};
exports.machineInputTypes = {
    KEYBOARD: 'KEYBOARD',
    TOUCH_SCREEN: 'TOUCH_SCREEN',
};
exports.weighingInputTypes = {
    MANUAL: 'MANUAL',
    BUILT_IN_SCALE: 'BUILT_IN_SCALE',
};
exports.logTypes = {
    AUTHENTICATION: 'authentication',
    LOGIN: 'login',
    TRANSACTION: 'transaction',
};
exports.timeRangeTypes = {
    DAILY: 'daily',
    MONTHLY: 'monthly',
    DATE_RANGE: 'date_range',
};
exports.connectivityTypes = {
    ONLINE_TO_OFFLINE: 'online_to_offline',
    OFFLINE_TO_ONLINE: 'offline_to_online',
};
exports.saleTypes = {
    CASH: 'cash',
    CREDIT: 'credit_pay',
};
exports.invoiceTypes = {
    SALES_INVOICE: 'sales_invoice',
    CHARGE_INVOICE: 'charge_invoice'
}
exports.paymentTypes = {
    CASH: 'cash',
    CHECK: 'check',
    CREDIT: 'credit_pay',
    OTHERS: 'others',
};
exports.orderOfPaymentPurposes = {
    PARTIAL_PAYMENT: 'partial_payment',
    FULL_PAYMENT: 'full_payment',
    OTHERS: 'others',
};
exports.discountTypes = {
    AMOUNT: 'amount',
    PERCENTAGE: 'percentage',
};
exports.backOrderTypes = {
    DAMAGED: 'damaged',
    FOR_RETURN: 'for_return',
};
exports.markdownTypes = {
    REGULAR: 'regular',
    WHOLESALE: 'discount_1',
    SPECIAL: 'discount_2',
    CUSTOM: 'custom',
};
exports.priceCodes = {
    W: null,
    X: 'Added product has a markdown applied.',
    Y: 'Added product has a markdown applied.',
    Z: 'Added product is using a custom price.', // Custom
};
exports.productEntryTypes = {
    SEARCHED: 'searched',
    SCANNED: 'scanned',
};
exports.pdfButtonsKey = {
    DOWNLOAD: 'download',
    PREVIEW: 'preview',
};
exports.appTypes = {
    BACK_OFFICE: 'back_office',
    HEAD_OFFICE: 'head_office',
};
exports.productTypes = {
    DRY: 'dry',
    WET: 'wet',
};
exports.requisitionSlipTypes = {
    MANUAL: 'manual',
    AUTOMATIC: 'automatic',
};
exports.requisitionSlipProductStatus = {
    ADDED_TO_OS: 'added_to_os',
    NOT_ADDED_TO_OS: 'not_added_to_os',
};
exports.requisitionSlipActions = {
    NEW: 'new',
    SEEN: 'seen',
    F_OS1_CREATING: 'f_os1_creating',
    F_OS1_CREATED: 'f_os1_created',
    F_OS1_PREPARING: 'f_os1_preparing',
    F_OS1_PREPARED: 'f_os1_prepared',
    F_DS1_CREATING: 'f_ds1_creating',
    F_DS1_CREATED: 'f_ds1_created',
    F_DS1_DELIVERING: 'f_ds1_delivering',
    F_DS1_DELIVERED_DONE: 'f_ds1_delivered_done',
    F_DS1_DELIVERED_ERROR: 'f_ds1_delivered_error',
    OUT_OF_STOCK: 'out_of_stock',
};
exports.productStatus = {
    AVAILABLE: 'available',
    REORDER: 'reorder',
    OUT_OF_STOCK: 'out_of_stock',
};
exports.quantityTypes = {
    BULK: 'bulk',
    PIECE: 'piece',
};
exports.orderSlipStatus = {
    RECEIVED: 'received',
    DELIVERED: 'delivered',
    PREPARING: 'preparing',
    PREPARED: 'prepared',
};
exports.preparationSlipStatus = {
    NEW: 'new',
    PREPARING: 'preparing',
    PARTIALLY_COMPLETED: 'partially_completed',
    COMPLETED: 'completed',
    ERROR: 'error',
};
exports.backOrderStatus = {
    NEW: 'new',
    PREPARING: 'preparing',
    PARTIALLY_COMPLETED: 'partially_completed',
    COMPLETED: 'completed',
    ERROR: 'error',
};
exports.deliveryReceiptProductStatus = {
    RESOLVED: 'resolved',
    INVESTIGATION: 'investigation',
};
exports.OSDRStatus = {
    DONE: 'done',
    ERROR: 'error',
};
exports.deliveryReceiptStatus = {
    INVESTIGATION: 'investigation',
    RESOLVED: 'resolved',
    DONE: 'done',
};
exports.productCheckingTypes = {
    DAILY: 'daily',
    RANDOM: 'random',
};
exports.pendingTransactionTypes = {
    PRODUCTS: 'products',
    USERS: 'users',
};
exports.productCategoryTypes = {
    ASSORTED: 'assorted',
    BABOY: 'baboy',
    MANOK: 'manok',
    GULAY: 'gulay',
    HOTDOG: 'hotdog',
    NONE: 'none',
};
exports.userPendingApprovalTypes = {
    CREATE: 'create',
    UPDATE_USER_TYPE: 'update_user_type',
    DELETE: 'delete',
};
exports.returnItemSlipsStatuses = {
    DONE: 'done',
    PENDING: 'pending',
    ERROR: 'error',
};
exports.backOrdersStatuses = {
    DONE: 'done',
    PENDING: 'pending',
    ERROR: 'error',
};
exports.taxTypes = {
    VAT: 'VAT',
    NVAT: 'NVAT',
};
exports.accountTypes = {
    PERSONAL: 'regular',
    CORPORATE: 'corporate',
    EMPLOYEE: 'employee',
    GOVERNMENT: 'government',
};
exports.inputTypes = {
    TEXT: 'text',
    TEXTAREA: 'textarea',
    NUMBER: 'number',
    MONEY: 'money',
};
exports.serviceTypes = {
    NORMAL: 'normal',
    ONLINE: 'online',
    OFFLINE: 'offline',
};
exports.requisitionSlipDetailsType = {
    SINGLE_VIEW: 'single_view',
    CREATE_EDIT: 'create_edit',
};
exports.attendanceCategories = {
    ATTENDANCE: 'attendance',
    TRACKER: 'tracker',
};
exports.attendanceTypes = {
    IN: 'in',
    OUT: 'out',
};
exports.attendanceSchedulePeriods = {
    MORNING: 'morning',
    AFTERNOON: 'afternoon',
};
exports.attendanceScheduleTypes = {
    CLOCK_IN: 'clock_in',
    CLOCK_OUT: 'clock_out',
};
exports.userLogTypes = {
    LOGIN: 'login',
    AUTHENTICATION: 'authentication',
    TRANSACTION: 'transaction',
    SESSIONS: 'sessions',
    ASSIGNMENTS: 'assignments',
    PRODUCTS: 'products',
    BRANCH_PRODUCTS: 'branch_products',
};
exports.branchMachineTypes = {
    SCALE: 'scale',
    CASHIERING: 'cashiering',
    SCALE_AND_CASHIERING: 'scale_and_cashiering',
};
exports.closingTypes = {
    ALL: 'all',
    AUTOMATIC: 'automatic',
    MANUAL: 'manual',
};
exports.readReportTypes = {
    XREAD: 'xread',
    ZREAD: 'zread',
};
exports.authorizationStatuses = {
    UNOPENED: 'unopened',
    OPENED: 'opened',
    CLOSED: 'ended',
};
exports.reportCategories = {
    EJournals: 'e-journals',
    DailyAccumulatedReports: 'DAR',
};
exports.specialDiscountCodes = {
    SENIOR_CITIZEN: 'SC',
    PERSONS_WITH_DISABILITY: 'PWD',
    NATIONAL_ATHLETES_AND_COACHES: 'NAAC',
    SOLO_PARENTS: 'SP',
};
