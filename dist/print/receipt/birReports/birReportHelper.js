"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBirSoloParentRows = exports.getBirNaacRows = exports.getBirPwdRows = exports.getBirSeniorRows = exports.getBirSalesSummaryRows = exports.BIR_REPORT_AMOUNT_KEYS = exports.BIR_REPORT_TITLES = exports.NO_TRANSACTION_REMARK = exports.formatPesoCell = exports.toAmount = exports.BirHeader = exports.getBirHeaderDetails = exports.birReportStyles = void 0;
/* eslint-disable react-refresh/only-export-components */
const dayjs_1 = __importDefault(require("dayjs"));
const react_1 = __importDefault(require("react"));
const globals_1 = require("../../../globals");
const utils_1 = require("../../../utils");
const helper_receipt_1 = require("../../helper-receipt");
const birReportStyles = (variant = 'wide') => {
    const isWide = variant === 'wide';
    return react_1.default.createElement('style', {}, [
        `
    .bir-reports-pdf {
      ${isWide ? 'max-width: 2300px;\n      min-width: 2000px;' : ''}
    }

    .bir-reports-pdf * {
      font-family: Helvetica, monospace;
      font-size: 12px;
    }

    .bir-report-header div.details,
    .bir-report-header .title {
      width: 100%;
    }

    table.bir-reports {
      border-collapse: collapse;
      ${isWide ? 'min-width: 2000px;\n      width: 100%;' : 'width: auto;\n      margin: 0 auto;'}
    }

    table.bir-reports th,
    table.bir-reports .nested-row td {
      min-width: 60px;
    }

    table.bir-reports th[colspan] {
      background-color: #ADB9CA;
    }

    table.bir-reports th,
    table.bir-reports .nested-row td {
      background-color: #BDD6EE;
    }

    table.bir-reports th,
    table.bir-reports td {
      border: 1px solid black;
      text-align: center;
      vertical-align: middle;
      padding: 6px 4px;
      box-sizing: border-box;
      overflow-wrap: break-word;
      word-break: normal;
      line-height: 1.3;
    }

    .bir-reports-pdf .title {
      text-align: center;
      font-weight: bold;
      margin-bottom:4px;
    }
  `,
    ]);
};
exports.birReportStyles = birReportStyles;
const getBirHeaderDetails = (siteSettings, user, branchMachine) => {
    var _a, _b;
    return ({
        proprietor: siteSettings.proprietor,
        address: siteSettings.address_of_tax_payer,
        tin: siteSettings.tin,
        software: `${(_a = siteSettings.app_description) !== null && _a !== void 0 ? _a : ''} ${(_b = siteSettings.product_version) !== null && _b !== void 0 ? _b : ''}`,
        serialNumber: branchMachine === null || branchMachine === void 0 ? void 0 : branchMachine.storage_serial_number,
        minNumber: branchMachine === null || branchMachine === void 0 ? void 0 : branchMachine.machine_identification_number,
        dateGenerated: (0, dayjs_1.default)(),
        userId: user.employee_id,
    });
};
exports.getBirHeaderDetails = getBirHeaderDetails;
// Inline styles here are deliberate, not decorative: this markup is dropped
// straight into the host app's live DOM for html2canvas capture (see
// renderA4SinglePagePdf), so it's exposed to whatever global CSS that app
// already has for very generic class names like "details"/"title". A cascade
// collision there previously collapsed each line down to single-word width,
// wrapping the proprietor name/address/TIN one word per line. Inline styles
// win over any external stylesheet the host page happens to define for these
// class names, so the layout stays correct regardless of what else is on the
// page.
const detailLineStyle = {
    width: '100%',
    display: 'block',
    whiteSpace: 'normal',
};
const BirHeader = ({ branchMachine, siteSettings, title, user, }) => {
    const details = (0, exports.getBirHeaderDetails)(siteSettings, user, branchMachine);
    return (react_1.default.createElement("div", { className: "bir-report-header", style: { width: '100%' } },
        react_1.default.createElement("div", { className: "details", style: detailLineStyle }, details.proprietor),
        react_1.default.createElement("div", { className: "details", style: detailLineStyle }, details.address),
        react_1.default.createElement("div", { className: "details", style: detailLineStyle }, details.tin),
        react_1.default.createElement("br", null),
        react_1.default.createElement("div", { className: "details", style: detailLineStyle }, details.software),
        react_1.default.createElement("div", { className: "details", style: detailLineStyle },
            "SN: ",
            details.serialNumber),
        react_1.default.createElement("div", { className: "details", style: detailLineStyle },
            "MIN: ",
            details.minNumber),
        react_1.default.createElement("div", { className: "details", style: detailLineStyle }, "POS Terminal No.:"),
        react_1.default.createElement("div", { className: "details", style: detailLineStyle },
            "Date Generated: ",
            (0, utils_1.formatDateTime)(details.dateGenerated, false)),
        react_1.default.createElement("div", { className: "details", style: detailLineStyle },
            "UserID: ",
            details.userId),
        react_1.default.createElement("br", null),
        react_1.default.createElement("div", { className: "title", style: Object.assign(Object.assign({}, detailLineStyle), { textAlign: 'center', fontWeight: 'bold' }) }, title)));
};
exports.BirHeader = BirHeader;
// Rows shared by the PDF and Excel builders. `null` means "leave the cell
// blank"; amounts are real numbers and each output does its own formatting.
const toAmount = (value) => {
    if (value === undefined) {
        return null;
    }
    const amount = Number(value);
    return Number.isNaN(amount) ? null : amount;
};
exports.toAmount = toAmount;
const formatPesoCell = (amount) => amount === null ? helper_receipt_1.EMPTY_CELL : (0, utils_1.formatInPeso)(amount, helper_receipt_1.PESO_SIGN);
exports.formatPesoCell = formatPesoCell;
exports.NO_TRANSACTION_REMARK = 'No transaction';
exports.BIR_REPORT_TITLES = {
    SALES_SUMMARY: 'BIR SALES SUMMARY REPORT',
    NAAC: 'National Athletes and Coaches Sales Book/Report',
    PWD: 'Persons with Disability Sales Book/Report',
    SC: 'Senior Citizen Sales Book/Report',
    SP: 'Solo Parents Sales Book/Report',
};
exports.BIR_REPORT_AMOUNT_KEYS = [
    'grand_accumulated_sales_ending_balance',
    'grand_accumulated_sales_beginning_balance',
    'sales_issue_with_manual',
    'gross_sales_for_the_day',
    'vatable_sales',
    'vat_amount',
    'vat_exempt_sales',
    'zero_rated_sales',
    'sc_discount',
    'pwd_discount',
    'naac_discount',
    'sp_discount',
    'others_discount',
    'returns',
    'void',
    'total_deductions',
    'vat_sc_discount',
    'vat_pwd_discount',
    'vat_others_discount',
    'vat_returns',
    'vat_others',
    'total_vat_adjusted',
    'vat_payable',
    'net_sales',
    'sales_overrun_or_overflow',
    'total_income',
];
const getBirSalesSummaryRows = (birReports) => birReports.map((report) => {
    var _a, _b, _c, _d;
    const hasNoTransaction = Number(report.gross_sales_for_the_day) === 0;
    const amounts = {};
    exports.BIR_REPORT_AMOUNT_KEYS.forEach((key) => {
        amounts[key] = hasNoTransaction ? null : (0, exports.toAmount)(report[key]);
    });
    return {
        date: report.date,
        beginningOrNumber: hasNoTransaction
            ? null
            : (_b = (_a = report === null || report === void 0 ? void 0 : report.beginning_or) === null || _a === void 0 ? void 0 : _a.or_number) !== null && _b !== void 0 ? _b : null,
        endingOrNumber: hasNoTransaction
            ? null
            : (_d = (_c = report === null || report === void 0 ? void 0 : report.ending_or) === null || _c === void 0 ? void 0 : _c.or_number) !== null && _d !== void 0 ? _d : null,
        amounts,
        resetCounter: hasNoTransaction ? null : report.reset_counter,
        zCounter: hasNoTransaction ? null : report.z_counter,
        remarks: hasNoTransaction ? exports.NO_TRANSACTION_REMARK : report.remarks,
    };
});
exports.getBirSalesSummaryRows = getBirSalesSummaryRows;
// The SC and PWD books share one layout; only the discount code (and so the
// additional-fields lookup) differs.
const getBirSeniorPwdRows = (transactions, discountCode) => transactions.map((transaction) => {
    const fields = (0, utils_1.getDiscountFields)(discountCode, transaction.discount_option_additional_fields_values || '');
    return {
        date: transaction.datetime_created,
        name: fields.name,
        id: fields.id,
        tin: fields.tin,
        orNumber: transaction.invoice.or_number,
        sales: (0, exports.toAmount)(transaction.total_amount),
        vatAmount: (0, exports.toAmount)(transaction.invoice.vat_amount),
        vatExempt: (0, exports.toAmount)(transaction.invoice.vat_exempt),
        deduction5Percent: 0,
        deduction20Percent: (0, exports.toAmount)(transaction.overall_discount),
        netSales: (0, exports.toAmount)(transaction.invoice.vat_sales),
    };
});
const getBirSeniorRows = (transactions) => getBirSeniorPwdRows(transactions, globals_1.specialDiscountCodes.SENIOR_CITIZEN);
exports.getBirSeniorRows = getBirSeniorRows;
const getBirPwdRows = (transactions) => getBirSeniorPwdRows(transactions, globals_1.specialDiscountCodes.PERSONS_WITH_DISABILITY);
exports.getBirPwdRows = getBirPwdRows;
const getBirNaacRows = (transactions) => transactions.map((transaction) => {
    const fields = (0, utils_1.getDiscountFields)(globals_1.specialDiscountCodes.NATIONAL_ATHLETES_AND_COACHES, transaction.discount_option_additional_fields_values || '');
    return {
        date: transaction.datetime_created,
        coach: fields.coach,
        id: fields.id,
        orNumber: transaction.invoice.or_number,
        grossSales: (0, exports.toAmount)(transaction.gross_amount),
        discount: (0, exports.toAmount)(transaction.overall_discount),
        netSales: (0, exports.toAmount)(transaction.invoice.vat_sales),
    };
});
exports.getBirNaacRows = getBirNaacRows;
const getBirSoloParentRows = (transactions) => transactions.map((transaction) => {
    const fields = (0, utils_1.getDiscountFields)(globals_1.specialDiscountCodes.SOLO_PARENTS, transaction.discount_option_additional_fields_values || '');
    return {
        date: transaction.datetime_created,
        name: fields.name,
        id: fields.id,
        childName: fields.childName,
        childBirthdate: fields.childBirthdate,
        childAge: fields.childAge,
        orNumber: transaction.invoice.or_number,
        grossSales: (0, exports.toAmount)(transaction.gross_amount),
        discount: (0, exports.toAmount)(transaction.overall_discount),
        netSales: (0, exports.toAmount)(transaction.invoice.vat_sales),
    };
});
exports.getBirSoloParentRows = getBirSoloParentRows;
