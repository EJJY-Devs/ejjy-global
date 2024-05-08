"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printOrderOfPayment = void 0;
const react_1 = __importDefault(require("react"));
const server_1 = __importDefault(require("react-dom/server"));
const globals_1 = require("../../globals");
const utils_1 = require("../../utils");
const helper_receipt_1 = require("../helper-receipt");
const printOrderOfPayment = (orderOfPayment) => {
    var _a, _b;
    const opNo = orderOfPayment.id;
    const date = (0, utils_1.formatDate)(orderOfPayment.datetime_created);
    const payor = (0, utils_1.getFullName)(orderOfPayment.payor);
    const address = orderOfPayment.payor.home_address;
    const amount = (0, utils_1.formatInPeso)(orderOfPayment.amount, helper_receipt_1.PESO_SIGN);
    const invoiceId = ((_b = (_a = orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.charge_sales_transaction) === null || _a === void 0 ? void 0 : _a.invoice) === null || _b === void 0 ? void 0 : _b.or_number) || '&nbsp;';
    const invoiceDate = (orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.charge_sales_transaction)
        ? (0, utils_1.formatDateTime)(orderOfPayment.charge_sales_transaction.invoice.datetime_created)
        : '&nbsp;';
    let purposeDescription = orderOfPayment.extra_description;
    if (orderOfPayment.purpose === globals_1.orderOfPaymentPurposes.PARTIAL_PAYMENT) {
        purposeDescription = 'Partial Payment';
    }
    else if (orderOfPayment.purpose === globals_1.orderOfPaymentPurposes.FULL_PAYMENT) {
        purposeDescription = 'Full Payment';
    }
    const letterStyles = {
        display: 'inline-block',
        minWidth: 225,
        padding: '0 8px',
        borderBottom: '2px solid black',
        textAlign: 'center',
        fontWeight: 'bold',
    };
    const dataDom = server_1.default.renderToStaticMarkup(react_1.default.createElement("div", { className: "container", style: (0, helper_receipt_1.getPageStyleObject)({ padding: 24, width: 795 }) },
        react_1.default.createElement("div", null,
            react_1.default.createElement("b", null, "Entity Name: EJ & JY WET MARKET AND ENTERPRISES")),
        react_1.default.createElement("div", { style: { display: 'flex', justifyContent: 'space-between' } },
            react_1.default.createElement("div", null,
                react_1.default.createElement("b", null,
                    "OP No.:",
                    ' ',
                    react_1.default.createElement("span", { style: {
                            width: 200,
                            display: 'inline-block',
                            borderBottom: '2 solid black',
                            textAlign: 'center',
                        } }, opNo))),
            react_1.default.createElement("div", null,
                react_1.default.createElement("b", null,
                    "Date:",
                    ' ',
                    react_1.default.createElement("span", { style: {
                            width: 200,
                            display: 'inline-block',
                            borderBottom: '2 solid black',
                            textAlign: 'center',
                        } },
                        "$",
                        date)))),
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
            react_1.default.createElement("span", { style: Object.assign(Object.assign({}, letterStyles), { minWidth: 300 }) }, address),
            ' ',
            "in the amount of",
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
    return dataDom;
};
exports.printOrderOfPayment = printOrderOfPayment;
