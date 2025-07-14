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
exports.ViewDailyItemSoldModal = void 0;
const icons_1 = require("@ant-design/icons");
const antd_1 = require("antd");
const react_1 = __importStar(require("react"));
const no_transaction_png_1 = __importDefault(require("../../../../public/no-transaction.png"));
const hooks_1 = require("../../../hooks");
const print_1 = require("../../../print");
const Printing_1 = require("../../Printing");
const DailyItemSoldContent_1 = require("./DailyItemSoldContent");
const ViewDailyItemSoldModal = ({ dailyItemSoldSummary, branch, branchMachine, user, isForPrint, onClose, }) => {
    // STATES
    const [isCreatingTxt, setIsCreatingTxt] = (0, react_1.useState)(false);
    // CUSTOM HOOKS
    const { htmlPdf, isLoadingPdf, previewPdf, downloadPdf } = (0, hooks_1.usePdf)({
        title: `DailyItemSoldSummary_${new Date().toISOString().split('T')[0]}`,
        image: dailyItemSoldSummary.length === 0
            ? {
                src: no_transaction_png_1.default,
                x: 50,
                y: 50,
                w: 300,
                h: 600,
            }
            : undefined,
        print: () => (0, print_1.printDailyItemSold)({
            dailyItemSoldSummary,
            branch,
            branchMachine,
            user,
            isPdf: true,
        }),
    });
    // METHODS
    const handlePrint = () => {
        (0, print_1.printDailyItemSold)({
            dailyItemSoldSummary,
            branch,
            branchMachine,
            user,
        });
    };
    const handleCreateTxt = () => {
        setIsCreatingTxt(true);
        // TODO: Implement createDailyItemSoldTxt when TXT printing is needed
        console.log('Create daily item sold TXT:', {
            dailyItemSoldSummary,
            branch,
            branchMachine,
            user,
        });
        setIsCreatingTxt(false);
    };
    return (react_1.default.createElement(antd_1.Modal, { footer: [
            react_1.default.createElement(antd_1.Button, { key: "print", disabled: isLoadingPdf || isCreatingTxt, icon: react_1.default.createElement(icons_1.PrinterOutlined, null), type: "primary", onClick: handlePrint }, "Print"),
            react_1.default.createElement(Printing_1.PdfButtons, { key: "pdf", downloadPdf: downloadPdf, isDisabled: isLoadingPdf, isLoading: isLoadingPdf, previewPdf: previewPdf }),
            react_1.default.createElement(antd_1.Button, { key: "txt", disabled: isLoadingPdf || isCreatingTxt, icon: react_1.default.createElement(icons_1.FileTextOutlined, null), loading: isCreatingTxt, type: "primary", onClick: handleCreateTxt }, "Create TXT"),
        ], title: "Daily Item Sold", width: 425, centered: true, closable: true, open: true, onCancel: onClose },
        react_1.default.createElement(DailyItemSoldContent_1.DailyItemSoldContent, { dailyItemSoldSummary: dailyItemSoldSummary, branch: branch, branchMachine: branchMachine, user: user, isForPrint: isForPrint }),
        react_1.default.createElement("div", { dangerouslySetInnerHTML: { __html: htmlPdf }, style: { display: 'none' } })));
};
exports.ViewDailyItemSoldModal = ViewDailyItemSoldModal;
