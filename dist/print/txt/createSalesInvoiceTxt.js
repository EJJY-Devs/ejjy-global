"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSalesInvoiceTxt = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const globals_1 = require("../../globals");
const utils_1 = require("../../utils");
const helper_receipt_1 = require("../helper-receipt");
const helper_txt_1 = require("../helper-txt");
const createSalesInvoiceTxt = (transaction, siteSettings, branchMachine, isReprint = false, returnContent = false) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    const change = Number(transaction.payment.amount_tendered) - transaction.total_amount;
    const previousTransactionOrNumber = (_c = (_b = (_a = transaction === null || transaction === void 0 ? void 0 : transaction.adjustment_remarks) === null || _a === void 0 ? void 0 : _a.previous_voided_transaction) === null || _b === void 0 ? void 0 : _b.invoice) === null || _c === void 0 ? void 0 : _c.or_number;
    const newTransactionOrNumber = (_f = (_e = (_d = transaction === null || transaction === void 0 ? void 0 : transaction.adjustment_remarks) === null || _d === void 0 ? void 0 : _d.new_updated_transaction) === null || _e === void 0 ? void 0 : _e.invoice) === null || _f === void 0 ? void 0 : _f.or_number;
    // Set discount option additional fields
    let discountOptionFields;
    if (transaction === null || transaction === void 0 ? void 0 : transaction.discount_option_additional_fields_values) {
        discountOptionFields = JSON.parse(transaction === null || transaction === void 0 ? void 0 : transaction.discount_option_additional_fields_values);
    }
    // Set client name
    let title = '';
    if (transaction.payment.mode === globals_1.saleTypes.CASH) {
        title = 'CASH SALES INVOICE';
    }
    else if (transaction.payment.mode === globals_1.saleTypes.CREDIT) {
        title = 'CHARGE SALES INVOICE';
    }
    // Set client fields
    let fields = [];
    if (discountOptionFields && typeof discountOptionFields === 'object') {
        fields = Object.keys(discountOptionFields).map((key) => ({
            key,
            value: discountOptionFields ? discountOptionFields[key] : helper_receipt_1.EMPTY_CELL,
        }));
    }
    else if (((_g = transaction.client) === null || _g === void 0 ? void 0 : _g.name) ||
        ((_h = transaction.payment) === null || _h === void 0 ? void 0 : _h.creditor_account)) {
        fields = [
            {
                key: 'NAME',
                value: ((_j = transaction.client) === null || _j === void 0 ? void 0 : _j.name) ||
                    (0, utils_1.getFullName)((_k = transaction.payment) === null || _k === void 0 ? void 0 : _k.creditor_account) ||
                    '',
            },
            {
                key: 'TIN',
                value: ((_l = transaction.client) === null || _l === void 0 ? void 0 : _l.tin) ||
                    ((_o = (_m = transaction.payment) === null || _m === void 0 ? void 0 : _m.creditor_account) === null || _o === void 0 ? void 0 : _o.tin) ||
                    '',
            },
            {
                key: 'ADDRESS',
                value: ((_p = transaction.client) === null || _p === void 0 ? void 0 : _p.address) ||
                    ((_r = (_q = transaction.payment) === null || _q === void 0 ? void 0 : _q.creditor_account) === null || _r === void 0 ? void 0 : _r.home_address) ||
                    '',
            },
        ];
    }
    const reportTextFile = new utils_1.ReportTextFile();
    let rowNumber = 0;
    rowNumber = (0, helper_txt_1.writeHeader)(reportTextFile, siteSettings, branchMachine, rowNumber, title);
    rowNumber += 1;
    rowNumber += 1;
    transaction.products.forEach((item) => {
        reportTextFile.write({
            text: `${item.branch_product.product.name} - ${item.branch_product.product.is_vat_exempted
                ? globals_1.vatTypes.VAT_EMPTY
                : globals_1.vatTypes.VATABLE}`,
            alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
            rowNumber,
        });
        rowNumber += 1;
        reportTextFile.write({
            text: `    ${item.original_quantity} @ ${(0, utils_1.formatInPeso)(item.price_per_piece, helper_receipt_1.PESO_SIGN)}`,
            alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
            rowNumber,
        });
        reportTextFile.write({
            text: (0, utils_1.formatInPeso)(Number(item.quantity) * Number(item.price_per_piece), helper_receipt_1.PESO_SIGN),
            alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
            rowNumber,
        });
        rowNumber += 1;
    });
    reportTextFile.write({
        text: '----------------',
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    if (transaction.discount_option) {
        reportTextFile.write({
            text: 'GROSS AMOUNT',
            alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
            rowNumber,
        });
        reportTextFile.write({
            text: (0, utils_1.formatInPeso)(transaction.gross_amount, helper_receipt_1.PESO_SIGN),
            alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
            rowNumber,
        });
        rowNumber += 1;
        reportTextFile.write({
            text: `DISCOUNT | ${transaction.discount_option.code}`,
            alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
            rowNumber,
        });
        reportTextFile.write({
            text: `(${(0, utils_1.formatInPeso)((0, utils_1.getComputedDiscount)(transaction), helper_receipt_1.PESO_SIGN)})`,
            alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
            rowNumber,
        });
        rowNumber += 1;
        if (transaction.discount_option.is_special_discount) {
            reportTextFile.write({
                text: 'VAT AMOUNT',
                alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
                rowNumber,
            });
            reportTextFile.write({
                text: `(${(0, utils_1.formatInPeso)(transaction.invoice.vat_amount, helper_receipt_1.PESO_SIGN)})`,
                alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
                rowNumber,
            });
            rowNumber += 1;
        }
        reportTextFile.write({
            text: '----------------',
            alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
            rowNumber,
        });
        rowNumber += 1;
    }
    reportTextFile.write({
        text: 'TOTAL AMOUNT',
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: (0, utils_1.formatInPeso)(transaction.total_amount, helper_receipt_1.PESO_SIGN),
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    if (transaction.payment.mode === globals_1.saleTypes.CASH) {
        rowNumber += 1;
        reportTextFile.write({
            text: '   AMOUNT RECEIVED',
            alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
            rowNumber,
        });
        reportTextFile.write({
            text: (0, utils_1.formatInPeso)(transaction.payment.amount_tendered, helper_receipt_1.PESO_SIGN),
            alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
            rowNumber,
        });
        rowNumber += 1;
        reportTextFile.write({
            text: '   AMOUNT DUE',
            alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
            rowNumber,
        });
        reportTextFile.write({
            text: (0, utils_1.formatInPeso)(transaction.total_amount, helper_receipt_1.PESO_SIGN),
            alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
            rowNumber,
        });
        rowNumber += 1;
        reportTextFile.write({
            text: '   CHANGE',
            alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
            rowNumber,
        });
        reportTextFile.write({
            text: (0, utils_1.formatInPeso)(change, helper_receipt_1.PESO_SIGN),
            alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
            rowNumber,
        });
        rowNumber += 1;
    }
    rowNumber += 1;
    reportTextFile.write({
        text: 'VAT Exempt',
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: (0, utils_1.formatInPeso)(transaction.invoice.vat_exempt, helper_receipt_1.PESO_SIGN),
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: 'VATable Sales',
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: (0, utils_1.formatInPeso)(transaction.invoice.vat_sales, helper_receipt_1.PESO_SIGN),
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: 'VAT Amount (12%)',
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: (0, utils_1.formatInPeso)(transaction.invoice.vat_amount, helper_receipt_1.PESO_SIGN),
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: 'ZERO Rated',
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    rowNumber += 1;
    rowNumber += 1;
    reportTextFile.write({
        text: `GDT: ${(0, utils_1.formatDateTime)(transaction.invoice.datetime_created)}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `PDT: ${(0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: transaction.invoice.or_number,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${transaction.products.length} item(s)`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: transaction.teller.employee_id,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    if (previousTransactionOrNumber) {
        reportTextFile.write({
            text: `Prev Invoice #: ${previousTransactionOrNumber}`,
            alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
            rowNumber,
        });
        rowNumber += 1;
    }
    if (newTransactionOrNumber) {
        reportTextFile.write({
            text: `New Invoice #: ${newTransactionOrNumber}`,
            alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
            rowNumber,
        });
        rowNumber += 1;
    }
    fields.forEach(({ key, value }) => {
        reportTextFile.write({
            text: `${key}: ${value}`,
            alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
            rowNumber,
        });
        rowNumber += 1;
    });
    rowNumber += 1;
    rowNumber = (0, helper_txt_1.writeFooter)(reportTextFile, siteSettings, rowNumber);
    if (transaction.status === globals_1.transactionStatuses.FULLY_PAID) {
        rowNumber += 1;
        reportTextFile.write({
            text: isReprint ? 'REPRINT ONLY' : siteSettings === null || siteSettings === void 0 ? void 0 : siteSettings.invoice_last_message,
            alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
            rowNumber,
        });
    }
    if ([
        globals_1.transactionStatuses.VOID_EDITED,
        globals_1.transactionStatuses.VOID_CANCELLED,
    ].includes(transaction.status)) {
        rowNumber += 2;
        reportTextFile.write({
            text: 'VOIDED TRANSACTION',
            alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
            rowNumber,
        });
    }
    rowNumber += 1;
    reportTextFile.write({
        text: siteSettings === null || siteSettings === void 0 ? void 0 : siteSettings.thank_you_message,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
        rowNumber,
    });
    if (returnContent) {
        return reportTextFile.get();
    }
    reportTextFile.export(`Sales_Invoice_${transaction.invoice.or_number}.txt`);
    return null;
};
exports.createSalesInvoiceTxt = createSalesInvoiceTxt;
