import jsPDF, { jsPDFOptions } from 'jspdf';
type UsePDFProps = {
    title?: string;
    print: ((pdf: jsPDF) => string | undefined) | ((pdf: jsPDF) => Promise<string | undefined>);
    jsPdfSettings?: jsPDFOptions;
    image?: {
        src: string;
        x: number;
        y: number;
        w: number;
        h: number;
    };
};
declare const usePdf: ({ title, print, jsPdfSettings, image }: UsePDFProps) => {
    htmlPdf: string;
    isLoadingPdf: boolean;
    previewPdf: () => void;
    downloadPdf: () => void;
};
export default usePdf;
