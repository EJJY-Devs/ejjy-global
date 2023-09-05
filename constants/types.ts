export const appVersions = {
  V1: 1,
  V2: 2,
};

export const request = {
  NONE: 0,
  REQUESTING: 1,
  SUCCESS: 2,
  ERROR: 3,
};

export const productNavigations = {
  RESET: "reset",
  NEXT: "next",
  PREV: "prev",
};

export const printerStatuses = {
  OK: "OK",
  PRINTING: "PRINTING",
  NOT_AVAILABLE: "NOT_AVAILABLE",
};

export const userTypes = {
  ADMIN: "admin",
  OFFICE_MANAGER: "office_manager",
  BRANCH_MANAGER: "branch_manager",
  BRANCH_PERSONNEL: "branch_personnel",
};

export const cashBreakdownTypes = {
  START_SESSION: "start_session",
  MID_SESSION: "mid_session",
  END_SESSION: "end_session",
};

export const cashBreakdownCategories = {
  CASH_BREAKDOWN: "cash_breakdown",
  CASH_IN: "cash_in",
  CASH_OUT: "cash_out",
};

export const branchProductStatuses = {
  AVAILABLE: "available",
  REORDER: "reorder",
  OUT_OF_STOCK: "out_of_stock",
};

export const navigationTypes = {
  PREVIOUS: -1,
  NEXT: 1,
};

export const transactionStatuses = {
  FULLY_PAID: "fully_paid",
  QUEUE: "hold",
  VOID_EDITED: "void_edited",
  VOID_CANCELLED: "void_cancelled",
};

export const reportTypes = {
  DAILY_SALES: "DAILY_SALES",
  XREAD: "XREAD",
  ZREAD: "ZREAD",
};

export const vatTypes = {
  VATABLE: "V",
  VAT_EMPTY: "VE",
};

export const unitOfMeasurementTypes = {
  WEIGHING: "weighing",
  NON_WEIGHING: "non_weighing",
};

export const machineInputTypes = {
  KEYBOARD: "KEYBOARD",
  TOUCH_SCREEN: "TOUCH_SCREEN",
};

export const weighingInputTypes = {
  MANUAL: "MANUAL",
  BUILT_IN_SCALE: "BUILT_IN_SCALE",
};

export const logTypes = {
  AUTHENTICATION: "authentication",
  LOGIN: "login",
  TRANSACTION: "transaction",
};

export const timeRangeTypes = {
  DAILY: "daily",
  MONTHLY: "monthly",
  DATE_RANGE: "date_range",
};

export const connectivityTypes = {
  ONLINE_TO_OFFLINE: "online_to_offline",
  OFFLINE_TO_ONLINE: "offline_to_online",
};

export const saleTypes = {
  CASH: "cash",
  CREDIT: "credit_pay",
};

export const paymentTypes = {
  CASH: "cash",
  CHEQUE: "cheque",
};

export const orderOfPaymentPurposes = {
  PARTIAL_PAYMENT: "partial_payment",
  FULL_PAYMENT: "full_payment",
  OTHERS: "others",
};

export const discountTypes = {
  AMOUNT: "amount",
  PERCENTAGE: "percentage",
};

export const backOrderTypes = {
  DAMAGED: "damaged",
  FOR_RETURN: "for_return",
};

export const markdownTypes = {
  REGULAR: "regular",
  WHOLESALE: "discount_1",
  SPECIAL: "discount_2",
  CUSTOM: "custom",
};

export const priceCodes = {
  W: null,
  X: "Added product has a markdown applied.", // Wholesale
  Y: "Added product has a markdown applied.", // Special
  Z: "Added product is using a custom price.", // Custom
};

export const productEntryTypes = {
  SEARCHED: "searched",
  SCANNED: "scanned",
};

export const taxTypes = {
  VAT: "VAT",
  NVAT: "NVAT",
};

export const attendanceCategories = {
  ATTENDANCE: "attendance",
  TRACKER: "tracker",
};

export const pdfButtonsKey = {
  DOWNLOAD: "download",
  PREVIEW: "preview",
};
