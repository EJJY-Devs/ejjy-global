"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createZReadTxt = exports.createDailySalesTxt = exports.createXReadTxt = exports.createSalesInvoiceTxt = void 0;
const globals_1 = require("globals");
const dayjs_1 = __importDefault(require("dayjs"));
const utils_1 = require("utils");
const PESO_SIGN = "P";
const EMPTY_CELL = "";
const UNDERLINE_TEXT = "---------";
const writeHeader = (reportTextFile, siteSettings, branchMachine, rowNumber, title) => {
    const { contact_number: contactNumber, address_of_tax_payer: location, proprietor, store_name: storeName, tax_type: taxType, tin, } = siteSettings;
    const { name, machine_identification_number: machineID, pos_terminal: posTerminal, } = branchMachine;
    if (storeName) {
        const storeNames = storeName.trim().split("\n");
        storeNames.forEach((item) => {
            reportTextFile.write({
                text: item,
                alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
                rowNumber,
            });
            rowNumber += 1;
        });
    }
    if (location) {
        const locations = location.trim().split("\n");
        locations.forEach((item) => {
            reportTextFile.write({
                text: item,
                alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
                rowNumber,
            });
            rowNumber += 1;
        });
    }
    reportTextFile.write({
        text: `${contactNumber} | ${name}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: proprietor,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `${taxType} | ${tin}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: machineID,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: posTerminal,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
        rowNumber,
    });
    rowNumber += 1;
    if (title) {
        rowNumber += 1;
        reportTextFile.write({
            text: `[${title}]`,
            alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
            rowNumber,
        });
    }
    return rowNumber;
};
const writeFooter = (reportTextFile, siteSettings, rowNumber) => {
    const { software_developer: softwareDeveloper, software_developer_address: softwareDeveloperAddress, software_developer_tin: softwareDeveloperTin, pos_accreditation_number: posAccreditationNumber, pos_accreditation_date: posAccreditationDate, ptu_number: ptuNumber, ptu_date: ptuDate, } = siteSettings;
    reportTextFile.write({
        text: softwareDeveloper,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
        rowNumber,
    });
    rowNumber += 1;
    if (softwareDeveloperAddress) {
        const locations = softwareDeveloperAddress.trim().split("\n");
        locations.forEach((name) => {
            reportTextFile.write({
                text: name,
                alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
                rowNumber,
            });
            rowNumber += 1;
        });
    }
    reportTextFile.write({
        text: softwareDeveloperTin,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `Acc No: ${posAccreditationNumber}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `Date Issued: ${posAccreditationDate}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
        rowNumber,
    });
    rowNumber += 1;
    rowNumber += 1;
    reportTextFile.write({
        text: `PTU No: ${ptuNumber}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `Date Issued: ${ptuDate}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
        rowNumber,
    });
    rowNumber += 1;
    return rowNumber;
};
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
    let title = "";
    if (transaction.payment.mode === globals_1.saleTypes.CASH) {
        title = "CASH SALES INVOICE";
    }
    else if (transaction.payment.mode === globals_1.saleTypes.CREDIT) {
        title = "CHARGE SALES INVOICE";
    }
    // Set client fields
    let fields = [];
    if (discountOptionFields && typeof discountOptionFields === "object") {
        fields = Object.keys(discountOptionFields).map((key) => ({
            key,
            value: discountOptionFields ? discountOptionFields[key] : EMPTY_CELL,
        }));
    }
    else if (((_g = transaction.client) === null || _g === void 0 ? void 0 : _g.name) ||
        ((_h = transaction.payment) === null || _h === void 0 ? void 0 : _h.creditor_account)) {
        fields = [
            {
                key: "NAME",
                value: ((_j = transaction.client) === null || _j === void 0 ? void 0 : _j.name) ||
                    (0, utils_1.getFullName)((_k = transaction.payment) === null || _k === void 0 ? void 0 : _k.creditor_account) ||
                    "",
            },
            {
                key: "TIN",
                value: ((_l = transaction.client) === null || _l === void 0 ? void 0 : _l.tin) ||
                    ((_o = (_m = transaction.payment) === null || _m === void 0 ? void 0 : _m.creditor_account) === null || _o === void 0 ? void 0 : _o.tin) ||
                    "",
            },
            {
                key: "ADDRESS",
                value: ((_p = transaction.client) === null || _p === void 0 ? void 0 : _p.address) ||
                    ((_r = (_q = transaction.payment) === null || _q === void 0 ? void 0 : _q.creditor_account) === null || _r === void 0 ? void 0 : _r.home_address) ||
                    "",
            },
        ];
    }
    const reportTextFile = new utils_1.ReportTextFile();
    let rowNumber = 0;
    rowNumber = writeHeader(reportTextFile, siteSettings, branchMachine, rowNumber, title);
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
            text: `    ${item.original_quantity} @ ${(0, utils_1.formatInPeso)(item.price_per_piece, PESO_SIGN)}`,
            alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
            rowNumber,
        });
        reportTextFile.write({
            text: (0, utils_1.formatInPeso)(Number(item.quantity) * Number(item.price_per_piece), PESO_SIGN),
            alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
            rowNumber,
        });
        rowNumber += 1;
    });
    reportTextFile.write({
        text: "----------------",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    if (transaction.discount_option) {
        reportTextFile.write({
            text: "GROSS AMOUNT",
            alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
            rowNumber,
        });
        reportTextFile.write({
            text: (0, utils_1.formatInPeso)(transaction.gross_amount, PESO_SIGN),
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
            text: `(${(0, utils_1.formatInPeso)((0, utils_1.getComputedDiscount)(transaction), PESO_SIGN)})`,
            alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
            rowNumber,
        });
        rowNumber += 1;
        if (transaction.discount_option.is_special_discount) {
            reportTextFile.write({
                text: "VAT AMOUNT",
                alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
                rowNumber,
            });
            reportTextFile.write({
                text: `(${(0, utils_1.formatInPeso)(transaction.invoice.vat_amount, PESO_SIGN)})`,
                alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
                rowNumber,
            });
            rowNumber += 1;
        }
        reportTextFile.write({
            text: "----------------",
            alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
            rowNumber,
        });
        rowNumber += 1;
    }
    reportTextFile.write({
        text: "TOTAL AMOUNT",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: (0, utils_1.formatInPeso)(transaction.total_amount, PESO_SIGN),
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    if (transaction.payment.mode === globals_1.saleTypes.CASH) {
        rowNumber += 1;
        reportTextFile.write({
            text: "   AMOUNT RECEIVED",
            alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
            rowNumber,
        });
        reportTextFile.write({
            text: (0, utils_1.formatInPeso)(transaction.payment.amount_tendered, PESO_SIGN),
            alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
            rowNumber,
        });
        rowNumber += 1;
        reportTextFile.write({
            text: "   AMOUNT DUE",
            alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
            rowNumber,
        });
        reportTextFile.write({
            text: (0, utils_1.formatInPeso)(transaction.total_amount, PESO_SIGN),
            alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
            rowNumber,
        });
        rowNumber += 1;
        reportTextFile.write({
            text: "   CHANGE",
            alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
            rowNumber,
        });
        reportTextFile.write({
            text: (0, utils_1.formatInPeso)(change, PESO_SIGN),
            alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
            rowNumber,
        });
        rowNumber += 1;
    }
    rowNumber += 1;
    reportTextFile.write({
        text: "VAT Exempt",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: (0, utils_1.formatInPeso)(transaction.invoice.vat_exempt, PESO_SIGN),
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "VATable Sales",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: (0, utils_1.formatInPeso)(transaction.invoice.vat_sales, PESO_SIGN),
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "VAT Amount (12%)",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: (0, utils_1.formatInPeso)(transaction.invoice.vat_amount, PESO_SIGN),
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "ZERO Rated",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: (0, utils_1.formatInPeso)(0, PESO_SIGN),
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
    rowNumber = writeFooter(reportTextFile, siteSettings, rowNumber);
    if (transaction.status === globals_1.transactionStatuses.FULLY_PAID) {
        rowNumber += 1;
        reportTextFile.write({
            text: isReprint ? "REPRINT ONLY" : siteSettings === null || siteSettings === void 0 ? void 0 : siteSettings.invoice_last_message,
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
            text: "VOIDED TRANSACTION",
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
const createXReadTxt = (report, siteSettings, user, branchMachine, returnContent = false) => {
    var _a, _b, _c;
    const reportTextFile = new utils_1.ReportTextFile();
    let rowNumber = 0;
    rowNumber = writeHeader(reportTextFile, siteSettings, branchMachine, rowNumber);
    rowNumber += 1;
    if (report.gross_sales === 0) {
        rowNumber += 1;
        reportTextFile.write({
            text: "NO TRANSACTION",
            alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
            rowNumber,
        });
        rowNumber += 1;
        rowNumber += 1;
    }
    reportTextFile.write({
        text: "X-READ",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    rowNumber += 1;
    reportTextFile.write({
        text: "INVOICE NUMBER",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `   Beg Invoice #: ${((_a = report.beginning_or) === null || _a === void 0 ? void 0 : _a.or_number) || EMPTY_CELL}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `   End Invoice #: ${((_b = report.ending_or) === null || _b === void 0 ? void 0 : _b.or_number) || EMPTY_CELL}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "SALES",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `   Beg: ${(0, utils_1.formatInPeso)(report.beginning_sales, PESO_SIGN)}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `   Cur: ${(0, utils_1.formatInPeso)(report.gross_sales, PESO_SIGN)}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `   End: ${(0, utils_1.formatInPeso)(report.ending_sales, PESO_SIGN)}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "TRANSACTION COUNT",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `   Beg: ${report.beginning_transactions_count}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `   Cur: ${report.total_transactions}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `   End: ${report.ending_transactions_count}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    rowNumber += 1;
    reportTextFile.write({
        text: "CURRENT SALES BREAKDOWN",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
        rowNumber,
    });
    rowNumber += 1;
    rowNumber += 1;
    reportTextFile.write({
        text: "CASH SALES",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.cash_sales, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "CREDIT SALES",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.credit_pay, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    if (Number(report.credit_pay) > 0) {
        reportTextFile.write({
            text: UNDERLINE_TEXT,
            alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
            rowNumber,
        });
        rowNumber += 1;
    }
    reportTextFile.write({
        text: "GROSS SALES",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.gross_sales, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    rowNumber += 1;
    reportTextFile.write({
        text: "VAT Exempt",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.vat_exempt, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "VATable Sales",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.vat_sales, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "VAT Amount (12%)",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.vat_amount, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "ZERO Rated",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(0, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "----------------",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "GROSS SALES",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.gross_sales, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "   REG. DISCOUNT",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `(${(0, utils_1.formatInPeso)(report.regular_discount, PESO_SIGN)})`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "   SC/PWD",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `(${(0, utils_1.formatInPeso)(report.special_discount, PESO_SIGN)})`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "   VOIDED SALES",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `(${(0, utils_1.formatInPeso)(report.void, PESO_SIGN)})`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "   VAT AMOUNT (12%)",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `(${(0, utils_1.formatInPeso)(report.total_vat_adjusted, PESO_SIGN)})`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    if (Number(report.vat_amount) > 0) {
        reportTextFile.write({
            text: UNDERLINE_TEXT,
            alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
            rowNumber,
        });
        rowNumber += 1;
    }
    reportTextFile.write({
        text: "NET SALES",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `(${(0, utils_1.formatInPeso)(report.net_sales, PESO_SIGN)})`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "----------------",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "ADJUSTMENT ON VAT:",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "   SC/PWD",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.vat_special_discount, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "   OTHERS",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.others, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    if (Number(report.others) > 0) {
        reportTextFile.write({
            text: UNDERLINE_TEXT,
            alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
            rowNumber,
        });
        rowNumber += 1;
    }
    reportTextFile.write({
        text: "   TOTAL",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.total_vat_adjusted, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "----------------",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "VAT AMOUNT (12%)",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.vat_amount, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "VAT ADJ.",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `(${(0, utils_1.formatInPeso)(report.total_vat_adjusted, PESO_SIGN)})`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    if (Number(report.total_vat_adjusted) > 0) {
        reportTextFile.write({
            text: UNDERLINE_TEXT,
            alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
            rowNumber,
        });
        rowNumber += 1;
    }
    reportTextFile.write({
        text: "VAT PAYABLE",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.vat_payable, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    rowNumber += 1;
    reportTextFile.write({
        text: `GDT: ${report.generation_datetime
            ? (0, utils_1.formatDateTime)(report.generation_datetime)
            : EMPTY_CELL}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `PDT: ${report.printing_datetime
            ? (0, utils_1.formatDateTime)(report.printing_datetime)
            : EMPTY_CELL}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `C: ${((_c = report === null || report === void 0 ? void 0 : report.generated_by) === null || _c === void 0 ? void 0 : _c.employee_id) || EMPTY_CELL}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `PB: ${(user === null || user === void 0 ? void 0 : user.employee_id) || EMPTY_CELL}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    rowNumber += 1;
    writeFooter(reportTextFile, siteSettings, rowNumber);
    if (returnContent) {
        return reportTextFile.get();
    }
    reportTextFile.export(`XReadReport_${report.id}.txt`);
    return null;
};
exports.createXReadTxt = createXReadTxt;
const createDailySalesTxt = (dailySales, siteSettings, user, branchMachine) => {
    var _a;
    const reportTextFile = new utils_1.ReportTextFile();
    let rowNumber = 0;
    rowNumber = writeHeader(reportTextFile, siteSettings, branchMachine, rowNumber);
    rowNumber += 1;
    reportTextFile.write({
        text: "DAILY SALES",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `For ${(0, utils_1.formatDate)(dailySales.daily_sales_data.date)}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    rowNumber += 1;
    reportTextFile.write({
        text: "CASH SALES",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(dailySales.cash_sales, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "CREDIT SALES",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(dailySales.credit_pay, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "GROSS SALES",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(dailySales.gross_sales, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    rowNumber += 1;
    reportTextFile.write({
        text: "VAT Exempt",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(dailySales.vat_exempt, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "VATable Sales",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(dailySales.vat_sales, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "VAT Amount (12%)",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(dailySales.vat_amount, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "ZERO Rated",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(0, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "----------------",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "GROSS SALES",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(dailySales.gross_sales, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "   REG. DISCOUNT",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `(${(0, utils_1.formatInPeso)(dailySales.regular_discount, PESO_SIGN)})`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "   SC/PWD",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `(${(0, utils_1.formatInPeso)(dailySales.special_discount, PESO_SIGN)})`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "   VOIDED SALES",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `(${(0, utils_1.formatInPeso)(dailySales.void, PESO_SIGN)})`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "   VAT AMOUNT (12%)",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `(${(0, utils_1.formatInPeso)(dailySales.total_vat_adjusted, PESO_SIGN)})`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "NET SALES",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `(${(0, utils_1.formatInPeso)(dailySales.net_sales, PESO_SIGN)})`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "----------------",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "ADJUSTMENT ON VAT:",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "   SC/PWD",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(dailySales.vat_special_discount, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "   OTHERS",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(dailySales.others, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "   TOTAL",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(dailySales.total_vat_adjusted, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "----------------",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "VAT AMOUNT (12%)",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(dailySales.vat_amount, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "VAT ADJ.",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `(${(0, utils_1.formatInPeso)(dailySales.total_vat_adjusted, PESO_SIGN)})`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "VAT PAYABLE",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(dailySales.vat_payable, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    rowNumber += 1;
    reportTextFile.write({
        text: `GDT: ${(0, utils_1.formatDateTime)(dailySales.daily_sales_data.date)}`,
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
        text: `C: ${((_a = dailySales === null || dailySales === void 0 ? void 0 : dailySales.generated_by) === null || _a === void 0 ? void 0 : _a.employee_id) || EMPTY_CELL}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `PB: ${(user === null || user === void 0 ? void 0 : user.employee_id) || EMPTY_CELL}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    rowNumber += 1;
    writeFooter(reportTextFile, siteSettings, rowNumber);
    reportTextFile.export(`DailySales_${dailySales.id}.txt`);
    return null;
};
exports.createDailySalesTxt = createDailySalesTxt;
const createZReadTxt = (report, siteSettings, user, branchMachine, returnContent = false) => {
    var _a, _b, _c;
    const reportTextFile = new utils_1.ReportTextFile();
    let rowNumber = 0;
    rowNumber = writeHeader(reportTextFile, siteSettings, branchMachine, rowNumber);
    rowNumber += 1;
    if (report.total_transactions === 0) {
        rowNumber += 1;
        reportTextFile.write({
            text: "NO TRANSACTION",
            alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
            rowNumber,
        });
        rowNumber += 1;
        rowNumber += 1;
    }
    reportTextFile.write({
        text: "Z-READ",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    rowNumber += 1;
    reportTextFile.write({
        text: "INVOICE NUMBER",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `   Beg Invoice #: ${((_a = report.beginning_or) === null || _a === void 0 ? void 0 : _a.or_number) || EMPTY_CELL}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `   End Invoice #: ${((_b = report.ending_or) === null || _b === void 0 ? void 0 : _b.or_number) || EMPTY_CELL}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "SALES",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `   Beg: ${(0, utils_1.formatInPeso)(report.beginning_sales, PESO_SIGN)}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `   Cur: ${(0, utils_1.formatInPeso)(report.current_sales, PESO_SIGN)}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `   End: ${(0, utils_1.formatInPeso)(report.ending_sales, PESO_SIGN)}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "TRANSACTION COUNT",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `   Beg: ${report.beginning_transactions_count}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `   Cur: ${report.total_transactions}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `   End: ${report.ending_transactions_count}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    rowNumber += 1;
    reportTextFile.write({
        text: "ACCUMULATED SALES BREAKDOWN",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
        rowNumber,
    });
    rowNumber += 1;
    rowNumber += 1;
    reportTextFile.write({
        text: "CASH SALES",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.cash_sales, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "CREDIT SALES",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.credit_pay, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    if (Number(report.credit_pay) > 0) {
        reportTextFile.write({
            text: UNDERLINE_TEXT,
            alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
            rowNumber,
        });
        rowNumber += 1;
    }
    reportTextFile.write({
        text: "GROSS SALES",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.gross_sales, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    rowNumber += 1;
    reportTextFile.write({
        text: "VAT Exempt",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.vat_exempt, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "VAT Sales",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.vat_sales, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "VAT Amount (12%)",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.vat_amount, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "ZERO Rated",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(0, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "----------------",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "GROSS SALES",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.gross_sales, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "   REG. DISCOUNT",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `(${(0, utils_1.formatInPeso)(report.regular_discount, PESO_SIGN)})`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "   SC/PWD",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `(${(0, utils_1.formatInPeso)(report.special_discount, PESO_SIGN)})`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "   VOIDED SALES",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `(${(0, utils_1.formatInPeso)(report.void, PESO_SIGN)})`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "   VAT AMOUNT (12%)",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `(${(0, utils_1.formatInPeso)(report.total_vat_adjusted, PESO_SIGN)})`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    if (Number(report.vat_amount) > 0) {
        reportTextFile.write({
            text: UNDERLINE_TEXT,
            alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
            rowNumber,
        });
        rowNumber += 1;
    }
    reportTextFile.write({
        text: "ACCUM. GRAND TOTAL",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.net_sales, PESO_SIGN)}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "----------------",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "ADJUSTMENT ON VAT:",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "   SC/PWD",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.vat_special_discount, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "   OTHERS",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.others, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    if (Number(report.others) > 0) {
        reportTextFile.write({
            text: UNDERLINE_TEXT,
            alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
            rowNumber,
        });
        rowNumber += 1;
    }
    reportTextFile.write({
        text: "   TOTAL",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.total_vat_adjusted, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "----------------",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "VAT AMOUNT (12%)",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.vat_amount, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: "VAT ADJ.",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `(${(0, utils_1.formatInPeso)(report.total_vat_adjusted, PESO_SIGN)})`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    if (Number(report.total_vat_adjusted) > 0) {
        reportTextFile.write({
            text: UNDERLINE_TEXT,
            alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
            rowNumber,
        });
        rowNumber += 1;
    }
    reportTextFile.write({
        text: "VAT PAYABLE",
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.vat_payable, PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    rowNumber += 1;
    reportTextFile.write({
        text: `GDT: ${report.generation_datetime
            ? (0, utils_1.formatDateTime)(report.generation_datetime)
            : EMPTY_CELL}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `PDT: ${report.printing_datetime
            ? (0, utils_1.formatDateTime)(report.printing_datetime)
            : EMPTY_CELL}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `C: ${((_c = report === null || report === void 0 ? void 0 : report.generated_by) === null || _c === void 0 ? void 0 : _c.employee_id) || EMPTY_CELL}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `PB: ${(user === null || user === void 0 ? void 0 : user.employee_id) || EMPTY_CELL}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    rowNumber += 1;
    writeFooter(reportTextFile, siteSettings, rowNumber);
    if (returnContent) {
        return reportTextFile.get();
    }
    reportTextFile.export(`ZReadReport_${report.id}.txt`);
    return null;
};
exports.createZReadTxt = createZReadTxt;
