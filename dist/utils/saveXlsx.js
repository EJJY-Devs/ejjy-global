"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveXlsx = void 0;
const ensureXlsxExtension = (fileName) => fileName.toLowerCase().endsWith('.xlsx') ? fileName : `${fileName}.xlsx`;
/**
 * Trigger a browser download for a generated Excel workbook.
 *
 * Uses a plain anchor download on purpose: in Electron's renderer the host
 * app's main process intercepts it with a native "Save As" dialog (see
 * savePdf), and it behaves the same in regular browsers.
 */
const saveXlsx = (blob, fileName) => {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = ensureXlsxExtension(fileName || 'Document');
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    // Revoking synchronously can cancel the download in some Electron/Chromium
    // versions before it has been handed to the download manager.
    setTimeout(() => URL.revokeObjectURL(url), 1000);
};
exports.saveXlsx = saveXlsx;
