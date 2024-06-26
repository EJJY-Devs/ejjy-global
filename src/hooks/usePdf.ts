import jsPDF, { jsPDFOptions } from 'jspdf';
import { useState } from 'react';

const TIMEOUT_MS = 2000;

const JSPDF_SETTINGS: jsPDFOptions = {
	orientation: 'p',
	unit: 'px',
	format: [400, 2000],
	hotfixes: ['px_scaling'],
};

type UsePDFProps = {
	title?: string;
	print: (() => string | undefined) | (() => Promise<string | undefined>);
	jsPdfSettings?: jsPDFOptions;
	image?: {
		src: string;
		x: number;
		y: number;
		w: number;
		h: number;
	};
};

const usePdf = ({ title = '', print, jsPdfSettings, image }: UsePDFProps) => {
	const [htmlPdf, setHtmlPdf] = useState<string>('');
	const [isLoadingPdf, setLoadingPdf] = useState<boolean>(false);

	const handlePdfAction = async (actionCallback: (pdf: jsPDF) => void) => {
		setLoadingPdf(true);

		const pdf = new jsPDF({ ...JSPDF_SETTINGS, ...jsPdfSettings });
		pdf.setProperties({ title });

		try {
			// Correctly resolving the type of dataHtml here.
			const dataHtml = typeof print === 'function' ? print() : undefined;

			if (dataHtml instanceof Promise) {
				// If dataHtml is a Promise, await it.
				const resolvedDataHtml = await dataHtml;
				if (resolvedDataHtml) {
					processPdfData(pdf, resolvedDataHtml, actionCallback);
				}
			} else if (typeof dataHtml === 'string') {
				// If dataHtml is a string, process it directly.
				processPdfData(pdf, dataHtml, actionCallback);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoadingPdf(false);
		}
	};

	const processPdfData = (
		pdf: jsPDF,
		dataHtml: string,
		callback: (instance: jsPDF) => void,
	) => {
		console.log('dataHtml', dataHtml);
		setHtmlPdf(dataHtml);
		if (image) {
			const img = new Image();
			img.onload = () => addImageToPdf(img, pdf, dataHtml, callback);
			img.onerror = () => {
				console.error('Failed to load image');
				setLoadingPdf(false);
			};
			img.src = image.src;
		} else {
			performPdfOperation(pdf, dataHtml, callback);
		}
	};

	const addImageToPdf = (
		img: HTMLImageElement,
		pdf: jsPDF,
		dataHtml: string,
		callback: (instance: jsPDF) => void,
	) => {
		pdf.addImage(img, 'png', image!.x, image!.y, image!.w, image!.h);
		performPdfOperation(pdf, dataHtml, callback);
	};

	const performPdfOperation = (
		pdf: jsPDF,
		dataHtml: string,
		callback: (instance: jsPDF) => void,
	) => {
		setTimeout(() => {
			pdf.html(dataHtml, {
				margin: 10,
				callback: (instance) => {
					callback(instance);
					setLoadingPdf(false);
					setHtmlPdf('');
				},
			});
		}, TIMEOUT_MS);
	};

	const previewPdf = () => {
		handlePdfAction((pdf) => window.open(pdf.output('bloburl').toString()));
	};

	const downloadPdf = () => {
		handlePdfAction((pdf) => pdf.save(title || 'Document'));
	};

	return {
		htmlPdf,
		isLoadingPdf,
		previewPdf,
		downloadPdf,
	};
};

export default usePdf;
