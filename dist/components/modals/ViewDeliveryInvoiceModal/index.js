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
exports.ViewDeliveryInvoiceModal = void 0;
const icons_1 = require("@ant-design/icons");
const antd_1 = require("antd");
const react_1 = __importStar(require("react"));
const globals_1 = require("../../../globals");
const hooks_1 = require("../../../hooks");
const print_1 = require("../../../print");
const Printing_1 = require("../../Printing");
const DeliveryInvoiceContent_1 = require("./DeliveryInvoiceContent");
const ViewDeliveryInvoiceModal = ({ deliveryInvoice, siteSettings, serviceOptions, onClose, }) => {
    // STATE
    const [deliveryInvoiceData, setDeliveryInvoiceData] = (0, react_1.useState)(null);
    // CUSTOM HOOKS
    const { htmlPdf, isLoadingPdf, previewPdf, downloadPdf } = (0, hooks_1.usePdf)({
        title: `DeliveryInvoice_${deliveryInvoiceData === null || deliveryInvoiceData === void 0 ? void 0 : deliveryInvoiceData.id}`,
        print: () => {
            if (!deliveryInvoiceData) {
                antd_1.message.error(globals_1.GENERIC_ERROR_MESSAGE);
                return undefined;
            }
            return (0, print_1.printDeliveryInvoice)({
                deliveryInvoice: deliveryInvoiceData,
                siteSettings,
                isReprint: true,
                isPdf: true,
            });
        },
    });
    const { data: deliveryInvoiceRetrieved, isFetching } = (0, hooks_1.useDeliveryInvoiceRetrieve)({
        id: typeof deliveryInvoice === 'number'
            ? deliveryInvoice
            : deliveryInvoice.id,
        options: { enabled: typeof deliveryInvoice === 'number' },
        serviceOptions,
    });
    // METHODS
    (0, react_1.useEffect)(() => {
        // Set delivery invoice
        const newDeliveryInvoice = typeof deliveryInvoice === 'number'
            ? deliveryInvoiceRetrieved
            : deliveryInvoice;
        setDeliveryInvoiceData(newDeliveryInvoice);
    }, [deliveryInvoiceRetrieved, deliveryInvoice]);
    const handlePrint = () => {
        if (!deliveryInvoiceData) {
            antd_1.message.error(globals_1.GENERIC_ERROR_MESSAGE);
            return;
        }
        (0, print_1.printDeliveryInvoice)({
            deliveryInvoice: deliveryInvoiceData,
            siteSettings,
            isReprint: true,
        });
    };
    return (react_1.default.createElement(antd_1.Modal, { footer: [
            react_1.default.createElement(antd_1.Button, { key: "print", disabled: isLoadingPdf, icon: react_1.default.createElement(icons_1.PrinterOutlined, null), type: "primary", onClick: handlePrint }, "Print"),
            react_1.default.createElement(Printing_1.PdfButtons, { key: "pdf", downloadPdf: downloadPdf, isDisabled: isLoadingPdf, isLoading: isLoadingPdf, previewPdf: previewPdf }),
        ], title: "Delivery Invoice", width: 425, centered: true, closable: true, open: true, onCancel: onClose },
        react_1.default.createElement(antd_1.Spin, { spinning: isFetching }, (deliveryInvoiceData === null || deliveryInvoiceData === void 0 ? void 0 : deliveryInvoiceData.id) && (react_1.default.createElement(DeliveryInvoiceContent_1.DeliveryInvoiceContent, { deliveryInvoice: deliveryInvoiceData, siteSettings: siteSettings }))),
        react_1.default.createElement("div", { dangerouslySetInnerHTML: { __html: htmlPdf }, style: { display: 'none' } })));
};
exports.ViewDeliveryInvoiceModal = ViewDeliveryInvoiceModal;
