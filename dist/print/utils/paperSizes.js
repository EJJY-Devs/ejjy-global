"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PDF_MARGIN_PX = exports.paperSizes = void 0;
exports.paperSizes = {
    RECEIPT: { format: [400, 2000], orientation: 'p' },
    A4_LENGTHWISE: { format: [397, 1123], orientation: 'p' },
    A4_CROSSWISE: { format: [794, 561], orientation: 'l' },
    A4_WHOLE_PORTRAIT: { format: [794, 1123], orientation: 'p' },
    A4_WHOLE_CROSSWISE: { format: [1123, 794], orientation: 'l' },
};
// usePdf's page margin, applied on every side of every page.
exports.PDF_MARGIN_PX = 10;
