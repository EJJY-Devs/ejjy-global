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
    const { htmlPdf, isLoadingPdf, previewPdf, downloadPdf } = (0, hooks_1.usePdf)({
        title: `OrderOfPayment_${orderOfPayment.reference_number}`,
        // This document renders at 794px wide (see printOrderOfPaymentHtml) to
        // match its A4 1/2 Crosswise/landscape layout, not the 400px-wide
        // default jsPDF page every narrow receipt-format item relies on.
        // Without overriding the page format here, jsPDF has no width/
        // windowWidth option to auto-scale by, so it would rasterize the
        // wider content onto a narrower page and clip the right side.
        jsPdfSettings: { format: [794, 2000] },
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
        ], title: "Order of Payment", width: 425, centered: true, closable: true, open: true, onCancel: onClose },
        react_1.default.createElement(OrderOfPaymentContent_1.OrderOfPaymentContent, { orderOfPayment: orderOfPayment }),
        react_1.default.createElement("div", { dangerouslySetInnerHTML: { __html: htmlPdf }, style: { display: 'none' } })));
};
exports.ViewOrderOfPaymentModal = ViewOrderOfPaymentModal;
