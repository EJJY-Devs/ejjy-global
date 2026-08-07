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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderA4SinglePagePdf = exports.PDF_WRAPPER_PADDING_PX = exports.PDF_WRAPPER_WIDTH_PX = exports.PDF_PAGE_HEIGHT_PX = exports.PDF_PAGE_WIDTH_PX = void 0;
const html2canvas_1 = __importDefault(require("html2canvas"));
const jspdf_1 = __importDefault(require("jspdf"));
// True A4 page size at 96dpi (210mm x 297mm). Ported from ejjy-backoffice's
// src/screens/Shared/Accounting/printing/renderA4SinglePagePdf.ts, which
// already solved the "A4 content overflows to a second page" bug there —
// this is the same fix, made available to every A4-whole/A4CW PF D item
// that lives in ejjy-global (the BIR-family reports) instead of being
// duplicated locally.
exports.PDF_PAGE_WIDTH_PX = 794;
exports.PDF_PAGE_HEIGHT_PX = 1123;
exports.PDF_WRAPPER_WIDTH_PX = 714;
exports.PDF_WRAPPER_PADDING_PX = 32;
const PDF_MARGIN_PX = 20;
// Supersample the capture so scaled-down text/lines stay crisp.
const RENDER_SCALE = 2;
/**
 * Rasterizes the given HTML and places it on a single A4 page, shrinking
 * (never enlarging) it as needed so it always fits within one page instead
 * of being cut off or split across pages.
 *
 * @param widthPx  Width (in CSS px) of the off-screen container the HTML is
 *   rendered into before capture. Defaults to a portrait A4-ish content
 *   width; pass the content's actual natural width for wide layouts (e.g.
 *   the BIR reports' ~2000px tables) so nothing is squeezed or clipped
 *   during capture — the fit-to-page scaling below shrinks the resulting
 *   image down to one page regardless of how wide this is.
 * @param orientation  'p' (default) targets A4 portrait (794 x 1123); 'l'
 *   targets A4 landscape / "crosswise" (1123 x 794). Wide reports (the BIR
 *   annex transaction lists — E2 SC, E3 PWD, E4 NAAC, E5 Solo Parent) stay
 *   far more legible shrunk onto landscape than portrait, so pass 'l' for
 *   those; the portrait E1 summary keeps the default.
 */
const renderA4SinglePagePdf = ({ html, title, widthPx = exports.PDF_WRAPPER_WIDTH_PX, orientation = 'p', }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Page dimensions follow the requested orientation: portrait keeps A4's
    // natural 794 x 1123; landscape swaps to 1123 x 794.
    const pageWidth = orientation === 'l' ? exports.PDF_PAGE_HEIGHT_PX : exports.PDF_PAGE_WIDTH_PX;
    const pageHeight = orientation === 'l' ? exports.PDF_PAGE_WIDTH_PX : exports.PDF_PAGE_HEIGHT_PX;
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '-100000px';
    container.style.width = `${widthPx}px`;
    container.style.background = '#ffffff';
    container.innerHTML = html;
    document.body.appendChild(container);
    try {
        if ((_a = document.fonts) === null || _a === void 0 ? void 0 : _a.ready) {
            yield document.fonts.ready;
        }
        const canvas = yield (0, html2canvas_1.default)(container, {
            scale: RENDER_SCALE,
            backgroundColor: '#ffffff',
            useCORS: true,
        });
        const contentWidthPx = canvas.width / RENDER_SCALE;
        const contentHeightPx = canvas.height / RENDER_SCALE;
        const maxWidth = pageWidth - PDF_MARGIN_PX * 2;
        const maxHeight = pageHeight - PDF_MARGIN_PX * 2;
        const fitScale = Math.min(maxWidth / contentWidthPx, maxHeight / contentHeightPx, 1);
        const renderWidth = contentWidthPx * fitScale;
        const renderHeight = contentHeightPx * fitScale;
        const x = Math.max(0, (pageWidth - renderWidth) / 2);
        const y = PDF_MARGIN_PX;
        const pdf = new jspdf_1.default({
            orientation,
            unit: 'px',
            format: [pageWidth, pageHeight],
            putOnlyUsedFonts: true,
        });
        pdf.setProperties({ title });
        pdf.addImage(canvas, 'PNG', x, y, renderWidth, renderHeight);
        return pdf;
    }
    finally {
        document.body.removeChild(container);
    }
});
exports.renderA4SinglePagePdf = renderA4SinglePagePdf;
