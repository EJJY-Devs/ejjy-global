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
exports.ViewTransactionModal = void 0;
const icons_1 = require("@ant-design/icons");
const antd_1 = require("antd");
const react_1 = __importStar(require("react"));
const globals_1 = require("../../../globals");
const hooks_1 = require("../../../hooks");
const print_1 = require("../../../print");
const Printing_1 = require("../../Printing");
const TransactionContent_1 = require("./TransactionContent");
const ViewTransactionModal = ({ transaction, siteSettings, serviceOptions, onClose, }) => {
    var _a;
    // STATE
    const [transactionData, setTransactionData] = (0, react_1.useState)(null);
    const [isCreatingTxt, setIsCreatingTxt] = (0, react_1.useState)(false);
    const [title, setTitle] = (0, react_1.useState)('Invoice');
    // CUSTOM HOOKS
    const { htmlPdf, isLoadingPdf, previewPdf, downloadPdf } = (0, hooks_1.usePdf)({
        title: `SalesInvoice_${(_a = transactionData === null || transactionData === void 0 ? void 0 : transactionData.invoice) === null || _a === void 0 ? void 0 : _a.or_number}`,
        print: () => {
            if (!transactionData) {
                antd_1.message.error(globals_1.GENERIC_ERROR_MESSAGE);
                return undefined;
            }
            return (0, print_1.printSalesInvoice)(transactionData, siteSettings, true, true);
        },
    });
    const { data: transactionRetrieved, isFetching } = (0, hooks_1.useTransactionRetrieve)({
        id: typeof transaction === 'number' ? transaction : transaction.id,
        options: { enabled: typeof transaction === 'number' },
        serviceOptions,
    });
    // METHODS
    (0, react_1.useEffect)(() => {
        // Set transaction
        const newTransaction = typeof transaction === 'number' ? transactionRetrieved : transaction;
        setTransactionData(newTransaction);
        // Set title
        if (newTransaction === null || newTransaction === void 0 ? void 0 : newTransaction.id) {
            if (newTransaction.payment.mode === globals_1.saleTypes.CASH) {
                setTitle(globals_1.salesInvoiceTitles.CASH);
            }
            else if (newTransaction.payment.mode === globals_1.saleTypes.CREDIT) {
                setTitle(globals_1.salesInvoiceTitles.CHARGE);
            }
        }
    }, [transactionRetrieved, transaction]);
    const handlePrint = () => {
        if (!transactionData) {
            antd_1.message.error(globals_1.GENERIC_ERROR_MESSAGE);
            return;
        }
        (0, print_1.printSalesInvoice)(transactionData, siteSettings, true);
    };
    const handleCreateTxt = () => {
        if (!transactionData) {
            antd_1.message.error(globals_1.GENERIC_ERROR_MESSAGE);
            return;
        }
        setIsCreatingTxt(true);
        (0, print_1.createSalesInvoiceTxt)(transactionData, siteSettings, true);
        setIsCreatingTxt(false);
    };
    return (react_1.default.createElement(antd_1.Modal, { footer: [
            react_1.default.createElement(antd_1.Button, { key: "print", disabled: isLoadingPdf || isCreatingTxt, icon: react_1.default.createElement(icons_1.PrinterOutlined, null), type: "primary", onClick: handlePrint }, "Print"),
            react_1.default.createElement(Printing_1.PdfButtons, { key: "pdf", downloadPdf: downloadPdf, isDisabled: isLoadingPdf, isLoading: isLoadingPdf, previewPdf: previewPdf }),
            react_1.default.createElement(antd_1.Button, { key: "txt", disabled: isLoadingPdf || isCreatingTxt, icon: react_1.default.createElement(icons_1.FileTextOutlined, null), loading: isCreatingTxt, type: "primary", onClick: handleCreateTxt }, "Create TXT"),
        ], title: title, width: 425, centered: true, closable: true, open: true, onCancel: onClose },
        react_1.default.createElement(antd_1.Spin, { spinning: isFetching }, (transactionData === null || transactionData === void 0 ? void 0 : transactionData.id) && (react_1.default.createElement(TransactionContent_1.TransactionContent, { transaction: transactionData, siteSettings: siteSettings }))),
        react_1.default.createElement("div", { dangerouslySetInnerHTML: { __html: htmlPdf }, style: { display: 'none' } })));
};
exports.ViewTransactionModal = ViewTransactionModal;
