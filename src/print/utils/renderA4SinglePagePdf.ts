import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// True A4 page size at 96dpi (210mm x 297mm). Ported from ejjy-backoffice's
// src/screens/Shared/Accounting/printing/renderA4SinglePagePdf.ts, which
// already solved the "A4 content overflows to a second page" bug there —
// this is the same fix, made available to every A4-whole/A4CW PF D item
// that lives in ejjy-global (the BIR-family reports) instead of being
// duplicated locally.
export const PDF_PAGE_WIDTH_PX = 794;
export const PDF_PAGE_HEIGHT_PX = 1123;
export const PDF_WRAPPER_WIDTH_PX = 714;
export const PDF_WRAPPER_PADDING_PX = 32;

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
 */
export const renderA4SinglePagePdf = async ({
	html,
	title,
	widthPx = PDF_WRAPPER_WIDTH_PX,
}: {
	html: string;
	title: string;
	widthPx?: number;
}): Promise<jsPDF> => {
	const container = document.createElement('div');
	container.style.position = 'fixed';
	container.style.top = '0';
	container.style.left = '-100000px';
	container.style.width = `${widthPx}px`;
	container.style.background = '#ffffff';
	container.innerHTML = html;
	document.body.appendChild(container);

	try {
		if (document.fonts?.ready) {
			await document.fonts.ready;
		}

		const canvas = await html2canvas(container, {
			scale: RENDER_SCALE,
			backgroundColor: '#ffffff',
			useCORS: true,
		});

		const contentWidthPx = canvas.width / RENDER_SCALE;
		const contentHeightPx = canvas.height / RENDER_SCALE;

		const maxWidth = PDF_PAGE_WIDTH_PX - PDF_MARGIN_PX * 2;
		const maxHeight = PDF_PAGE_HEIGHT_PX - PDF_MARGIN_PX * 2;

		const fitScale = Math.min(
			maxWidth / contentWidthPx,
			maxHeight / contentHeightPx,
			1,
		);

		const renderWidth = contentWidthPx * fitScale;
		const renderHeight = contentHeightPx * fitScale;
		const x = Math.max(0, (PDF_PAGE_WIDTH_PX - renderWidth) / 2);
		const y = PDF_MARGIN_PX;

		const pdf = new jsPDF({
			orientation: 'p',
			unit: 'px',
			format: [PDF_PAGE_WIDTH_PX, PDF_PAGE_HEIGHT_PX],
			putOnlyUsedFonts: true,
		});
		pdf.setProperties({ title });
		pdf.addImage(canvas, 'PNG', x, y, renderWidth, renderHeight);

		return pdf;
	} finally {
		document.body.removeChild(container);
	}
};
