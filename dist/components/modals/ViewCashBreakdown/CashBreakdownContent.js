"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashBreakdownContent = void 0;
const react_1 = __importDefault(require("react"));
const globals_1 = require("../../../globals");
const helper_receipt_1 = require("../../../print/helper-receipt");
const utils_1 = require("../../../utils");
const Printing_1 = require("../../Printing");
const PrintDetails_1 = require("../../Printing/PrintDetails");
const CashBreakdownContent = ({ cashBreakdown, siteSettings, user, }) => {
    react_1.default.createElement(Printing_1.ReceiptHeader, { branchMachine: cashBreakdown.branch_machine });
    const breakdownCoins = [
        {
            label: '0.25',
            quantity: cashBreakdown.coins_25,
            amount: (0, utils_1.formatInPeso)(0.25 * cashBreakdown.coins_25, ''),
        },
        {
            label: '1.00',
            quantity: cashBreakdown.coins_1,
            amount: (0, utils_1.formatInPeso)(cashBreakdown.coins_1, ''),
        },
        {
            label: '5.00',
            quantity: cashBreakdown.coins_5,
            amount: (0, utils_1.formatInPeso)(5 * cashBreakdown.coins_5, ''),
        },
        {
            label: '10.00',
            quantity: cashBreakdown.coins_10,
            amount: (0, utils_1.formatInPeso)(10 * cashBreakdown.coins_10, ''),
        },
        {
            label: '20.00',
            quantity: cashBreakdown.coins_20,
            amount: (0, utils_1.formatInPeso)(20 * cashBreakdown.coins_20, ''),
        },
    ];
    const denomCoins = breakdownCoins.map(({ label }) => (react_1.default.createElement("div", { style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        } },
        react_1.default.createElement("span", null, "P "),
        react_1.default.createElement("span", null, label))));
    const quantityCoins = breakdownCoins.map(({ quantity }) => (react_1.default.createElement("div", null, quantity)));
    const amountCoins = breakdownCoins.map(({ amount }) => (react_1.default.createElement("div", { style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        } },
        react_1.default.createElement("span", null, "P "),
        react_1.default.createElement("span", null, amount))));
    const breakdownBills = [
        {
            label: '20.00',
            quantity: cashBreakdown.bills_20,
            amount: (0, utils_1.formatInPeso)(20 * cashBreakdown.bills_20, ''),
        },
        {
            label: '50.00',
            quantity: cashBreakdown.bills_50,
            amount: (0, utils_1.formatInPeso)(50 * cashBreakdown.bills_50, ''),
        },
        {
            label: '100.00',
            quantity: cashBreakdown.bills_100,
            amount: (0, utils_1.formatInPeso)(100 * cashBreakdown.bills_100, ''),
        },
        {
            label: '200.00',
            quantity: cashBreakdown.bills_200,
            amount: (0, utils_1.formatInPeso)(200 * cashBreakdown.bills_200, ''),
        },
        {
            label: '500.00',
            quantity: cashBreakdown.bills_500,
            amount: (0, utils_1.formatInPeso)(500 * cashBreakdown.bills_500, ''),
        },
        {
            label: '1,000.00',
            quantity: cashBreakdown.bills_1000,
            amount: (0, utils_1.formatInPeso)(1000 * cashBreakdown.bills_1000, ''),
        },
    ];
    const denomBills = breakdownBills.map(({ label }) => (react_1.default.createElement("div", { style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        } },
        react_1.default.createElement("span", null, "P "),
        react_1.default.createElement("span", null, label))));
    const quantityBills = breakdownBills.map(({ quantity }) => (react_1.default.createElement("div", null, quantity)));
    const amountBills = breakdownBills.map(({ amount }) => (react_1.default.createElement("div", { style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        } },
        react_1.default.createElement("span", null, "P "),
        react_1.default.createElement("span", null, amount))));
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { style: {
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
            } },
            react_1.default.createElement("span", { style: { whiteSpace: 'pre-line' } }, siteSettings.store_name),
            react_1.default.createElement("span", { style: { whiteSpace: 'pre-line' } }, siteSettings.address_of_tax_payer),
            react_1.default.createElement("span", null, cashBreakdown.branch_machine.name),
            react_1.default.createElement("br", null),
            react_1.default.createElement("span", null, "[CASH BREAKDOWN]"),
            react_1.default.createElement("span", null, (0, utils_1.getCashBreakdownTypeDescription)(cashBreakdown.category, cashBreakdown.type))),
        react_1.default.createElement("br", null),
        react_1.default.createElement("div", { style: { display: 'flex' } },
            react_1.default.createElement("div", null,
                react_1.default.createElement("div", { style: { textAlign: 'center' } }, "DENOM"),
                react_1.default.createElement("br", null),
                react_1.default.createElement("div", null, "COINS"),
                denomCoins,
                react_1.default.createElement("br", null),
                react_1.default.createElement("div", null, "BILLS"),
                denomBills),
            react_1.default.createElement("div", { style: {
                    flex: 1,
                    paddingLeft: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                } },
                react_1.default.createElement("div", null, "QTY"),
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                quantityCoins,
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                quantityBills),
            react_1.default.createElement("div", null,
                react_1.default.createElement("div", { style: { textAlign: 'center' } }, "AMOUNT"),
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                amountCoins,
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                amountBills)),
        react_1.default.createElement("div", { style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
            } },
            react_1.default.createElement("span", null, "TOTAL"),
            react_1.default.createElement("span", null, (0, utils_1.formatInPeso)(cashBreakdown.total_amount, helper_receipt_1.PESO_SIGN))),
        react_1.default.createElement("br", null),
        react_1.default.createElement("div", null,
            "GDT: ",
            (0, utils_1.formatDateTime)(cashBreakdown.datetime_created)),
        react_1.default.createElement(PrintDetails_1.PrintDetails, { user: user }),
        cashBreakdown.category === globals_1.cashBreakdownCategories.CASH_IN && (react_1.default.createElement("div", null,
            "Remarks: ",
            cashBreakdown.remarks)),
        react_1.default.createElement("br", null),
        react_1.default.createElement(Printing_1.ReceiptFooter, { siteSettings: siteSettings })));
};
exports.CashBreakdownContent = CashBreakdownContent;
