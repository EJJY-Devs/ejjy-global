import { jsPDFOptions } from 'jspdf';
import { MutableRefObject } from 'react';
type UsePDFProps = {
    containerRef?: MutableRefObject<HTMLDivElement>;
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
declare const usePdf: ({ title, containerRef, print, jsPdfSettings, image, }: UsePDFProps) => {
    htmlPdf: string;
    isLoadingPdf: boolean;
    previewPdf: () => void;
    downloadPdf: () => void;
};
export default usePdf;
