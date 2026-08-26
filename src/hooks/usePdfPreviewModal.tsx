import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PdfPreviewModal } from '../components/Printing';

type UsePdfPreviewModalProps = {
	title?: string;
	onDownload?: () => void;
};

/**
 * Holds the current PDF preview blob URL and renders an in-app modal for it.
 * Owns the blob URL lifecycle: revoking the previous URL whenever a new one is
 * shown and again when the modal closes, so we never leak object URLs.
 */
export const usePdfPreviewModal = ({
	title,
	onDownload,
}: UsePdfPreviewModalProps = {}) => {
	const [previewSrc, setPreviewSrc] = useState<string>('');
	// Track the live URL outside of state so revocation does not depend on a
	// re-render having flushed first.
	const previewSrcRef = useRef<string>('');

	const revokePrevious = useCallback(() => {
		if (previewSrcRef.current) {
			URL.revokeObjectURL(previewSrcRef.current);
			previewSrcRef.current = '';
		}
	}, []);

	const showPreview = useCallback(
		(blobUrl: string) => {
			revokePrevious();
			previewSrcRef.current = blobUrl;
			setPreviewSrc(blobUrl);
		},
		[revokePrevious],
	);

	const closePreview = useCallback(() => {
		setPreviewSrc('');
		revokePrevious();
	}, [revokePrevious]);

	// Revoke any live blob URL if the owning component unmounts while a preview
	// is still open (e.g. the parent modal is closed).
	useEffect(
		() => () => {
			if (previewSrcRef.current) {
				URL.revokeObjectURL(previewSrcRef.current);
			}
		},
		[],
	);

	const pdfPreviewModal = (
		<PdfPreviewModal
			open={!!previewSrc}
			src={previewSrc}
			title={title}
			onClose={closePreview}
			onDownload={onDownload}
		/>
	);

	return { showPreview, closePreview, pdfPreviewModal };
};

export default usePdfPreviewModal;
