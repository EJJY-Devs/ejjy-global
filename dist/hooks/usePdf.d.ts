import { HTMLOptions, jsPDFOptions } from 'jspdf';
import { MutableRefObject } from 'react';
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
    continuousPage?: boolean;
};
declare const usePdf: ({ title, container, print, jsPdfSettings, htmlOptions, image, continuousPage, }: UsePDFProps) => {
    htmlPdf: string;
    isLoadingPdf: boolean;
    previewPdf: () => void;
    downloadPdf: () => void;
    pdfPreviewModal: import("react").JSX.Element;
};
export default usePdf;
