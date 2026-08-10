import type jsPDF from 'jspdf';

// Minimal typings for the File System Access API. It is not in every TS DOM
// lib version we build against, so we declare just the slice we use instead of
// depending on the ambient types.
type FileSystemWritable = {
	write: (data: Blob) => Promise<void>;
	close: () => Promise<void>;
};

type SaveFileHandle = {
	createWritable: () => Promise<FileSystemWritable>;
};

type ShowSaveFilePicker = (options?: {
	suggestedName?: string;
	types?: {
		description?: string;
		accept: Record<string, string[]>;
	}[];
}) => Promise<SaveFileHandle>;

const ensurePdfExtension = (fileName: string): string =>
	fileName.toLowerCase().endsWith('.pdf') ? fileName : `${fileName}.pdf`;

const anchorDownload = (blob: Blob, fileName: string) => {
	const url = URL.createObjectURL(blob);
	const anchor = document.createElement('a');
	anchor.href = url;
	anchor.download = fileName;
	document.body.appendChild(anchor);
	anchor.click();
	anchor.remove();
	URL.revokeObjectURL(url);
};

/**
 * Save a generated jsPDF document, letting the user pick the destination
 * folder when the browser/Electron build supports the File System Access API.
 * Falls back to the classic anchor download (straight to Downloads) when the
 * picker is unavailable, cancelled-via-error, or otherwise fails.
 */
export const savePdf = async (pdf: jsPDF, fileName: string): Promise<void> => {
	const safeName = ensurePdfExtension(fileName || 'Document');
	const blob = pdf.output('blob') as Blob;

	const showSaveFilePicker = (
		window as unknown as { showSaveFilePicker?: ShowSaveFilePicker }
	).showSaveFilePicker;

	if (typeof showSaveFilePicker === 'function') {
		try {
			const handle = await showSaveFilePicker({
				suggestedName: safeName,
				types: [
					{
						description: 'PDF file',
						accept: { 'application/pdf': ['.pdf'] },
					},
				],
			});

			const writable = await handle.createWritable();
			await writable.write(blob);
			await writable.close();
			return;
		} catch (error) {
			// The user dismissed the folder picker — treat it as a no-op, not a
			// failure, and do not fall back to a silent Downloads-folder dump.
			if ((error as DOMException)?.name === 'AbortError') {
				return;
			}
			// Any other failure (unsupported context, lost user activation,
			// permission denied, …) falls through to the anchor download below.
		}
	}

	anchorDownload(blob, safeName);
};
