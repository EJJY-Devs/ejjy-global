"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSalesInvoiceTxt = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const TransactionContent_1 = require("../../components/modals/ViewTransactionModal/TransactionContent");
const globals_1 = require("../../globals");
const utils_1 = require("../../utils");
const helper_receipt_1 = require("../helper-receipt");
const helper_txt_1 = require("../helper-txt");
const createSalesInvoiceTxt = (transaction, siteSettings, isReprint = false, returnContent = false) => {
    var _a;
    const { title, fields, change, previousTransactionOrNumber, newTransactionOrNumber, } = (0, TransactionContent_1.getTransactionData)(transaction);
    const reportTextFile = new utils_1.ReportTextFile();
    const rowData = (0, helper_txt_1.getTxtHeader)({
        branchMachine: transaction.branch_machine,
        siteSettings,
        title,
    });
    transaction.products.forEach((item) => {
        rowData.push(...[
            {
                left: `${item.branch_product.product.print_details} - ${item.branch_product.product.is_vat_exempted
                    ? globals_1.vatTypes.VAT_EMPTY
                    : globals_1.vatTypes.VATABLE}`,
            },
            {
                left: `    ${item.original_quantity} @ ${(0, utils_1.formatInPeso)(item.price_per_piece, helper_receipt_1.PESO_SIGN)}`,
                right: (0, utils_1.formatInPeso)(Number(item.quantity) * Number(item.price_per_piece), helper_receipt_1.PESO_SIGN),
            },
        ]);
    });
    rowData.push({
        right: '----------------',
    });
    if (transaction.discount_option) {
        rowData.push(...(0, helper_txt_1.getTxtItemBlock)([
            {
                label: 'GROSS AMOUNT',
                value: (0, utils_1.formatInPeso)(transaction.gross_amount, helper_receipt_1.PESO_SIGN) + helper_txt_1.TXT_NBSP,
            },
            {
                label: `DISCOUNT | ${transaction.discount_option.code}`,
                value: `(${(0, utils_1.formatInPeso)((0, utils_1.getComputedDiscount)(transaction), helper_receipt_1.PESO_SIGN)})`,
            },
        ]));
        if (transaction.discount_option.is_special_discount) {
            rowData.push(...[
                ...(0, helper_txt_1.getTxtItemBlock)([
                    {
                        label: 'VAT AMOUNT',
                        value: `(${(0, utils_1.formatInPeso)(transaction.invoice.vat_amount, helper_receipt_1.PESO_SIGN)})`,
                    },
                ]),
            ], { right: helper_receipt_1.UNDERLINE_TEXT });
        }
    }
    rowData.push(...(0, helper_txt_1.getTxtItemBlock)([
        {
            label: 'TOTAL AMOUNT',
            value: (0, utils_1.formatInPeso)(transaction.total_amount, helper_receipt_1.PESO_SIGN) + helper_txt_1.TXT_NBSP,
        },
    ]));
    if (transaction.payment.mode === globals_1.saleTypes.CASH) {
        rowData.push(...[
            helper_txt_1.TXT_LINE_BREAK,
            ...(0, helper_txt_1.getTxtItemBlock)([
                {
                    label: '    AMOUNT RECEIVED',
                    value: (0, utils_1.formatInPeso)(transaction.payment.amount_tendered, helper_receipt_1.PESO_SIGN) +
                        helper_txt_1.TXT_NBSP,
                },
                {
                    label: '    AMOUNT DUE',
                    value: (0, utils_1.formatInPeso)(transaction.total_amount, helper_receipt_1.PESO_SIGN) + helper_txt_1.TXT_NBSP,
                },
                {
                    label: '    CHANGE',
                    value: (0, utils_1.formatInPeso)(change, helper_receipt_1.PESO_SIGN) + helper_txt_1.TXT_NBSP,
                },
            ]),
        ]);
    }
    rowData.push(...[
        helper_txt_1.TXT_LINE_BREAK,
        ...(0, helper_txt_1.getTxtItemBlock)([
            {
                label: 'VAT Exempt',
                value: (0, utils_1.formatInPeso)(transaction.invoice.vat_exempt, helper_receipt_1.PESO_SIGN) + helper_txt_1.TXT_NBSP,
            },
            {
                label: 'VATable Sales',
                value: (0, utils_1.formatInPeso)(transaction.invoice.vat_sales, helper_receipt_1.PESO_SIGN) + helper_txt_1.TXT_NBSP,
            },
            {
                label: 'VAT Amount (12%)',
                value: (0, utils_1.formatInPeso)(transaction.invoice.vat_amount, helper_receipt_1.PESO_SIGN) + helper_txt_1.TXT_NBSP,
            },
            {
                label: 'ZERO Rated',
                value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN) + helper_txt_1.TXT_NBSP,
            },
        ]),
    ]);
    rowData.push(...[
        { left: `GDT: ${(0, utils_1.formatDateTime)(transaction.invoice.datetime_created)}` },
        { left: `PDT: ${(0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)}` },
        {
            left: transaction.invoice.or_number,
            right: `${transaction.products.length} item(s)`,
        },
        { left: ((_a = transaction === null || transaction === void 0 ? void 0 : transaction.teller) === null || _a === void 0 ? void 0 : _a.employee_id) || helper_receipt_1.EMPTY_CELL },
    ]);
    if (previousTransactionOrNumber) {
        rowData.push({ left: `Prev Invoice #: ${previousTransactionOrNumber}` });
    }
    if (newTransactionOrNumber) {
        rowData.push({ left: `New Invoice #: ${newTransactionOrNumber}` });
    }
    fields.forEach(({ key, value }) => {
        rowData.push({
            left: `${key}: ${value}`,
        });
    });
    rowData.push(...[helper_txt_1.TXT_LINE_BREAK, ...(0, helper_txt_1.getTxtFooter)(siteSettings)]);
    if (isReprint && transaction.status === globals_1.transactionStatuses.FULLY_PAID) {
        rowData.push({
            center: isReprint ? 'REPRINT ONLY' : globals_1.INVOICE_LAST_MESSAGE,
        });
    }
    if ([
        globals_1.transactionStatuses.VOID_EDITED,
        globals_1.transactionStatuses.VOID_CANCELLED,
    ].includes(transaction.status)) {
        rowData.push({ center: 'VOIDED TRANSACTION' });
    }
    rowData.push({
        center: siteSettings === null || siteSettings === void 0 ? void 0 : siteSettings.thank_you_message,
    });
    (0, helper_txt_1.writeFile)(rowData, reportTextFile);
    if (returnContent) {
        return reportTextFile.get();
    }
    reportTextFile.export(`Sales_Invoice_${transaction.invoice.or_number}.txt`);
    return null;
};
exports.createSalesInvoiceTxt = createSalesInvoiceTxt;
