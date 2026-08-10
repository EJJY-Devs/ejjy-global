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
    // Inline underline for the fill-in values in the body sentence. Kept as an
    // INLINE span (not inline-block) with a bottom border so the underline tracks
    // the text baseline. jsPDF's html2canvas mis-positions bottom borders on
    // inline-block elements whose line-height differs from the surrounding line —
    // that was drawing the underlines *through* the values in the generated PDF.
    const fillIn = {
        borderBottom: '1px solid black',
        padding: '0 10px',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
    };
    // The meta row and signature line are laid out with <table>, not flexbox:
    // tables + cell borders are the primitive html2canvas renders reliably, so
    // the OP No / Date underlines and the signature rule land in the right place
    // in the PDF and print output (flex alignment + borders did not).
    const metaLabelCell = {
        whiteSpace: 'nowrap',
        fontWeight: 'bold',
        paddingRight: 10,
        width: 1,
    };
    const metaValueCell = {
        borderBottom: '1px solid black',
        textAlign: 'center',
        fontWeight: 'bold',
    };
    // Layout-critical styling is expressed inline (not via Tailwind utility
    // classes) so the three render paths look identical: the on-screen modal and
    // the jsPDF path both sit in the live app DOM where Tailwind is loaded, but
    // the QZ HTML print path renders the standalone markup with only the width
    // rule appendHtmlElement injects — no Tailwind. Inline styles apply in all
    // three. `font-mono text-sm` stays on the root purely as a harmless hint for
    // the modal; the print/PDF container already sets a monospace font.
    return (react_1.default.createElement("div", { className: "font-mono text-sm", style: { boxSizing: 'border-box', padding: '16px 32px', lineHeight: 1.5 } },
        react_1.default.createElement("div", { style: { textAlign: 'center' } },
            storeName ? (react_1.default.createElement("div", { style: {
                    whiteSpace: 'pre-line',
                    letterSpacing: 1,
                    fontSize: '1.125em',
                    fontWeight: 'bold',
                } }, storeName)) : null,
            branchName ? (react_1.default.createElement("div", { style: { fontWeight: 'bold' } }, branchName)) : null),
        react_1.default.createElement("div", { style: {
                textAlign: 'center',
                fontSize: '1.35em',
                fontWeight: 'bold',
                letterSpacing: 3,
                margin: '18px 0 22px',
            } }, "ORDER OF PAYMENT"),
        react_1.default.createElement("table", { style: { width: '100%', marginBottom: 22 } },
            react_1.default.createElement("tbody", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", { style: metaLabelCell }, "OP No:"),
                    react_1.default.createElement("td", { style: metaValueCell }, opNo),
                    react_1.default.createElement("td", { style: { width: 48 } }),
                    react_1.default.createElement("td", { style: metaLabelCell }, "Date:"),
                    react_1.default.createElement("td", { style: metaValueCell }, date)))),
        react_1.default.createElement("div", { style: { marginBottom: 18 } },
            react_1.default.createElement("div", { style: { fontWeight: 'bold' } }, "The Cashier"),
            react_1.default.createElement("div", null, "Cashiering Unit")),
        react_1.default.createElement("div", { style: { textAlign: 'left', lineHeight: 2, textIndent: 40 } },
            "Please issue Collection Receipt in favor of",
            ' ',
            react_1.default.createElement("span", { style: fillIn }, payor),
            " from",
            ' ',
            react_1.default.createElement("span", { style: fillIn }, address),
            " in the amount of",
            ' ',
            react_1.default.createElement("span", { style: fillIn }, amount),
            " for payment of",
            ' ',
            react_1.default.createElement("span", { style: fillIn }, purposeDescription),
            " per Charge Invoice No.",
            ' ',
            react_1.default.createElement("span", { style: fillIn }, invoiceId),
            " dated",
            ' ',
            react_1.default.createElement("span", { style: fillIn }, invoiceDate),
            "."),
        react_1.default.createElement("table", { style: { width: '100%', marginTop: 44 } },
            react_1.default.createElement("tbody", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", { style: { width: '55%' } }),
                    react_1.default.createElement("td", { style: {
                            width: '45%',
                            borderTop: '1px solid black',
                            textAlign: 'center',
                            paddingTop: 6,
                        } }, "Manager/Authorized Official"))))));
};
exports.OrderOfPaymentContent = OrderOfPaymentContent;
