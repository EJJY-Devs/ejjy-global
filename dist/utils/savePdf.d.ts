import type jsPDF from 'jspdf';
/**
 * Save a generated jsPDF document, letting the user pick the destination
 * folder when the browser/Electron build supports the File System Access API.
 * Falls back to the classic anchor download (straight to Downloads) when the
 * picker is unavailable, cancelled-via-error, or otherwise fails.
 */
export declare const savePdf: (pdf: jsPDF, fileName: string) => Promise<void>;
