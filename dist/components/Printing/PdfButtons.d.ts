import React from 'react';
interface Props {
    downloadPdf: () => void;
    isDisabled?: boolean;
    isLoading?: boolean;
    previewPdf: () => void;
}
export declare const PdfButtons: ({ downloadPdf, isDisabled, isLoading, previewPdf, }: Props) => React.JSX.Element;
export {};
