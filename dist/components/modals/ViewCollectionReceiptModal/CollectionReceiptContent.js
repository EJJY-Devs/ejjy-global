"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionReceiptContent = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const react_1 = __importDefault(require("react"));
const globals_1 = require("../../../globals");
const helper_receipt_1 = require("../../../print/helper-receipt");
const utils_1 = require("../../../utils");
const Printing_1 = require("../../Printing");
const ItemBlock_1 = require("../../Printing/ItemBlock");
const CollectionReceiptContent = ({ collectionReceipt, siteSettings, }) => {
    var _a, _b, _c;
    const invoice = (_b = (_a = collectionReceipt.order_of_payment) === null || _a === void 0 ? void 0 : _a.charge_sales_transaction) === null || _b === void 0 ? void 0 : _b.invoice;
    const orderOfPayment = collectionReceipt.order_of_payment;
    const { payor, amount } = orderOfPayment;
    let description = orderOfPayment.extra_description;
    if (orderOfPayment.purpose === globals_1.orderOfPaymentPurposes.FULL_PAYMENT) {
        description = 'Full Payment';
    }
    else if (orderOfPayment.purpose === globals_1.orderOfPaymentPurposes.PARTIAL_PAYMENT) {
        description = 'Partial Payment';
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Printing_1.ReceiptHeader, { branchMachine: collectionReceipt.branch_machine }),
        react_1.default.createElement("br", null),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "[Collection Receipt]"),
        react_1.default.createElement("br", null),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "Received payment from"),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: 'Name',
                    value: (0, utils_1.getFullName)(payor),
                    contentStyle: { textAlign: 'left' },
                },
                {
                    label: 'Address',
                    value: payor.home_address || globals_1.EMPTY_CELL,
                    contentStyle: { textAlign: 'left' },
                },
                {
                    label: 'Tin',
                    value: payor.tin || globals_1.EMPTY_CELL,
                    contentStyle: { textAlign: 'left' },
                },
                {
                    label: 'the sum of',
                    value: (0, utils_1.formatInPeso)(amount, helper_receipt_1.PESO_SIGN),
                    contentStyle: { textAlign: 'left' },
                },
                {
                    label: 'Description',
                    value: description || globals_1.EMPTY_CELL,
                    contentStyle: { textAlign: 'left' },
                },
                {
                    label: 'with invoice',
                    value: (invoice === null || invoice === void 0 ? void 0 : invoice.or_number) || globals_1.EMPTY_CELL,
                    contentStyle: { textAlign: 'left' },
                },
            ] }),
        react_1.default.createElement("br", null),
        collectionReceipt.check_number && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", null, "CHECK DETAILS"),
            react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                    {
                        label: 'Bank',
                        value: collectionReceipt.bank_name || globals_1.EMPTY_CELL,
                    },
                    {
                        label: 'Branch',
                        value: collectionReceipt.bank_branch || globals_1.EMPTY_CELL,
                    },
                    {
                        label: 'Check No',
                        value: collectionReceipt.check_number || globals_1.EMPTY_CELL,
                    },
                    {
                        label: 'Check Date',
                        value: collectionReceipt.check_date
                            ? (0, utils_1.formatDate)(collectionReceipt.check_date)
                            : globals_1.EMPTY_CELL,
                    },
                ] }),
            react_1.default.createElement("br", null))),
        react_1.default.createElement("div", null,
            "GDT: ",
            (0, utils_1.formatDateTime)(collectionReceipt === null || collectionReceipt === void 0 ? void 0 : collectionReceipt.datetime_created)),
        react_1.default.createElement("div", null,
            "PDT: ",
            (0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)),
        react_1.default.createElement("div", { style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            } },
            react_1.default.createElement("span", null,
                "ID: ",
                (collectionReceipt === null || collectionReceipt === void 0 ? void 0 : collectionReceipt.id) || globals_1.EMPTY_CELL),
            react_1.default.createElement("span", { style: { textAlign: 'right' } }, (_c = collectionReceipt === null || collectionReceipt === void 0 ? void 0 : collectionReceipt.created_by) === null || _c === void 0 ? void 0 : _c.employee_id)),
        react_1.default.createElement("br", null),
        react_1.default.createElement(Printing_1.ReceiptFooter, { siteSettings: siteSettings }),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "This Document Is Not Valid For Claim Of Input Tax"),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "Thank You!")));
};
exports.CollectionReceiptContent = CollectionReceiptContent;
