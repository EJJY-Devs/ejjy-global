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
exports.ViewXReadReportModal = void 0;
const icons_1 = require("@ant-design/icons");
const antd_1 = require("antd");
const react_1 = __importStar(require("react"));
const no_transaction_png_1 = __importDefault(require("../../../../public/no-transaction.png"));
const globals_1 = require("../../../globals");
const hooks_1 = require("../../../hooks");
const print_1 = require("../../../print");
const utils_1 = require("../../../utils");
const Printing_1 = require("../../Printing");
const XAccruedContent_1 = require("./XAccruedContent");
const XReadContent_1 = require("./XReadContent");
const { Text } = antd_1.Typography;
const ViewXReadReportModal = ({ report, siteSettings, user, onClose, }) => {
    var _a, _b;
    // STATES
    const [isCreatingTxt, setIsCreatingTxt] = (0, react_1.useState)(false);
    // CUSTOM HOOKS
    const { htmlPdf, isLoadingPdf, previewPdf, downloadPdf } = (0, hooks_1.usePdf)({
        title: `XReadReport_${report.id}`,
        image: (report === null || report === void 0 ? void 0 : report.gross_sales) === 0
            ? {
                src: no_transaction_png_1.default,
                x: 50,
                y: 50,
                w: 300,
                h: 600,
            }
            : undefined,
        print: () => (0, print_1.printXReadReport)(report, siteSettings, user, true),
    });
    // METHODS
    const handlePrint = () => {
        (0, print_1.printXReadReport)(report, siteSettings, user);
    };
    const handleCreateTxt = () => {
        setIsCreatingTxt(true);
        (0, print_1.createXReadTxt)(report, siteSettings, user);
        setIsCreatingTxt(false);
    };
    return (react_1.default.createElement(antd_1.Modal, { className: "ViewReportModal", footer: [
            react_1.default.createElement(antd_1.Button, { key: "print", disabled: isLoadingPdf || isCreatingTxt, icon: react_1.default.createElement(icons_1.PrinterOutlined, null), type: "primary", onClick: handlePrint }, "Print"),
            react_1.default.createElement(Printing_1.PdfButtons, { key: "pdf", downloadPdf: downloadPdf, isDisabled: isLoadingPdf, isLoading: isLoadingPdf, previewPdf: previewPdf }),
            react_1.default.createElement(antd_1.Button, { key: "txt", disabled: isLoadingPdf || isCreatingTxt, icon: react_1.default.createElement(icons_1.FileTextOutlined, null), loading: isCreatingTxt, type: "primary", onClick: handleCreateTxt }, "Create TXT"),
        ], title: "X-Read Report", width: 425, centered: true, closable: true, open: true, onCancel: onClose },
        report.gross_sales === 0 && (react_1.default.createElement("img", { alt: "no transaction", className: "w-full absolute top-0 left-0 pointer-events-none", src: no_transaction_png_1.default })),
        react_1.default.createElement(Printing_1.ReceiptHeader, { branchMachine: report.branch_machine, siteSettings: siteSettings }),
        react_1.default.createElement("div", { className: "mt-4" }, report.generated_by ? (react_1.default.createElement(XAccruedContent_1.XAccruedContent, { report: report })) : (react_1.default.createElement(XReadContent_1.XReadContent, { report: report }))),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(Text, { className: "block" },
            "GDT:",
            ' ',
            report.generation_datetime
                ? (0, utils_1.formatDateTime)(report.generation_datetime)
                : globals_1.EMPTY_CELL),
        react_1.default.createElement(Text, { className: "block" },
            "PDT:",
            ' ',
            report.printing_datetime
                ? (0, utils_1.formatDateTime)(report.printing_datetime)
                : globals_1.EMPTY_CELL),
        react_1.default.createElement("div", { className: "w-full flex justify-between" },
            react_1.default.createElement(Text, null,
                "C: ",
                ((_a = report === null || report === void 0 ? void 0 : report.cashiering_session) === null || _a === void 0 ? void 0 : _a.user.employee_id) || globals_1.EMPTY_CELL),
            react_1.default.createElement(Text, null,
                "PB: ",
                ((_b = report === null || report === void 0 ? void 0 : report.generated_by) === null || _b === void 0 ? void 0 : _b.employee_id) || globals_1.EMPTY_CELL)),
        react_1.default.createElement(Printing_1.ReceiptFooter, { siteSettings: siteSettings }),
        react_1.default.createElement("div", { dangerouslySetInnerHTML: { __html: htmlPdf }, style: { display: 'none' } })));
};
exports.ViewXReadReportModal = ViewXReadReportModal;
