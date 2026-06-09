"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewUnsoldItemModal = void 0;
const icons_1 = require("@ant-design/icons");
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
const no_transaction_png_1 = __importDefault(require("../../../../public/no-transaction.png"));
const hooks_1 = require("../../../hooks");
const print_1 = require("../../../print");
const Printing_1 = require("../../Printing");
const UnsoldItemContent_1 = require("./UnsoldItemContent");
const ViewUnsoldItemModal = ({ unsoldItemSummary, branch, branchMachine, user, loading = false, // Default to false
reportDate, onClose, }) => {
    // CUSTOM HOOKS
    const { htmlPdf, isLoadingPdf, previewPdf, downloadPdf } = (0, hooks_1.usePdf)({
        title: `UnsoldItemSummary_${new Date().toISOString().split('T')[0]}`,
        image: unsoldItemSummary.length === 0 && !loading
            ? {
                src: no_transaction_png_1.default,
                x: 50,
                y: 50,
                w: 300,
                h: 600,
            }
            : undefined,
        print: () => (0, print_1.printUnsoldItem)({
            unsoldItemSummary,
            branch,
            branchMachine,
            user,
            isPdf: true,
            reportDate,
        }),
    });
    // METHODS
    const handlePrint = () => {
        (0, print_1.printUnsoldItem)({
            unsoldItemSummary,
            branch,
            branchMachine,
            user,
            reportDate,
        });
    };
    return (react_1.default.createElement(antd_1.Modal, { footer: [
            react_1.default.createElement(antd_1.Button, { key: "print", disabled: isLoadingPdf || loading, icon: react_1.default.createElement(icons_1.PrinterOutlined, null), type: "primary", onClick: handlePrint }, "Print"),
            react_1.default.createElement(Printing_1.PdfButtons, { key: "pdf", downloadPdf: downloadPdf, isDisabled: isLoadingPdf || loading, isLoading: isLoadingPdf, previewPdf: previewPdf }),
        ], title: "Unsold Items", width: 425, centered: true, closable: true, open: true, onCancel: onClose },
        react_1.default.createElement(antd_1.Spin, { spinning: loading, tip: "Loading products..." },
            react_1.default.createElement(UnsoldItemContent_1.UnsoldItemContent, { unsoldItemSummary: unsoldItemSummary, branch: branch, branchMachine: branchMachine, user: user, reportDate: reportDate })),
        react_1.default.createElement("div", { dangerouslySetInnerHTML: { __html: htmlPdf }, style: { display: 'none' } })));
};
exports.ViewUnsoldItemModal = ViewUnsoldItemModal;
