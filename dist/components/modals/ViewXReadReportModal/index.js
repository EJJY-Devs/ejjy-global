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
const { Text } = antd_1.Typography;
const ViewXReadReportModal = ({ report, siteSettings, onClose, }) => {
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
        print: () => (0, print_1.printXReadReport)(report, siteSettings, report === null || report === void 0 ? void 0 : report.generated_by, true),
    });
    // METHODS
    const handlePrint = () => {
        (0, print_1.printXReadReport)(report, siteSettings, report === null || report === void 0 ? void 0 : report.generated_by);
    };
    const handleCreateTxt = () => {
        setIsCreatingTxt(true);
        (0, print_1.createXReadTxt)(report, siteSettings, report === null || report === void 0 ? void 0 : report.generated_by);
        setIsCreatingTxt(false);
    };
    return (react_1.default.createElement(antd_1.Modal, { className: "ViewReportModal", footer: [
            react_1.default.createElement(antd_1.Button, { key: "print", disabled: isLoadingPdf || isCreatingTxt, icon: react_1.default.createElement(icons_1.PrinterOutlined, null), type: "primary", onClick: handlePrint }, "Print"),
            react_1.default.createElement(Printing_1.PdfButtons, { key: "pdf", downloadPdf: downloadPdf, isDisabled: isLoadingPdf, isLoading: isLoadingPdf, previewPdf: previewPdf }),
            react_1.default.createElement(antd_1.Button, { key: "txt", disabled: isLoadingPdf || isCreatingTxt, icon: react_1.default.createElement(icons_1.FileTextOutlined, null), loading: isCreatingTxt, type: "primary", onClick: handleCreateTxt }, "Create TXT"),
        ], title: "X-Read Report", width: 425, centered: true, closable: true, open: true, onCancel: onClose },
        report.gross_sales === 0 && (react_1.default.createElement("img", { alt: "no transaction", style: {
                width: '100%',
                position: 'absolute',
                left: 0,
                bottom: 0,
            }, src: no_transaction_png_1.default })),
        react_1.default.createElement(Printing_1.ReceiptHeader, { branchMachine: report.branch_machine, siteSettings: siteSettings }),
        report.generated_by ? (react_1.default.createElement(XAccruedContent, { report: report })) : (react_1.default.createElement(XReadContent, { report: report })),
        react_1.default.createElement(Printing_1.ReceiptFooter, { siteSettings: siteSettings }),
        react_1.default.createElement("div", { dangerouslySetInnerHTML: { __html: htmlPdf }, style: { display: 'none' } })));
};
exports.ViewXReadReportModal = ViewXReadReportModal;
const XAccruedContent = ({ report }) => {
    var _a, _b, _c, _d;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Text, { className: "font-bold" }, "Current Day Accumulated Report"),
        react_1.default.createElement(Text, { className: "font-bold" }, "X-READ (end session report)"),
        react_1.default.createElement(Text, { className: "block" }, "INVOICE NUMBER"),
        react_1.default.createElement(Printing_1.ReceiptReportSummary, { data: [
                {
                    label: 'Beg Invoice #',
                    value: ((_a = report.beginning_or) === null || _a === void 0 ? void 0 : _a.or_number) || globals_1.EMPTY_CELL,
                },
                {
                    label: 'End Invoice #',
                    value: ((_b = report.ending_or) === null || _b === void 0 ? void 0 : _b.or_number) || globals_1.EMPTY_CELL,
                },
            ] }),
        react_1.default.createElement(Text, { className: "block" }, "SALES"),
        react_1.default.createElement(Printing_1.ReceiptReportSummary, { data: [
                { label: 'Beg', value: (0, utils_1.formatInPeso)(report.beginning_sales) },
                { label: 'Cur', value: (0, utils_1.formatInPeso)(report.gross_sales) },
                { label: 'End', value: (0, utils_1.formatInPeso)(report.ending_sales) },
            ] }),
        react_1.default.createElement(Text, { className: "block" }, "TRANSACTION COUNT"),
        react_1.default.createElement(Printing_1.ReceiptReportSummary, { data: [
                { label: 'Beg', value: report.beginning_transactions_count },
                { label: 'Cur', value: report.total_transactions },
                { label: 'End', value: report.ending_transactions_count },
            ] }),
        react_1.default.createElement(Text, { className: "w-100 mt-4 text-center block" }, "CURRENT SALES BREAKDOWN"),
        react_1.default.createElement(antd_1.Descriptions, { className: "w-100", colon: false, column: 1, contentStyle: {
                textAlign: 'right',
                display: 'block',
            }, labelStyle: {
                width: 200,
            }, size: "small" },
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "CASH SALES" },
                (0, utils_1.formatInPeso)(report.cash_sales),
                "\u00A0"),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "CREDIT SALES" },
                react_1.default.createElement(Printing_1.ReceiptUnderlinedValue, { postfix: "\u00A0", value: Number(report.credit_pay) })),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "GROSS SALES" },
                (0, utils_1.formatInPeso)(report.gross_sales),
                "\u00A0")),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(Text, { className: "w-100 text-center block" }, "Breakdown of Sales"),
        react_1.default.createElement(antd_1.Descriptions, { className: "w-100", colon: false, column: 1, contentStyle: {
                textAlign: 'right',
                display: 'block',
            }, labelStyle: {
                width: 200,
            }, size: "small" },
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "VAT Exempt" },
                (0, utils_1.formatInPeso)(report.vat_exempt),
                "\u00A0"),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "VATable Sales" },
                (0, utils_1.formatInPeso)(report.vat_sales),
                "\u00A0"),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "VAT Amount (12%)" },
                (0, utils_1.formatInPeso)(report.vat_amount),
                "\u00A0"),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "ZERO Rated" },
                (0, utils_1.formatInPeso)(0),
                "\u00A0")),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(antd_1.Descriptions, { className: "w-100", colon: false, column: 1, contentStyle: {
                textAlign: 'right',
                display: 'block',
            }, labelStyle: {
                width: 200,
            }, size: "small" },
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "GROSS SALES" },
                (0, utils_1.formatInPeso)(report.gross_sales),
                "\u00A0"),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "REG. DISCOUNT", labelStyle: { paddingLeft: 30 } },
                "(",
                (0, utils_1.formatInPeso)(report.regular_discount),
                ")"),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "Special", labelStyle: { paddingLeft: 30 } },
                "(",
                (0, utils_1.formatInPeso)(report.special_discount),
                ")"),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "VOIDED SALES", labelStyle: { paddingLeft: 30 } },
                "(",
                (0, utils_1.formatInPeso)(report.void),
                ")"),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "VAT Amount (12%)", labelStyle: { paddingLeft: 30 } },
                react_1.default.createElement(Printing_1.ReceiptUnderlinedValue, { postfix: ")", prefix: "(", value: report.total_vat_adjusted })),
            react_1.default.createElement(antd_1.Descriptions.Item, { contentStyle: { fontWeight: 'bold' }, label: "NET SALES", labelStyle: { fontWeight: 'bold' } },
                (0, utils_1.formatInPeso)(report.net_sales),
                "\u00A0")),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(Text, { className: "w-100 text-center block" }, "Deductions"),
        react_1.default.createElement(antd_1.Descriptions, { className: "w-100", colon: false, column: 1, contentStyle: {
                textAlign: 'right',
                display: 'block',
            }, labelStyle: {
                width: 200,
            }, size: "small" },
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "Disc. SC" }, null),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "Disc. PWD" }, null),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "Disc. NAAC" }, null),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "Disc. Solo Parent" }, null),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "Disc. Others" }, null),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "Return" }, null),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "Void" }, null),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "TOTAL" }, null)),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(Text, { className: "w-100 text-center block" }, "VAT Adjustment"),
        react_1.default.createElement(antd_1.Descriptions, { className: "w-100", colon: false, column: 1, contentStyle: {
                textAlign: 'right',
                display: 'block',
            }, labelStyle: {
                width: 200,
            }, size: "small" },
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "Disc. SC" }, null),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "Disc. PWD" }, null),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "Disc. Others" }, null),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "VAT on Returns" }, null),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "Others" }, null),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "TOTAL" }, null)),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(Text, { className: "w-100 text-center block" }, "VAT Payable"),
        react_1.default.createElement(antd_1.Descriptions, { className: "w-100", colon: false, column: 1, contentStyle: {
                textAlign: 'right',
                display: 'block',
            }, labelStyle: {
                width: 200,
            }, size: "small" },
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "VAT AMOUNT (12%)" },
                (0, utils_1.formatInPeso)(report.vat_amount),
                "\u00A0"),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "VAT ADJ." },
                react_1.default.createElement(Printing_1.ReceiptUnderlinedValue, { postfix: ")", prefix: "(", value: report.total_vat_adjusted })),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "VAT PAYABLE" },
                (0, utils_1.formatInPeso)(report.vat_payable),
                "\u00A0")),
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
        react_1.default.createElement("div", { className: "w-100 flex justify-between" },
            react_1.default.createElement(Text, null,
                "C: ",
                ((_c = report === null || report === void 0 ? void 0 : report.generated_by) === null || _c === void 0 ? void 0 : _c.employee_id) || globals_1.EMPTY_CELL),
            react_1.default.createElement(Text, null,
                "PB: ",
                ((_d = report === null || report === void 0 ? void 0 : report.generated_by) === null || _d === void 0 ? void 0 : _d.employee_id) || globals_1.EMPTY_CELL))));
};
const XReadContent = ({ report }) => null;
// type Items = {
// 	label: string;
// 	value: string | number | React.ReactElement;
// 	isIndented: boolean;
// 	isUnderlined: boolean;
// 	isParenthesized: boolean;
// };
// type ItemBlockProps = {
// 	items: Items[];
// };
// const ItemBlock = ({ items }: ItemBlockProps) => {
// 	return (
// 		<>
// 			{items.map((item) => (
// 				<div key={item.label} className="w-full grid grid-cols-2">
// 					<span className={cn({ 'pl-8': item.isIndented })}>{item.label}</span>
// 					<span className="text-right">
// 						{item.isParenthesized ? '(' : ' '}
// 						{item.value}
// 						{item.isParenthesized ? ')' : ' '}
// 					</span>
// 				</div>
// 			))}
// 		</>
// 	);
// };
