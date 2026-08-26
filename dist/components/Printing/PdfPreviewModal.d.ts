import React from 'react';
type Props = {
    src: string;
    title?: string;
    open: boolean;
    onClose: () => void;
    onDownload?: () => void;
};
export declare const PdfPreviewModal: ({ src, title, open, onClose, onDownload, }: Props) => React.JSX.Element;
export {};
