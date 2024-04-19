import jsPDF, { jsPDFOptions } from 'jspdf';
import { useState } from 'react';

const TIMEOUT_MS = 2000;

const JSPDF_SETTINGS: jsPDFOptions = {
	orientation: 'p',
	unit: 'px',
	format: [400, 700],
	hotfixes: ['px_scaling'],
};

interface UsePDFProps {
	title?: string;
	print: () => string | (() => Promise<string>) | undefined;
	jsPdfSettings?: jsPDFOptions;
	image?: {
		src: string;
		x: number;
		y: number;
		w: number;
		h: number;
	};
}

const usePdf = ({ title = '', print, jsPdfSettings, image }: UsePDFProps) => {
	const [htmlPdf, setHtmlPdf] = useState<string>('');
	const [isLoadingPdf, setLoadingPdf] = useState<boolean>(false);

	const handlePdfAction = async (actionCallback: (pdf: jsPDF) => void) => {
		setLoadingPdf(true);

		const pdf = new jsPDF({ ...JSPDF_SETTINGS, ...jsPdfSettings });
		pdf.setProperties({ title });

		const dataHtml = print?.();

		if (dataHtml === undefined) {
			console.error('Print function returned undefined');
			setLoadingPdf(false);
			return;
		}

		const resolveDataHtml =
			typeof dataHtml === 'function' ? await dataHtml() : dataHtml;

		setHtmlPdf(resolveDataHtml);
		if (image) {
			const img = new Image();
			img.onload = () =>
				addImageToPdf(img, pdf, resolveDataHtml, actionCallback);
			img.onerror = () => {
				console.error('Failed to load image');
				setLoadingPdf(false);
			};
			img.src = image.src;
		} else {
			performPdfOperation(pdf, resolveDataHtml, actionCallback);
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
