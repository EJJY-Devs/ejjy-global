"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewCashBreakdownModal = void 0;
/* eslint-disable no-prototype-builtins */
const icons_1 = require("@ant-design/icons");
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
const CashBreakdownContent_1 = require("./CashBreakdownContent");
const utils_1 = require("../../../utils");
const hooks_1 = require("../../../hooks");
const globals_1 = require("../../../globals");
const print_1 = require("../../../print");
const Printing_1 = require("../../Printing");
const ViewCashBreakdownModal = ({ cashBreakdown, siteSettings, user, onClose, }) => {
    // VARIABLES
    const type = (0, utils_1.getCashBreakdownTypeDescription)(cashBreakdown.category, cashBreakdown.type);
    // CUSTOM HOOKS
    const { htmlPdf, isLoadingPdf, previewPdf, downloadPdf } = (0, hooks_1.usePdf)({
        title: `${cashBreakdown.category === globals_1.cashBreakdownCategories.CASH_OUT
            ? 'CashOut'
            : 'CashBreakdown'}_${cashBreakdown.id}.pdf`,
        print: () => {
            if (cashBreakdown.category === globals_1.cashBreakdownCategories.CASH_OUT) {
                return (0, print_1.printCashOut)(cashBreakdown, siteSettings, true);
            }
            return (0, print_1.printCashBreakdown)(cashBreakdown, siteSettings, user, true);
        },
    });
    // METHODS
    const handlePrint = () => {
        if (cashBreakdown.category === globals_1.cashBreakdownCategories.CASH_OUT) {
            (0, print_1.printCashOut)(cashBreakdown, siteSettings);
        }
        else {
            (0, print_1.printCashBreakdown)(cashBreakdown, siteSettings);
        }
    };
    return (react_1.default.createElement(antd_1.Modal, { className: "Modal__hasFooter", footer: [
            react_1.default.createElement(antd_1.Button, { key: "print", disabled: isLoadingPdf, icon: react_1.default.createElement(icons_1.PrinterOutlined, null), type: "primary", onClick: handlePrint }, "Print"),
            react_1.default.createElement(Printing_1.PdfButtons, { key: "pdf", downloadPdf: downloadPdf, isDisabled: isLoadingPdf, isLoading: isLoadingPdf, previewPdf: previewPdf }),
        ], title: `[View] ${type}`, centered: true, closable: true, open: true, onCancel: onClose },
        cashBreakdown.category === globals_1.cashBreakdownCategories.CASH_OUT ? (react_1.default.createElement(CashOutDetails, { cashBreakdown: cashBreakdown })) : (react_1.default.createElement(CashBreakdownContent_1.CashBreakdownContent, { cashBreakdown: cashBreakdown, siteSettings: siteSettings })),
        react_1.default.createElement("div", { 
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML: { __html: htmlPdf }, style: { display: 'none' } })));
};
exports.ViewCashBreakdownModal = ViewCashBreakdownModal;
const CashOutDetails = ({ cashBreakdown, }) => {
    const cashOut = cashBreakdown.cash_out_metadata;
    return (react_1.default.createElement(antd_1.Descriptions, { className: "w-100", column: 1, labelStyle: { width: 200 }, bordered: true },
        react_1.default.createElement(antd_1.Descriptions.Item, { label: "Datetime" }, (0, utils_1.formatDateTime)(cashBreakdown.datetime_created)),
        react_1.default.createElement(antd_1.Descriptions.Item, { label: "Payee" }, cashOut.payee),
        react_1.default.createElement(antd_1.Descriptions.Item, { label: "Particulars" }, cashOut.particulars),
        react_1.default.createElement(antd_1.Descriptions.Item, { label: "Amount" }, (0, utils_1.formatInPeso)(cashOut.amount)),
        react_1.default.createElement(antd_1.Descriptions.Item, { label: "Prepared By" }, (0, utils_1.getFullName)(cashOut.prepared_by_user)),
        react_1.default.createElement(antd_1.Descriptions.Item, { label: "Approved By" }, (0, utils_1.getFullName)(cashOut.approved_by_user)),
        react_1.default.createElement(antd_1.Descriptions.Item, { label: "Received By" }, cashOut.received_by)));
};
