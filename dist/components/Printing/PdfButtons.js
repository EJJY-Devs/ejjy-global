"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfButtons = void 0;
const icons_1 = require("@ant-design/icons");
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
const globals_1 = require("../../globals");
const PdfButtons = ({ downloadPdf, isDisabled, isLoading, previewPdf, }) => (react_1.default.createElement(antd_1.Dropdown, { className: "ml-2", disabled: isDisabled, menu: {
        items: [
            {
                label: 'Preview',
                key: globals_1.pdfButtonsKey.PREVIEW,
                icon: react_1.default.createElement(icons_1.FilePdfOutlined, null),
            },
            {
                label: 'Download',
                key: globals_1.pdfButtonsKey.DOWNLOAD,
                icon: react_1.default.createElement(icons_1.DownloadOutlined, null),
            },
        ],
        onClick: (item) => {
            if (item.key === globals_1.pdfButtonsKey.PREVIEW) {
                previewPdf();
            }
            else if (item.key === globals_1.pdfButtonsKey.DOWNLOAD) {
                downloadPdf();
            }
        },
    } },
    react_1.default.createElement(antd_1.Button, { loading: isLoading, type: "primary" },
        react_1.default.createElement(icons_1.PrinterOutlined, null),
        "PDF",
        react_1.default.createElement(icons_1.DownOutlined, { className: "pl-2" }))));
exports.PdfButtons = PdfButtons;
