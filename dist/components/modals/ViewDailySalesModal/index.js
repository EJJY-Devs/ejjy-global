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
const hooks_1 = require("../../../hooks");
const print_1 = require("../../../print");
const Printing_1 = require("../../Printing");
const DailySalesContent_1 = require("./DailySalesContent");
const ViewDailySalesModal = ({ dailySales, siteSettings, user, isForPrint, onClose, }) => {
    // STATES
    const [isCreatingTxt, setIsCreatingTxt] = (0, react_1.useState)(false);
    // CUSTOM HOOKS
    const { htmlPdf, isLoadingPdf, previewPdf, downloadPdf } = (0, hooks_1.usePdf)({
        title: `DailySales_${dailySales.id}`,
        print: () => (0, print_1.printDailySales)(dailySales, siteSettings, user, true),
    });
    // METHODS
    const handlePrint = () => {
        (0, print_1.printDailySales)(dailySales, siteSettings, user);
    };
    const handleCreateTxt = () => {
        setIsCreatingTxt(true);
        (0, print_1.createDailySalesTxt)(dailySales, siteSettings, user);
        setIsCreatingTxt(false);
    };
    return (react_1.default.createElement(antd_1.Modal, { footer: [
            react_1.default.createElement(antd_1.Button, { key: "print", disabled: isLoadingPdf || isCreatingTxt, icon: react_1.default.createElement(icons_1.PrinterOutlined, null), type: "primary", onClick: handlePrint }, "Print"),
            react_1.default.createElement(Printing_1.PdfButtons, { key: "pdf", downloadPdf: downloadPdf, isDisabled: isLoadingPdf, isLoading: isLoadingPdf, previewPdf: previewPdf }),
            react_1.default.createElement(antd_1.Button, { key: "txt", disabled: isLoadingPdf || isCreatingTxt, icon: react_1.default.createElement(icons_1.FileTextOutlined, null), loading: isCreatingTxt, type: "primary", onClick: handleCreateTxt }, "Create TXT"),
        ], title: "Daily Sales", width: 425, centered: true, closable: true, open: true, onCancel: onClose },
        react_1.default.createElement(DailySalesContent_1.DailySalesContent, { dailySales: dailySales, siteSettings: siteSettings, isForPrint: isForPrint }),
        react_1.default.createElement("div", { dangerouslySetInnerHTML: { __html: htmlPdf }, style: { display: 'none' } })));
};
exports.ViewDailySalesModal = ViewDailySalesModal;
