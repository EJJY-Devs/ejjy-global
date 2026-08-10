"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfPreviewModal = void 0;
const icons_1 = require("@ant-design/icons");
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
const PdfPreviewModal = ({ src, title = 'PDF Preview', open, onClose, onDownload, }) => (react_1.default.createElement(antd_1.Modal, { bodyStyle: { padding: 0, height: '80vh' }, footer: onDownload
        ? [
            react_1.default.createElement(antd_1.Button, { key: "download", icon: react_1.default.createElement(icons_1.DownloadOutlined, null), type: "primary", onClick: onDownload }, "Download"),
        ]
        : null, title: title, width: 900, centered: true, destroyOnClose: true, open: open, onCancel: onClose }, src ? (react_1.default.createElement("iframe", { src: src, style: { width: '100%', height: '100%', border: 'none' }, title: title })) : null));
exports.PdfPreviewModal = PdfPreviewModal;
