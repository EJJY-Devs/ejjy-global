import jsPDF, { HTMLOptions, jsPDFOptions } from 'jspdf';
import { MutableRefObject, useRef, useState } from 'react';
import { message } from 'antd';
import { savePdf } from '../utils';
import usePdfPreviewModal from './usePdfPreviewModal';

const FORMAT_WIDTH = 400;
const FORMAT_HEIGHT = 2000;

const JSPDF_SETTINGS: jsPDFOptions = {
	orientation: 'p',
	unit: 'px',
	hotfixes: ['px_scaling'],
	format: [FORMAT_WIDTH, FORMAT_HEIGHT],
};

type ContainerProps = {
	containerRef?: MutableRefObject<HTMLDivElement>;
	heightAdd?: number;
	widthAdd?: number;
	heightMultiplier?: number;
	widthMultiplier?: number;
};

type UsePDFProps = {
	container?: ContainerProps;
	title?: string;
	print: (() => string | undefined) | (() => Promise<string | undefined>);
	jsPdfSettings?: jsPDFOptions;
	htmlOptions?: HTMLOptions;
	image?: {
		src: string;
		x: number;
		y: number;
		w: number;
		h: number;
	};
};

const usePdf = ({
	title = '',
	container,
	print,
	jsPdfSettings,
	htmlOptions,
	image,
}: UsePDFProps) => {
	const [htmlPdf, setHtmlPdf] = useState<string>('');
	const [isLoadingPdf, setLoadingPdf] = useState<boolean>(false);
	// Keep the most recently generated document so the preview modal's Download
	// button can reuse it (preserving the user gesture the folder picker needs)
	// instead of regenerating the PDF.
	const lastPdfRef = useRef<jsPDF | null>(null);

	const handlePdfAction = async (actionCallback: (pdf: jsPDF) => void) => {
		setLoadingPdf(true);

		try {
			// Correctly resolving the type of dataHtml here.
			const dataHtml = typeof print === 'function' ? print() : undefined;

			if (dataHtml instanceof Promise) {
				const resolvedDataHtml = await dataHtml;
				if (resolvedDataHtml) {
					performPdfOperation(resolvedDataHtml, actionCallback);
				} else {
					setLoadingPdf(false);
				}
			} else if (typeof dataHtml === 'string') {
				performPdfOperation(dataHtml, actionCallback);
			} else {
				setLoadingPdf(false);
			}
		} catch (error) {
			console.error(error);
			setLoadingPdf(false);
		}
	};

	const performPdfOperation = async (
		dataHtml: string,
		callback: (instance: jsPDF) => void,
	) => {
		setHtmlPdf(dataHtml);

		try {
			// setHtmlPdf() only schedules the re-render that fills containerRef via
			// dangerouslySetInnerHTML; wait for it to actually paint (double rAF) and
			// for webfonts to finish loading before measuring the container/snapshotting
			// it with html2canvas, otherwise we read stale dimensions or mismeasured text.
			await new Promise<void>((resolve) => {
				requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
			});
			if (document.fonts?.ready) {
				await document.fonts.ready;
			}

			if (container?.containerRef?.current) {
				const width =
					((container?.containerRef?.current.offsetWidth || FORMAT_WIDTH) +
						(container?.widthAdd || 0)) *
					(container.widthMultiplier || 1);
				const height =
					((container?.containerRef?.current.offsetHeight || FORMAT_HEIGHT) +
						(container?.heightAdd || 0)) *
					(container.heightMultiplier || 1);

				JSPDF_SETTINGS.format = [width, height];
				JSPDF_SETTINGS.orientation = width > height ? 'l' : 'p';
			}

			const pdf = new jsPDF({ ...JSPDF_SETTINGS, ...jsPdfSettings });
			pdf.setProperties({ title });

			if (image) {
				pdf.addImage(image!.src, 'png', image!.x, image!.y, image!.w, image!.h);
			}

			await pdf.html(dataHtml, {
				margin: 10,
				...htmlOptions,
				callback,
			});
		} catch (error) {
			console.error(error);
			message.error('Failed to generate the PDF. Please try again.');
		} finally {
			setLoadingPdf(false);
		}
	};

	// savePdf appends ".pdf" itself, so we pass the raw title here.
	const getFilename = () => title || 'Document';

	const downloadPdf = () => {
		handlePdfAction((pdf) => {
			lastPdfRef.current = pdf;
			void savePdf(pdf, getFilename());
		});
	};

	// Reuse the already-generated document when the user hits Download from
	// inside the preview modal — this keeps the click's user activation intact
	// for the folder picker and avoids re-rendering the PDF.
	const handlePreviewDownload = () => {
		if (lastPdfRef.current) {
			void savePdf(lastPdfRef.current, getFilename());
		} else {
			downloadPdf();
		}
	};

	const { showPreview, pdfPreviewModal } = usePdfPreviewModal({
		title,
		onDownload: handlePreviewDownload,
	});

	const previewPdf = () => {
		// Render the PDF into an in-app modal instead of a new browser tab. A
		// blob URL opened via window.open() after the async generation work is
		// no longer inside the original user gesture, so popup blockers (and the
		// packaged Electron shell) swallow it. An iframe inside a modal has no
		// such restriction.
		handlePdfAction((pdf) => {
			lastPdfRef.current = pdf;
			showPreview(pdf.output('bloburl').toString());
		});
	};

	return {
		htmlPdf,
		isLoadingPdf,
		previewPdf,
		downloadPdf,
		pdfPreviewModal,
	};
};

export default usePdf;
