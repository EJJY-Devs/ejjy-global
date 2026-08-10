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
    var _a, _b, _c, _d, _e, _f, _g;
    const storeName = ((_a = orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.branch) === null || _a === void 0 ? void 0 : _a.store_name) || '';
    const branchName = ((_b = orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.branch) === null || _b === void 0 ? void 0 : _b.name) || '';
    const opNo = (orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.reference_number) || '';
    const date = (0, utils_1.formatDate)(orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.datetime_created);
    const payor = (0, utils_1.getFullName)(orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.payor);
    const address = (_c = orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.payor) === null || _c === void 0 ? void 0 : _c.home_address;
    const amount = (0, utils_1.formatInPeso)(orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.amount, helper_receipt_1.PESO_SIGN);
    const invoiceId = ((_e = (_d = orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.charge_sales_transaction) === null || _d === void 0 ? void 0 : _d.invoice) === null || _e === void 0 ? void 0 : _e.or_number) || '';
    const invoiceDate = (orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.charge_sales_transaction)
        ? (0, utils_1.formatDateTime)((_g = (_f = orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.charge_sales_transaction) === null || _f === void 0 ? void 0 : _f.invoice) === null || _g === void 0 ? void 0 : _g.datetime_created)
        : '';
    let purposeDescription = orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.extra_description;
    if ((orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.purpose) === globals_1.orderOfPaymentPurposes.PARTIAL_PAYMENT) {
        purposeDescription = 'Partial Payment';
    }
    else if ((orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.purpose) === globals_1.orderOfPaymentPurposes.FULL_PAYMENT) {
        purposeDescription = 'Full Payment';
    }
    // Inline fill-in blank for the dynamic fields in the body sentence. A shared
    // style keeps every underline visually consistent (same thickness, padding,
    // baseline) and evenly sized via a common minimum widath; the generous body
    // line-height below stops adjacent underlines from colliding when the
    // sentence wraps.
    const fillIn = {
        display: 'inline-block',
        minWidth: 120,
        margin: '0 6px',
        padding: '0 8px',
        borderBottom: '1px solid black',
        textAlign: 'center',
        fontWeight: 'bold',
        lineHeight: 1.2,
        verticalAlign: 'baseline',
    };
    // Underlined value in the OP No / Date meta row: grows to fill its column,
    // with left padding so the value doesn't touch its label.
    const metaValue = {
        flex: 1,
        borderBottom: '1px solid black',
        padding: '0 6px 1px',
        textAlign: 'center',
        fontWeight: 'bold',
    };
    const metaLabel = {
        flexShrink: 0,
        marginRight: 10,
        fontWeight: 'bold',
    };
    // Layout-critical styling is expressed inline (not via Tailwind utility
    // classes) so the three render paths look identical: the on-screen modal and
    // the jsPDF path both sit in the live app DOM where Tailwind is loaded, but
    // the QZ HTML print path renders the standalone markup with only the width
    // rule appendHtmlElement injects — no Tailwind. Inline styles apply in all
    // three. `font-mono text-sm` stays on the root purely as a harmless hint for
    // the modal; the print/PDF container already sets a monospace font.
    return (react_1.default.createElement("div", { className: "font-mono text-sm" },
        react_1.default.createElement("div", { className: "text-center font-bold" },
            storeName ? (react_1.default.createElement("div", { style: { whiteSpace: 'pre-line' } }, storeName)) : null,
            branchName ? react_1.default.createElement("div", null, branchName) : null),
        react_1.default.createElement("div", { style: {
                textAlign: 'center',
                fontSize: '1.35em',
                fontWeight: 'bold',
                letterSpacing: 3,
                margin: '20px 0 24px',
            } }, "ORDER OF PAYMENT"),
        react_1.default.createElement("div", { style: { display: 'flex', gap: 48, marginBottom: 24 } },
            react_1.default.createElement("div", { style: { display: 'flex', flex: 1, alignItems: 'flex-end' } },
                react_1.default.createElement("span", { style: metaLabel }, "OP No:"),
                react_1.default.createElement("span", { style: metaValue }, opNo)),
            react_1.default.createElement("div", { style: { display: 'flex', flex: 1, alignItems: 'flex-end' } },
                react_1.default.createElement("span", { style: metaLabel }, "Date:"),
                react_1.default.createElement("span", { style: metaValue }, date))),
        react_1.default.createElement("div", { style: { marginBottom: 20 } },
            react_1.default.createElement("div", { style: { fontWeight: 'bold' } }, "The Cashier"),
            react_1.default.createElement("div", null, "Cashiering Unit")),
        react_1.default.createElement("div", { style: { textAlign: 'left', lineHeight: 2.4, textIndent: 40 } },
            "Please issue Collection Receipt in favor of",
            react_1.default.createElement("span", { style: fillIn }, payor),
            " from",
            react_1.default.createElement("span", { style: fillIn }, address),
            " in the amount of",
            react_1.default.createElement("span", { style: fillIn }, amount),
            " for payment of",
            react_1.default.createElement("span", { style: fillIn }, purposeDescription),
            " per Charge Invoice No.",
            react_1.default.createElement("span", { style: fillIn }, invoiceId),
            " dated",
            react_1.default.createElement("span", { style: fillIn }, invoiceDate),
            "."),
        react_1.default.createElement("div", { style: { display: 'flex', justifyContent: 'flex-end', marginTop: 56 } },
            react_1.default.createElement("div", { style: {
                    width: '45%',
                    textAlign: 'center',
                    borderTop: '1px solid black',
                    paddingTop: 6,
                } }, "Manager/Authorized Official"))));
};
exports.OrderOfPaymentContent = OrderOfPaymentContent;
