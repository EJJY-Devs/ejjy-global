import React from 'react';
type UsePdfPreviewModalProps = {
    title?: string;
    onDownload?: () => void;
};
/**
 * Holds the current PDF preview blob URL and renders an in-app modal for it.
 * Owns the blob URL lifecycle: revoking the previous URL whenever a new one is
 * shown and again when the modal closes, so we never leak object URLs.
 */
export declare const usePdfPreviewModal: ({ title, onDownload, }?: UsePdfPreviewModalProps) => {
    showPreview: (blobUrl: string) => void;
    closePreview: () => void;
    pdfPreviewModal: React.JSX.Element;
};
export default usePdfPreviewModal;
