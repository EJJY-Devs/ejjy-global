"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderOfPaymentContent = void 0;
const react_1 = __importDefault(require("react"));
const globals_1 = require("../../../globals");
const utils_1 = require("../../../utils");
const helper_receipt_1 = require("../../../print/helper-receipt");
const OrderOfPaymentContent = ({ orderOfPayment }) => {
    var _a, _b, _c, _d, _e;
    const opNo = orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.id;
    const date = (0, utils_1.formatDate)(orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.datetime_created);
    const payor = (0, utils_1.getFullName)(orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.payor);
    const address = (_a = orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.payor) === null || _a === void 0 ? void 0 : _a.home_address;
    const amount = (0, utils_1.formatInPeso)(orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.amount, helper_receipt_1.PESO_SIGN);
    const invoiceId = ((_c = (_b = orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.charge_sales_transaction) === null || _b === void 0 ? void 0 : _b.invoice) === null || _c === void 0 ? void 0 : _c.or_number) || '';
    const invoiceDate = (orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.charge_sales_transaction)
        ? (0, utils_1.formatDateTime)((_e = (_d = orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.charge_sales_transaction) === null || _d === void 0 ? void 0 : _d.invoice) === null || _e === void 0 ? void 0 : _e.datetime_created)
        : '';
    let purposeDescription = orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.extra_description;
    if ((orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.purpose) === globals_1.orderOfPaymentPurposes.PARTIAL_PAYMENT) {
        purposeDescription = 'Partial Payment';
    }
    else if ((orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.purpose) === globals_1.orderOfPaymentPurposes.FULL_PAYMENT) {
        purposeDescription = 'Full Payment';
    }
    const letterStyles = {
        display: 'inline-block',
        minWidth: 100,
        padding: '0 8px',
        borderBottom: '2px solid black',
        textAlign: 'center',
        fontWeight: 'bold',
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", null,
            react_1.default.createElement("b", null, "Entity Name: EJ & JY WET MARKET AND ENTERPRISES")),
        react_1.default.createElement("div", { style: {
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                columnGap: 10,
                fontWeight: 'bold',
            } },
            react_1.default.createElement("div", { style: { width: '100%', display: 'flex' } },
                react_1.default.createElement("span", { style: { flexShrink: 0 } }, "OP No:"),
                react_1.default.createElement("div", { style: {
                        flexGrow: 1,
                        borderBottom: '2px solid black',
                        textAlign: 'center',
                    } }, opNo)),
            react_1.default.createElement("div", { style: { width: '100%', display: 'flex' } },
                react_1.default.createElement("span", { style: { flexShrink: 0 } }, "Date:"),
                react_1.default.createElement("div", { style: {
                        flexGrow: 1,
                        borderBottom: '2px solid black',
                        textAlign: 'center',
                    } }, date))),
        react_1.default.createElement("br", null),
        react_1.default.createElement("br", null),
        react_1.default.createElement("div", { style: {
                fontSize: '1.5em',
                fontWeight: 'bold',
                textAlign: 'center',
            } }, "ORDER OF PAYMENT"),
        react_1.default.createElement("br", null),
        react_1.default.createElement("div", null,
            react_1.default.createElement("b", null, "The Cashier")),
        react_1.default.createElement("div", null, "Cashiering Unit"),
        react_1.default.createElement("br", null),
        react_1.default.createElement("br", null),
        react_1.default.createElement("div", { style: { textAlign: 'justify' } },
            "\u2003\u2003\u2003Please issue Collection Receipt in favor of",
            react_1.default.createElement("span", { style: letterStyles }, payor),
            " from",
            react_1.default.createElement("span", { style: letterStyles }, address),
            " in the amount of",
            react_1.default.createElement("span", { style: letterStyles }, amount),
            " for payment of",
            react_1.default.createElement("span", { style: letterStyles }, purposeDescription),
            " per Charge Invoice No.",
            react_1.default.createElement("span", { style: letterStyles }, invoiceId),
            " dated",
            react_1.default.createElement("span", { style: letterStyles }, invoiceDate),
            "."),
        react_1.default.createElement("br", null),
        react_1.default.createElement("br", null),
        react_1.default.createElement("br", null),
        react_1.default.createElement("br", null),
        react_1.default.createElement("br", null),
        react_1.default.createElement("div", { style: {
                padding: '0 12px',
                width: '60%',
                borderTop: '2px solid black',
                float: 'right',
                textAlign: 'center',
            } }, "Manager/Authorized Official")));
};
exports.OrderOfPaymentContent = OrderOfPaymentContent;
