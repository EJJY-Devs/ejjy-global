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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewDailySalesModal = void 0;
const icons_1 = require("@ant-design/icons");
const antd_1 = require("antd");
const react_1 = __importStar(require("react"));
const globals_1 = require("../../../globals");
const hooks_1 = require("../../../hooks");
const print_1 = require("../../../print");
const utils_1 = require("../../../utils");
const Printing_1 = require("../../Printing");
const { Text } = antd_1.Typography;
const ViewDailySalesModal = ({ dailySales, siteSettings, onClose, }) => {
    var _a, _b;
    // STATES
    const [isCreatingTxt, setIsCreatingTxt] = (0, react_1.useState)(false);
    // CUSTOM HOOKS
    const { htmlPdf, isLoadingPdf, previewPdf, downloadPdf } = (0, hooks_1.usePdf)({
        title: `DailySales_${dailySales.id}`,
        print: () => (0, print_1.printDailySales)(dailySales, siteSettings, dailySales.branch_machine, dailySales === null || dailySales === void 0 ? void 0 : dailySales.generated_by, true),
    });
    // METHODS
    const handlePrint = () => {
        (0, print_1.printDailySales)(dailySales, siteSettings, dailySales.branch_machine, dailySales === null || dailySales === void 0 ? void 0 : dailySales.generated_by);
    };
    const handleCreateTxt = () => {
        setIsCreatingTxt(true);
        (0, print_1.createDailySalesTxt)(dailySales, siteSettings, dailySales.branch_machine, dailySales === null || dailySales === void 0 ? void 0 : dailySales.generated_by);
        setIsCreatingTxt(false);
    };
    return (react_1.default.createElement(antd_1.Modal, { footer: [
            react_1.default.createElement(antd_1.Button, { key: "print", disabled: isLoadingPdf || isCreatingTxt, icon: react_1.default.createElement(icons_1.PrinterOutlined, null), type: "primary", onClick: handlePrint }, "Print"),
            react_1.default.createElement(Printing_1.PdfButtons, { key: "pdf", downloadPdf: downloadPdf, isDisabled: isLoadingPdf, isLoading: isLoadingPdf, previewPdf: previewPdf }),
            react_1.default.createElement(antd_1.Button, { key: "txt", disabled: isLoadingPdf || isCreatingTxt, icon: react_1.default.createElement(icons_1.FileTextOutlined, null), loading: isCreatingTxt, type: "primary", onClick: handleCreateTxt }, "Create TXT"),
        ], title: "Daily Sales", width: 425, centered: true, closable: true, open: true, onCancel: onClose },
        react_1.default.createElement(Printing_1.ReceiptHeader, { branchMachine: dailySales.branch_machine, siteSettings: siteSettings }),
        react_1.default.createElement(antd_1.Space, { align: "center", className: "mt-6 w-100 justify-space-between" },
            react_1.default.createElement(Text, null, "DAILY SALES"),
            react_1.default.createElement(Text, null, `For ${(0, utils_1.formatDate)(dailySales.daily_sales_data.date)}`)),
        react_1.default.createElement(antd_1.Descriptions, { className: "mt-6 w-100", colon: false, column: 1, contentStyle: {
                textAlign: 'right',
                display: 'block',
            }, labelStyle: {
                width: 200,
            }, size: "small" },
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "CASH SALES" },
                (0, utils_1.formatInPeso)(dailySales.cash_sales),
                "\u00A0"),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "CREDIT SALES" },
                (0, utils_1.formatInPeso)(dailySales.credit_pay),
                "\u00A0"),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "GROSS SALES" },
                (0, utils_1.formatInPeso)(dailySales.gross_sales),
                "\u00A0")),
        react_1.default.createElement(antd_1.Descriptions, { className: "mt-6 w-100", colon: false, column: 1, contentStyle: {
                textAlign: 'right',
                display: 'block',
            }, labelStyle: {
                width: 200,
            }, size: "small" },
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "VAT Exempt" },
                (0, utils_1.formatInPeso)(dailySales.vat_exempt),
                "\u00A0"),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "VATable Sales" },
                (0, utils_1.formatInPeso)(dailySales.vat_sales),
                "\u00A0"),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "VAT Amount (12%)" },
                (0, utils_1.formatInPeso)(dailySales.vat_amount),
                "\u00A0"),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "ZERO Rated" },
                (0, utils_1.formatInPeso)(0),
                "\u00A0")),
        react_1.default.createElement("div", { className: "w-100", style: { textAlign: 'right' } }, "----------------"),
        react_1.default.createElement(antd_1.Descriptions, { className: "w-100", colon: false, column: 1, contentStyle: {
                textAlign: 'right',
                display: 'block',
            }, labelStyle: {
                width: 200,
            }, size: "small" },
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "GROSS SALES" },
                (0, utils_1.formatInPeso)(dailySales.gross_sales),
                "\u00A0"),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "REG. DISCOUNT", labelStyle: { paddingLeft: 30 } },
                "(",
                (0, utils_1.formatInPeso)(dailySales.regular_discount),
                ")"),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "SC/PWD", labelStyle: { paddingLeft: 30 } },
                "(",
                (0, utils_1.formatInPeso)(dailySales.special_discount),
                ")"),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "VOIDED SALES", labelStyle: { paddingLeft: 30 } },
                "(",
                (0, utils_1.formatInPeso)(dailySales.void),
                ")"),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "VAT Amount (12%)", labelStyle: { paddingLeft: 30 } },
                "(",
                (0, utils_1.formatInPeso)(dailySales.total_vat_adjusted),
                ")"),
            react_1.default.createElement(antd_1.Descriptions.Item, { contentStyle: { fontWeight: 'bold' }, label: "NET SALES", labelStyle: { fontWeight: 'bold' } },
                (0, utils_1.formatInPeso)(dailySales.net_sales),
                "\u00A0")),
        react_1.default.createElement("div", { className: "w-100", style: { textAlign: 'right' } }, "----------------"),
        react_1.default.createElement(antd_1.Descriptions, { className: "w-100", colon: false, column: 1, contentStyle: {
                textAlign: 'right',
                display: 'block',
            }, labelStyle: {
                width: 200,
            }, size: "small" },
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "ADJUSTMENT ON VAT" }, null),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "SC/PWD", labelStyle: { paddingLeft: 30 } },
                (0, utils_1.formatInPeso)(dailySales.vat_special_discount),
                "\u00A0"),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "OTHERS", labelStyle: { paddingLeft: 30 } },
                (0, utils_1.formatInPeso)(dailySales.others),
                "\u00A0"),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "TOTAL", labelStyle: { paddingLeft: 30 } },
                (0, utils_1.formatInPeso)(dailySales.total_vat_adjusted),
                "\u00A0")),
        react_1.default.createElement("div", { className: "w-100", style: { textAlign: 'right' } }, "----------------"),
        react_1.default.createElement(antd_1.Descriptions, { className: "w-100", colon: false, column: 1, contentStyle: {
                textAlign: 'right',
                display: 'block',
            }, labelStyle: {
                width: 200,
            }, size: "small" },
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "VAT AMOUNT (12%)" },
                (0, utils_1.formatInPeso)(dailySales.vat_amount),
                "\u00A0"),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "VAT ADJ." },
                "(",
                (0, utils_1.formatInPeso)(dailySales.total_vat_adjusted),
                ")"),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "VAT PAYABLE" },
                (0, utils_1.formatInPeso)(dailySales.vat_payable),
                "\u00A0")),
        react_1.default.createElement(antd_1.Space, { className: "mt-6 w-100", direction: "vertical" },
            react_1.default.createElement(Text, null,
                "GDT:",
                ' ',
                dailySales.generation_datetime
                    ? (0, utils_1.formatDateTime)(dailySales.generation_datetime)
                    : globals_1.EMPTY_CELL),
            react_1.default.createElement(Text, null,
                "PDT:",
                ' ',
                dailySales.printing_datetime
                    ? (0, utils_1.formatDateTime)(dailySales.printing_datetime)
                    : globals_1.EMPTY_CELL)),
        react_1.default.createElement(antd_1.Space, { className: "mt-2 w-100 justify-space-between" },
            react_1.default.createElement(Text, null,
                "C: ",
                ((_a = dailySales === null || dailySales === void 0 ? void 0 : dailySales.generated_by) === null || _a === void 0 ? void 0 : _a.employee_id) || globals_1.EMPTY_CELL),
            react_1.default.createElement(Text, null,
                "PB: ",
                ((_b = dailySales === null || dailySales === void 0 ? void 0 : dailySales.generated_by) === null || _b === void 0 ? void 0 : _b.employee_id) || globals_1.EMPTY_CELL)),
        react_1.default.createElement(Printing_1.ReceiptFooter, { siteSettings: siteSettings }),
        react_1.default.createElement("div", { dangerouslySetInnerHTML: { __html: htmlPdf }, style: { display: 'none' } })));
};
exports.ViewDailySalesModal = ViewDailySalesModal;
