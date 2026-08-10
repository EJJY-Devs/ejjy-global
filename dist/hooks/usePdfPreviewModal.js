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
exports.usePdfPreviewModal = void 0;
const react_1 = __importStar(require("react"));
const Printing_1 = require("../components/Printing");
/**
 * Holds the current PDF preview blob URL and renders an in-app modal for it.
 * Owns the blob URL lifecycle: revoking the previous URL whenever a new one is
 * shown and again when the modal closes, so we never leak object URLs.
 */
const usePdfPreviewModal = ({ title, onDownload, } = {}) => {
    const [previewSrc, setPreviewSrc] = (0, react_1.useState)('');
    // Track the live URL outside of state so revocation does not depend on a
    // re-render having flushed first.
    const previewSrcRef = (0, react_1.useRef)('');
    const revokePrevious = (0, react_1.useCallback)(() => {
        if (previewSrcRef.current) {
            URL.revokeObjectURL(previewSrcRef.current);
            previewSrcRef.current = '';
        }
    }, []);
    const showPreview = (0, react_1.useCallback)((blobUrl) => {
        revokePrevious();
        previewSrcRef.current = blobUrl;
        setPreviewSrc(blobUrl);
    }, [revokePrevious]);
    const closePreview = (0, react_1.useCallback)(() => {
        setPreviewSrc('');
        revokePrevious();
    }, [revokePrevious]);
    // Revoke any live blob URL if the owning component unmounts while a preview
    // is still open (e.g. the parent modal is closed).
    (0, react_1.useEffect)(() => () => {
        if (previewSrcRef.current) {
            URL.revokeObjectURL(previewSrcRef.current);
        }
    }, []);
    const pdfPreviewModal = (react_1.default.createElement(Printing_1.PdfPreviewModal, { open: !!previewSrc, src: previewSrc, title: title, onClose: closePreview, onDownload: onDownload }));
    return { showPreview, closePreview, pdfPreviewModal };
};
exports.usePdfPreviewModal = usePdfPreviewModal;
exports.default = exports.usePdfPreviewModal;
