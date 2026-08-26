"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewOrderOfPaymentModal = void 0;
const icons_1 = require("@ant-design/icons");
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
const hooks_1 = require("../../../hooks");
const print_1 = require("../../../print");
const Printing_1 = require("../../Printing");
const OrderOfPaymentContent_1 = require("./OrderOfPaymentContent");
const ViewOrderOfPaymentModal = ({ orderOfPayment, onClose }) => {
    const { htmlPdf, isLoadingPdf, previewPdf, downloadPdf, pdfPreviewModal } = (0, hooks_1.usePdf)({
        title: `OrderOfPayment_${orderOfPayment.reference_number}`,
        // PF B: A4 1/2 crosswise (short, wide landscape half-sheet). This
        // document renders at 794px wide (see printOrderOfPaymentHtml) to match
        // that layout, not the 400px-wide default jsPDF page every narrow
        // receipt-format item relies on — otherwise jsPDF rasterizes the wider
        // content onto a narrower page and clips the right side.
        jsPdfSettings: print_1.paperSizes.A4_CROSSWISE,
        print: () => (0, print_1.printOrderOfPayment)({
            orderOfPayment,
            isPdf: true,
        }),
    });
    const handlePrint = () => {
        (0, print_1.printOrderOfPayment)({
            orderOfPayment,
        });
    };
    return (react_1.default.createElement(antd_1.Modal, { footer: [
            react_1.default.createElement(antd_1.Button, { key: "print", disabled: isLoadingPdf, icon: react_1.default.createElement(icons_1.PrinterOutlined, null), type: "primary", onClick: handlePrint }, "Print"),
            react_1.default.createElement(Printing_1.PdfButtons, { key: "pdf", downloadPdf: downloadPdf, isDisabled: isLoadingPdf, isLoading: isLoadingPdf, previewPdf: previewPdf }),
        ], title: "Order of Payment", width: 820, centered: true, closable: true, open: true, onCancel: onClose },
        react_1.default.createElement(OrderOfPaymentContent_1.OrderOfPaymentContent, { orderOfPayment: orderOfPayment }),
        react_1.default.createElement("div", { dangerouslySetInnerHTML: { __html: htmlPdf }, style: { display: 'none' } }),
        pdfPreviewModal));
};
exports.ViewOrderOfPaymentModal = ViewOrderOfPaymentModal;
