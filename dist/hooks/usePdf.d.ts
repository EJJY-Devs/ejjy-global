import { HTMLOptions, jsPDFOptions } from 'jspdf';
import { MutableRefObject } from 'react';
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
declare const usePdf: ({ title, container, print, jsPdfSettings, htmlOptions, image, }: UsePDFProps) => {
    htmlPdf: string;
    isLoadingPdf: boolean;
    previewPdf: () => void;
    downloadPdf: () => void;
};
export default usePdf;
