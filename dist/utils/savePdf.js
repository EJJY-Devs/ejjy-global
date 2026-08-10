"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.savePdf = void 0;
const ensurePdfExtension = (fileName) => fileName.toLowerCase().endsWith('.pdf') ? fileName : `${fileName}.pdf`;
const anchorDownload = (blob, fileName) => {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
};
/**
 * Save a generated jsPDF document, letting the user pick the destination
 * folder when the browser/Electron build supports the File System Access API.
 * Falls back to the classic anchor download (straight to Downloads) when the
 * picker is unavailable, cancelled-via-error, or otherwise fails.
 */
const savePdf = (pdf, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    const safeName = ensurePdfExtension(fileName || 'Document');
    const blob = pdf.output('blob');
    const showSaveFilePicker = window.showSaveFilePicker;
    if (typeof showSaveFilePicker === 'function') {
        try {
            const handle = yield showSaveFilePicker({
                suggestedName: safeName,
                types: [
                    {
                        description: 'PDF file',
                        accept: { 'application/pdf': ['.pdf'] },
                    },
                ],
            });
            const writable = yield handle.createWritable();
            yield writable.write(blob);
            yield writable.close();
            return;
        }
        catch (error) {
            // The user dismissed the folder picker — treat it as a no-op, not a
            // failure, and do not fall back to a silent Downloads-folder dump.
            if ((error === null || error === void 0 ? void 0 : error.name) === 'AbortError') {
                return;
            }
            // Any other failure (unsupported context, lost user activation,
            // permission denied, …) falls through to the anchor download below.
        }
    }
    anchorDownload(blob, safeName);
});
exports.savePdf = savePdf;
