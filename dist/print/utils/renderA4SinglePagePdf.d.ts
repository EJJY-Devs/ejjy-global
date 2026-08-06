import jsPDF from 'jspdf';
export declare const PDF_PAGE_WIDTH_PX = 794;
export declare const PDF_PAGE_HEIGHT_PX = 1123;
export declare const PDF_WRAPPER_WIDTH_PX = 714;
export declare const PDF_WRAPPER_PADDING_PX = 32;
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
 */
export declare const renderA4SinglePagePdf: ({ html, title, widthPx, }: {
    html: string;
    title: string;
    widthPx?: number | undefined;
}) => Promise<jsPDF>;
