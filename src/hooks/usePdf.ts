import jsPDF, { HTMLOptions, jsPDFOptions } from 'jspdf';
import { MutableRefObject, useState } from 'react';

const TIMEOUT_MS = 3000;

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

	const handlePdfAction = async (actionCallback: (pdf: jsPDF) => void) => {
		setLoadingPdf(true);

		try {
			// Correctly resolving the type of dataHtml here.
			const dataHtml = typeof print === 'function' ? print() : undefined;

			if (dataHtml instanceof Promise) {
				// If dataHtml is a Promise, await it.
				const resolvedDataHtml = await dataHtml;
				if (resolvedDataHtml) {
					performPdfOperation(resolvedDataHtml, actionCallback);
				}
			} else if (typeof dataHtml === 'string') {
				// If dataHtml is a string, process it directly.
				performPdfOperation(dataHtml, actionCallback);
			}
		} catch (error) {
			console.error(error);
			setLoadingPdf(false);
		}
	};

	const performPdfOperation = (
		dataHtml: string,
		callback: (instance: jsPDF) => void,
	) => {
		setHtmlPdf(dataHtml);
		console.log('dataHtml', dataHtml);

		setTimeout(() => {
			if (container?.containerRef?.current) {
				const width =
					(container?.containerRef?.current.offsetWidth || FORMAT_WIDTH) *
					(container.widthMultiplier || 1);
				const height =
					(container?.containerRef?.current.offsetHeight || FORMAT_HEIGHT) *
					(container.heightMultiplier || 1);

				JSPDF_SETTINGS.format = [width, height];

				console.log(container.containerRef?.current);

				console.log(JSPDF_SETTINGS.format);
			}

			const pdf = new jsPDF({ ...JSPDF_SETTINGS, ...jsPdfSettings });
			pdf.setProperties({ title });

			if (image) {
				pdf.addImage(image!.src, 'png', image!.x, image!.y, image!.w, image!.h);
			}

			pdf.html(dataHtml, {
				margin: 20,
				x: 10,
				y: 10,
				...htmlOptions,
				callback: (instance) => {
					callback(instance);
					setLoadingPdf(false);
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
