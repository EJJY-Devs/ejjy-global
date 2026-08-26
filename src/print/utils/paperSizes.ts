import { jsPDFOptions } from 'jspdf';

// Client paper spec, in CSS px @ 96dpi, derived from true A4 = 794 x 1123 px.
// These presets are meant to be spread into usePdf's `jsPdfSettings` so a
// consumer opts a given document onto a real paper size instead of the hook's
// legacy [400 x 2000] receipt-ish default (which every un-opted caller keeps).
//
//   RECEIPT            → thermal-roll-width default (preserves old behavior)
//   A4_LENGTHWISE      → A4 cut along its long edge  (105 x 297 mm) — tall/narrow
//   A4_CROSSWISE       → A4 cut along its short edge (210 x 148.5 mm) — short/wide
//   A4_WHOLE_PORTRAIT  → true A4 portrait
//   A4_WHOLE_CROSSWISE → true A4 landscape (wide tables)
//
// Note: paginated jsPDF `pdf.html()` output does NOT shrink-to-fit width, so
// content wider than a preset's format width is clipped. Keep each document's
// content width (see appendHtmlElement) at or under the format width. For WIDE,
// fixed-width layouts that must land on a single page (the BIR annex reports),
// use renderA4SinglePagePdf instead — it rasterizes and shrinks to fit.
export type PaperSetting = Required<
	Pick<jsPDFOptions, 'format' | 'orientation'>
>;

export const paperSizes: Record<string, PaperSetting> = {
	RECEIPT: { format: [400, 2000], orientation: 'p' },
	A4_LENGTHWISE: { format: [397, 1123], orientation: 'p' },
	A4_CROSSWISE: { format: [794, 561], orientation: 'l' },
	A4_WHOLE_PORTRAIT: { format: [794, 1123], orientation: 'p' },
	A4_WHOLE_CROSSWISE: { format: [1123, 794], orientation: 'l' },
};
