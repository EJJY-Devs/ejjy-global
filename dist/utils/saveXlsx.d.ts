/**
 * Trigger a browser download for a generated Excel workbook.
 *
 * Uses a plain anchor download on purpose: in Electron's renderer the host
 * app's main process intercepts it with a native "Save As" dialog (see
 * savePdf), and it behaves the same in regular browsers.
 */
export declare const saveXlsx: (blob: Blob, fileName: string) => void;
