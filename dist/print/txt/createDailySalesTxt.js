"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDailySalesTxt = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utils_1 = require("../../utils");
const helper_receipt_1 = require("../helper-receipt");
const helper_txt_1 = require("../helper-txt");
const createDailySalesTxt = (dailySales, siteSettings, branchMachine, user) => {
    var _a;
    const reportTextFile = new utils_1.ReportTextFile();
    let rowNumber = 0;
    rowNumber = (0, helper_txt_1.writeHeader)(reportTextFile, siteSettings, branchMachine, rowNumber);
    rowNumber += 1;
    reportTextFile.write({
        text: 'DAILY SALES',
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
        text: 'CASH SALES',
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(dailySales.cash_sales, helper_receipt_1.PESO_SIGN)} `,
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
        text: `${(0, utils_1.formatInPeso)(dailySales.credit_pay, helper_receipt_1.PESO_SIGN)} `,
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
        text: `${(0, utils_1.formatInPeso)(dailySales.gross_sales, helper_receipt_1.PESO_SIGN)} `,
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
        text: `${(0, utils_1.formatInPeso)(dailySales.vat_exempt, helper_receipt_1.PESO_SIGN)} `,
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
        text: `${(0, utils_1.formatInPeso)(dailySales.vat_sales, helper_receipt_1.PESO_SIGN)} `,
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
        text: `${(0, utils_1.formatInPeso)(dailySales.vat_amount, helper_receipt_1.PESO_SIGN)} `,
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
        text: `${(0, utils_1.formatInPeso)(dailySales.gross_sales, helper_receipt_1.PESO_SIGN)} `,
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
        text: `(${(0, utils_1.formatInPeso)(dailySales.regular_discount, helper_receipt_1.PESO_SIGN)})`,
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
        text: `(${(0, utils_1.formatInPeso)(dailySales.special_discount, helper_receipt_1.PESO_SIGN)})`,
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
        text: `(${(0, utils_1.formatInPeso)(dailySales.void, helper_receipt_1.PESO_SIGN)})`,
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
        text: `(${(0, utils_1.formatInPeso)(dailySales.total_vat_adjusted, helper_receipt_1.PESO_SIGN)})`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: 'NET SALES',
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `(${(0, utils_1.formatInPeso)(dailySales.net_sales, helper_receipt_1.PESO_SIGN)})`,
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
        text: `${(0, utils_1.formatInPeso)(dailySales.vat_special_discount, helper_receipt_1.PESO_SIGN)} `,
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
        text: `${(0, utils_1.formatInPeso)(dailySales.others, helper_receipt_1.PESO_SIGN)} `,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: '   TOTAL',
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(dailySales.total_vat_adjusted, helper_receipt_1.PESO_SIGN)} `,
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
        text: `${(0, utils_1.formatInPeso)(dailySales.vat_amount, helper_receipt_1.PESO_SIGN)} `,
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
        text: `(${(0, utils_1.formatInPeso)(dailySales.total_vat_adjusted, helper_receipt_1.PESO_SIGN)})`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: 'VAT PAYABLE',
        alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
        rowNumber,
    });
    reportTextFile.write({
        text: `${(0, utils_1.formatInPeso)(dailySales.vat_payable, helper_receipt_1.PESO_SIGN)} `,
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
        text: `C: ${((_a = dailySales === null || dailySales === void 0 ? void 0 : dailySales.generated_by) === null || _a === void 0 ? void 0 : _a.employee_id) || helper_receipt_1.EMPTY_CELL}`,
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
    reportTextFile.export(`DailySales_${dailySales.id}.txt`);
    return null;
};
exports.createDailySalesTxt = createDailySalesTxt;
