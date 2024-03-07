"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createZReadTxt = void 0;
const utils_1 = require("../../utils");
const helper_receipt_1 = require("../helper-receipt");
const helper_txt_1 = require("../helper-txt");
const createZReadTxt = (report, siteSettings, user, returnContent = false) => {
    var _a, _b, _c;
    const reportTextFile = new utils_1.ReportTextFile();
    let rowNumber = 0;
    rowNumber = (0, helper_txt_1.writeHeader)(reportTextFile, siteSettings, report.branch_machine, rowNumber);
    rowNumber += 1;
    if (report.total_transactions === 0) {
        rowNumber += 1;
        reportTextFile.write({
            text: 'NO TRANSACTION',
            alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
            rowNumber,
        });
        rowNumber += 1;
        rowNumber += 1;
    }
    reportTextFile.write({
        text: 'Z-READ',
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    rowNumber += 1;
    reportTextFile.write({
        text: 'INVOICE NUMBER',
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `   Beg Invoice #: ${((_a = report.beginning_or) === null || _a === void 0 ? void 0 : _a.or_number) || helper_receipt_1.EMPTY_CELL}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `   End Invoice #: ${((_b = report.ending_or) === null || _b === void 0 ? void 0 : _b.or_number) || helper_receipt_1.EMPTY_CELL}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: 'SALES',
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `   Beg: ${(0, utils_1.formatInPeso)(report.beginning_sales, helper_receipt_1.PESO_SIGN)}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `   Cur: ${(0, utils_1.formatInPeso)(report.current_sales, helper_receipt_1.PESO_SIGN)}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `   End: ${(0, utils_1.formatInPeso)(report.ending_sales, helper_receipt_1.PESO_SIGN)}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: 'TRANSACTION COUNT',
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
        text: 'ACCUMULATED SALES BREAKDOWN',
        alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
        rowNumber,
    });
    rowNumber += 1;
    rowNumber += 1;
    reportTextFile.write({
        text: 'CASH SALES',
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.cash_sales, helper_receipt_1.PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: 'CREDIT SALES',
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.credit_pay, helper_receipt_1.PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    if (Number(report.credit_pay) > 0) {
        reportTextFile.write({
            text: helper_receipt_1.UNDERLINE_TEXT,
            alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
            rowNumber,
        });
        rowNumber += 1;
    }
    reportTextFile.write({
        text: 'GROSS SALES',
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.gross_sales, helper_receipt_1.PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    rowNumber += 1;
    reportTextFile.write({
        text: 'VAT Exempt',
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.vat_exempt, helper_receipt_1.PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: 'VAT Sales',
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.vat_sales, helper_receipt_1.PESO_SIGN)} `,
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
        text: `${(0, utils_1.formatInPeso)(report.vat_amount, helper_receipt_1.PESO_SIGN)} `,
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
        text: `${(0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: '----------------',
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: 'GROSS SALES',
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.gross_sales, helper_receipt_1.PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: '   REG. DISCOUNT',
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `(${(0, utils_1.formatInPeso)(report.regular_discount, helper_receipt_1.PESO_SIGN)})`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: '   Special',
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `(${(0, utils_1.formatInPeso)(report.special_discount, helper_receipt_1.PESO_SIGN)})`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: '   VOIDED SALES',
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `(${(0, utils_1.formatInPeso)(report.void, helper_receipt_1.PESO_SIGN)})`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: '   VAT AMOUNT (12%)',
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `(${(0, utils_1.formatInPeso)(report.total_vat_adjusted, helper_receipt_1.PESO_SIGN)})`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    if (Number(report.vat_amount) > 0) {
        reportTextFile.write({
            text: helper_receipt_1.UNDERLINE_TEXT,
            alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
            rowNumber,
        });
        rowNumber += 1;
    }
    reportTextFile.write({
        text: 'ACCUM. GRAND TOTAL',
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.net_sales, helper_receipt_1.PESO_SIGN)}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: '----------------',
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: 'ADJUSTMENT ON VAT:',
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: '   Special',
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.vat_special_discount, helper_receipt_1.PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: '   OTHERS',
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.others, helper_receipt_1.PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    if (Number(report.others) > 0) {
        reportTextFile.write({
            text: helper_receipt_1.UNDERLINE_TEXT,
            alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
            rowNumber,
        });
        rowNumber += 1;
    }
    reportTextFile.write({
        text: '   TOTAL',
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.total_vat_adjusted, helper_receipt_1.PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: '----------------',
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: 'VAT AMOUNT (12%)',
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.vat_amount, helper_receipt_1.PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: 'VAT ADJ.',
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `(${(0, utils_1.formatInPeso)(report.total_vat_adjusted, helper_receipt_1.PESO_SIGN)})`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    if (Number(report.total_vat_adjusted) > 0) {
        reportTextFile.write({
            text: helper_receipt_1.UNDERLINE_TEXT,
            alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
            rowNumber,
        });
        rowNumber += 1;
    }
    reportTextFile.write({
        text: 'VAT PAYABLE',
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(report.vat_payable, helper_receipt_1.PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    rowNumber += 1;
    reportTextFile.write({
        text: `GDT: ${report.generation_datetime
            ? (0, utils_1.formatDateTime)(report.generation_datetime)
            : helper_receipt_1.EMPTY_CELL}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `PDT: ${report.printing_datetime
            ? (0, utils_1.formatDateTime)(report.printing_datetime)
            : helper_receipt_1.EMPTY_CELL}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `C: ${((_c = report === null || report === void 0 ? void 0 : report.generated_by) === null || _c === void 0 ? void 0 : _c.employee_id) || helper_receipt_1.EMPTY_CELL}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `PB: ${(user === null || user === void 0 ? void 0 : user.employee_id) || helper_receipt_1.EMPTY_CELL}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    rowNumber += 1;
    (0, helper_txt_1.writeFooter)(reportTextFile, siteSettings, rowNumber);
    if (returnContent) {
        return reportTextFile.get();
    }
    reportTextFile.export(`ZReadReport_${report.id}.txt`);
    return null;
};
exports.createZReadTxt = createZReadTxt;
