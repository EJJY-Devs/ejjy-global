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
	const [htmlPdf, setHtmlPdf] = useState('');
	const [isLoadingPdf, setLoadingPdf] = useState(false);

	const previewPdf = () => {
		setLoadingPdf(true);

		const pdf = new jsPDF({ ...JSPDF_SETTINGS, ...jsPdfSettings });
		pdf.setProperties({ title });

		const dataHtml = print?.();
		if (typeof dataHtml === 'string') {
			setHtmlPdf(dataHtml);

			if (image) {
				const img = new Image();
				img.src = image.src;
				pdf.addImage(img, 'png', image.x, image.y, image.w, image.h);
			}

			setTimeout(() => {
				pdf.html(dataHtml, {
					margin: 10,
					callback: (instance) => {
						window.open(instance.output('bloburl').toString());
						setLoadingPdf(false);
						setHtmlPdf('');
					},
				});
			}, TIMEOUT_MS);
		}
	};

	const downloadPdf = () => {
		setLoadingPdf(true);

		const pdf = new jsPDF({ ...JSPDF_SETTINGS, ...jsPdfSettings });
		pdf.setProperties({ title });

		const dataHtml = print?.();
		if (typeof dataHtml === 'string') {
			setHtmlPdf(dataHtml);

			if (image) {
				const img = new Image();
				img.src = image.src;
				pdf.addImage(img, 'png', image.x, image.y, image.w, image.h);
			}

			setTimeout(() => {
				pdf.html(dataHtml, {
					margin: 10,
					callback: (instance: jsPDF) => {
						instance.save(title);
						setLoadingPdf(false);
						setHtmlPdf('');
					},
				});
			}, TIMEOUT_MS);
		}
	};

	return {
		htmlPdf,
		isLoadingPdf,
		previewPdf,
		downloadPdf,
	};
};

export default usePdf;
