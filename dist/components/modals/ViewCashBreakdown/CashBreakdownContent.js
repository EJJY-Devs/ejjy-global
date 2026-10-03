"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashBreakdownContent = void 0;
const react_1 = __importDefault(require("react"));
const globals_1 = require("../../../globals");
const CashInVoucherContent_1 = require("../../../print/receipt/printCashIn/CashInVoucherContent");
const CashCollectionVoucherContent_1 = require("../../../print/receipt/printCashCollection/CashCollectionVoucherContent");
const utils_1 = require("../../../utils");
const Printing_1 = require("../../Printing");
const PrintDetails_1 = require("../../Printing/PrintDetails");
const PESO_SIGN_UI = '₱';
const CashBreakdownContent = ({ cashBreakdown, siteSettings, user, layout = 'columns', cashInDrawerSummary, }) => {
    // Cash In and Cash Collection are voucher-style receipts, not denomination
    // (coins/bills) breakdowns — Opening Fund (start_session) and Cash in
    // Drawer (end_session) keep the denomination table below untouched.
    if (cashBreakdown.category === globals_1.cashBreakdownCategories.CASH_IN &&
        cashBreakdown.type === globals_1.cashBreakdownTypes.MID_SESSION) {
        return (react_1.default.createElement(CashInVoucherContent_1.CashInVoucherContent, { cashBreakdown: cashBreakdown, siteSettings: siteSettings, user: user }));
    }
    if (cashBreakdown.category === globals_1.cashBreakdownCategories.CASH_BREAKDOWN &&
        cashBreakdown.type === globals_1.cashBreakdownTypes.MID_SESSION) {
        return (react_1.default.createElement(CashCollectionVoucherContent_1.CashCollectionVoucherContent, { cashBreakdown: cashBreakdown, siteSettings: siteSettings, user: user }));
    }
    const { coinsTotal, billsTotal, total } = (0, utils_1.getCashBreakdownTotals)(cashBreakdown);
    const drawerTotals = (0, utils_1.getCashInDrawerTotals)(cashBreakdown, total, cashInDrawerSummary);
    const denominationSection = (title, denominations, subtotal) => (react_1.default.createElement("div", { style: { flex: 1 } },
        react_1.default.createElement("div", { style: { textAlign: 'center', fontWeight: 'bold' } }, title),
        denominations.map(({ key, value }) => (react_1.default.createElement("div", { key: key, style: { display: 'flex', justifyContent: 'space-between', gap: 8 } },
            react_1.default.createElement("span", null, (0, utils_1.formatInPeso)(value, '')),
            react_1.default.createElement("span", null,
                "x ",
                cashBreakdown[key]),
            react_1.default.createElement("span", null, (0, utils_1.formatInPeso)(value * cashBreakdown[key], ''))))),
        react_1.default.createElement("div", { style: {
                display: 'flex',
                justifyContent: 'space-between',
                borderTop: '1px dashed',
            } },
            react_1.default.createElement("span", null, "Subtotal"),
            react_1.default.createElement("span", null, (0, utils_1.formatInPeso)(subtotal, PESO_SIGN_UI)))));
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { style: {
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
            } },
            react_1.default.createElement(Printing_1.ReceiptHeader, { branchMachine: cashBreakdown.branch_machine }),
            react_1.default.createElement("br", null),
            react_1.default.createElement("span", null, (0, utils_1.getCashBreakdownTypeDescription)(cashBreakdown.category, cashBreakdown.type))),
        react_1.default.createElement("br", null),
        react_1.default.createElement("div", { style: {
                display: 'flex',
                flexDirection: layout === 'columns' ? 'row' : 'column',
                gap: 16,
            } },
            denominationSection('COINS', utils_1.CASH_BREAKDOWN_COINS, coinsTotal),
            denominationSection('BILLS', utils_1.CASH_BREAKDOWN_BILLS, billsTotal)),
        drawerTotals ? (react_1.default.createElement("div", { style: { fontWeight: 'bold' } }, [
            ['TOTAL CASH ON HAND', total],
            ['TOTAL E-PAYMENTS', drawerTotals.ePayments],
            ...(drawerTotals.others !== undefined
                ? [['OTHERS', drawerTotals.others]]
                : []),
            ['TOTAL REMITTANCE', drawerTotals.remittance],
        ].map(([label, value]) => (react_1.default.createElement("div", { key: label, style: { display: 'flex', justifyContent: 'space-between' } },
            react_1.default.createElement("span", null, label),
            react_1.default.createElement("span", null, (0, utils_1.formatInPeso)(Number(value), PESO_SIGN_UI))))))) : (react_1.default.createElement("div", { style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                fontWeight: 'bold',
            } },
            react_1.default.createElement("span", null, "TOTAL"),
            react_1.default.createElement("span", null, (0, utils_1.formatInPeso)(total, PESO_SIGN_UI)))),
        react_1.default.createElement("br", null),
        react_1.default.createElement("div", null,
            "GDT: ",
            (0, utils_1.formatDateTime)(cashBreakdown.datetime_created)),
        react_1.default.createElement(PrintDetails_1.PrintDetails, { user: user }),
        (cashBreakdown.category === globals_1.cashBreakdownCategories.CASH_IN ||
            cashBreakdown.category === globals_1.cashBreakdownCategories.PRINT_ONLY) && (react_1.default.createElement("div", null,
            "Remarks: ",
            cashBreakdown.remarks)),
        react_1.default.createElement("br", null),
        react_1.default.createElement(Printing_1.ReceiptFooter, { siteSettings: siteSettings })));
};
exports.CashBreakdownContent = CashBreakdownContent;
