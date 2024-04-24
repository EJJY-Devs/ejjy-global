"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionContent = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const react_1 = __importStar(require("react"));
const globals_1 = require("../../../globals");
const helper_receipt_1 = require("../../../print/helper-receipt");
const utils_1 = require("../../../utils");
const Printing_1 = require("../../Printing");
const TransactionContent = ({ transaction, siteSettings, isReprint, }) => {
    var _a, _b, _c, _d, _e, _f, _g;
    const [fields, setFields] = (0, react_1.useState)([]);
    const [title, setTitle] = (0, react_1.useState)('Invoice');
    (0, react_1.useEffect)(() => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        // Set title
        if (transaction.payment.mode === globals_1.saleTypes.CASH) {
            setTitle('CASH SALES INVOICE');
        }
        else if (transaction.payment.mode === globals_1.saleTypes.CREDIT) {
            setTitle('CHARGE SALES INVOICE');
        }
        // Set client fields
        let newFields = [];
        if ((_a = transaction === null || transaction === void 0 ? void 0 : transaction.discount_option_additional_fields_values) === null || _a === void 0 ? void 0 : _a.length) {
            const discountOptionFields = JSON.parse(transaction.discount_option_additional_fields_values);
            newFields = Object.keys(discountOptionFields).map((key) => ({
                key,
                value: discountOptionFields[key],
            }));
        }
        else if (((_b = transaction === null || transaction === void 0 ? void 0 : transaction.client) === null || _b === void 0 ? void 0 : _b.name) ||
            ((_c = transaction === null || transaction === void 0 ? void 0 : transaction.payment) === null || _c === void 0 ? void 0 : _c.creditor_account)) {
            newFields = [
                {
                    key: 'NAME',
                    value: ((_d = transaction.client) === null || _d === void 0 ? void 0 : _d.name) ||
                        (0, utils_1.getFullName)((_e = transaction.payment) === null || _e === void 0 ? void 0 : _e.creditor_account) ||
                        globals_1.EMPTY_CELL,
                },
                {
                    key: 'TIN',
                    value: ((_f = transaction.client) === null || _f === void 0 ? void 0 : _f.tin) ||
                        ((_h = (_g = transaction.payment) === null || _g === void 0 ? void 0 : _g.creditor_account) === null || _h === void 0 ? void 0 : _h.tin) ||
                        globals_1.EMPTY_CELL,
                },
                {
                    key: 'ADDRESS',
                    value: ((_j = transaction.client) === null || _j === void 0 ? void 0 : _j.address) ||
                        ((_l = (_k = transaction.payment) === null || _k === void 0 ? void 0 : _k.creditor_account) === null || _l === void 0 ? void 0 : _l.home_address) ||
                        globals_1.EMPTY_CELL,
                },
            ];
        }
        setFields(newFields);
    }, [transaction]);
    const change = Number(transaction.payment.amount_tendered) - transaction.total_amount;
    const previousTransactionOrNumber = (_c = (_b = (_a = transaction === null || transaction === void 0 ? void 0 : transaction.adjustment_remarks) === null || _a === void 0 ? void 0 : _a.previous_voided_transaction) === null || _b === void 0 ? void 0 : _b.invoice) === null || _c === void 0 ? void 0 : _c.or_number;
    const newTransactionOrNumber = (_f = (_e = (_d = transaction === null || transaction === void 0 ? void 0 : transaction.adjustment_remarks) === null || _d === void 0 ? void 0 : _d.new_updated_transaction) === null || _e === void 0 ? void 0 : _e.invoice) === null || _f === void 0 ? void 0 : _f.or_number;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Printing_1.ReceiptHeader, { branchMachine: transaction.branch_machine, siteSettings: siteSettings, title: title }),
        react_1.default.createElement("br", null),
        react_1.default.createElement("table", { style: { width: '100%' } }, transaction.products.map((item) => (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", { colSpan: 2 },
                    item.branch_product.product.print_details,
                    " -",
                    ' ',
                    item.branch_product.product.is_vat_exempted
                        ? globals_1.vatTypes.VAT_EMPTY
                        : globals_1.vatTypes.VATABLE)),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", { style: { paddingLeft: '4ch' } },
                    item.original_quantity,
                    " @",
                    ' ',
                    (0, utils_1.formatInPeso)(item.price_per_piece, helper_receipt_1.PESO_SIGN)),
                react_1.default.createElement("td", { style: { textAlign: 'right' } },
                    (0, utils_1.formatInPeso)(Number(item.quantity) * Number(item.price_per_piece), helper_receipt_1.PESO_SIGN),
                    "\u00A0")))))),
        react_1.default.createElement("div", { style: { width: '100%', textAlign: 'right' } }, "----------------"),
        react_1.default.createElement("table", { style: { width: '100%' } },
            transaction.discount_option && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, "GROSS AMOUNT"),
                    react_1.default.createElement("td", { style: { textAlign: 'right' } },
                        (0, utils_1.formatInPeso)(transaction.gross_amount, helper_receipt_1.PESO_SIGN),
                        "\u00A0")),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null,
                        "DISCOUNT | ",
                        transaction.discount_option.code),
                    react_1.default.createElement("td", { style: { textAlign: 'right' } },
                        "(",
                        (0, utils_1.formatInPeso)((0, utils_1.getComputedDiscount)(transaction), helper_receipt_1.PESO_SIGN),
                        ")")),
                transaction.discount_option.is_special_discount && (react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, "VAT AMOUNT"),
                    react_1.default.createElement("td", { style: { textAlign: 'right' } },
                        "(",
                        (0, utils_1.formatInPeso)(transaction.invoice.vat_amount, helper_receipt_1.PESO_SIGN),
                        ")"))),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", { colSpan: 2, style: { textAlign: 'right' } }, "----------------")))),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "TOTAL AMOUNT"),
                react_1.default.createElement("td", { style: { textAlign: 'right', fontWeight: 'bold' } },
                    (0, utils_1.formatInPeso)(transaction.total_amount, helper_receipt_1.PESO_SIGN),
                    "\u00A0"))),
        react_1.default.createElement("br", null),
        transaction.payment.mode === globals_1.saleTypes.CASH && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("table", { style: { width: '100%' } },
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", { style: { paddingLeft: '4ch' } }, "AMOUNT RECEIVED"),
                    react_1.default.createElement("td", { style: { textAlign: 'right' } },
                        (0, utils_1.formatInPeso)(transaction.payment.amount_tendered, helper_receipt_1.PESO_SIGN),
                        "\u00A0")),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", { style: { paddingLeft: '4ch' } }, "AMOUNT DUE"),
                    react_1.default.createElement("td", { style: { textAlign: 'right' } },
                        (0, utils_1.formatInPeso)(transaction.total_amount, helper_receipt_1.PESO_SIGN),
                        "\u00A0")),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", { style: { paddingLeft: '4ch' } }, "CHANGE"),
                    react_1.default.createElement("td", { style: { textAlign: 'right', fontWeight: 'bold' } },
                        (0, utils_1.formatInPeso)(change, helper_receipt_1.PESO_SIGN),
                        "\u00A0"))),
            react_1.default.createElement("br", null))),
        react_1.default.createElement("table", { style: { width: '100%' } },
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "VAT Exempt"),
                react_1.default.createElement("td", { style: { textAlign: 'right' } },
                    (0, utils_1.formatInPeso)(transaction.invoice.vat_exempt, helper_receipt_1.PESO_SIGN),
                    "\u00A0")),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "VATable Sales"),
                react_1.default.createElement("td", { style: { textAlign: 'right' } },
                    (0, utils_1.formatInPeso)(transaction.invoice.vat_sales, helper_receipt_1.PESO_SIGN),
                    "\u00A0")),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "VAT Amount (12%)"),
                react_1.default.createElement("td", { style: { textAlign: 'right' } },
                    (0, utils_1.formatInPeso)(transaction.invoice.vat_amount, helper_receipt_1.PESO_SIGN),
                    "\u00A0")),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "ZERO Rated"),
                react_1.default.createElement("td", { style: { textAlign: 'right' } },
                    (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                    "\u00A0"))),
        react_1.default.createElement("br", null),
        react_1.default.createElement("div", null,
            "GDT: ",
            (0, utils_1.formatDateTime)(transaction.invoice.datetime_created)),
        react_1.default.createElement("div", null,
            "PDT: ",
            (0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)),
        react_1.default.createElement("div", { style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            } },
            react_1.default.createElement("span", null, transaction.invoice.or_number),
            react_1.default.createElement("span", null,
                transaction.products.length,
                " item(s)")),
        react_1.default.createElement("div", null, ((_g = transaction === null || transaction === void 0 ? void 0 : transaction.teller) === null || _g === void 0 ? void 0 : _g.employee_id) || globals_1.EMPTY_CELL),
        react_1.default.createElement("br", null),
        previousTransactionOrNumber && (react_1.default.createElement("div", null,
            "Prev Invoice #: ",
            previousTransactionOrNumber)),
        newTransactionOrNumber && (react_1.default.createElement("div", null,
            "New Invoice #: ",
            newTransactionOrNumber)),
        react_1.default.createElement("table", { style: { width: '100%', paddingLeft: '4ch' } }, fields.map(({ key, value }) => (react_1.default.createElement("tr", null,
            react_1.default.createElement("td", { style: { width: 80 } },
                key,
                ":"),
            react_1.default.createElement("td", null, value))))),
        react_1.default.createElement("br", null),
        react_1.default.createElement(Printing_1.ReceiptFooter, { siteSettings: siteSettings }),
        react_1.default.createElement("br", null),
        react_1.default.createElement("div", { style: {
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
            } },
            react_1.default.createElement("span", null, isReprint &&
                transaction.status === globals_1.transactionStatuses.FULLY_PAID &&
                'REPRINT ONLY'),
            react_1.default.createElement("span", { style: { whiteSpace: 'pre-line' } }, !isReprint &&
                transaction.status === globals_1.transactionStatuses.FULLY_PAID &&
                globals_1.INVOICE_LAST_MESSAGE),
            react_1.default.createElement("span", null, [
                globals_1.transactionStatuses.VOID_EDITED,
                globals_1.transactionStatuses.VOID_CANCELLED,
            ].includes(transaction.status) && 'VOIDED TRANSACTION'),
            react_1.default.createElement("span", null,
                "\"", siteSettings === null || siteSettings === void 0 ? void 0 :
                siteSettings.thank_you_message,
                "\""))));
};
exports.TransactionContent = TransactionContent;
