type EscPosToHtmlOptions = {
    widthPx?: number;
    pageHeightPx?: number;
};
/**
 * Converts a native (ESC/POS) template's commands into a standalone HTML
 * document (see appendHtmlElement) for usePdf, laid out exactly as the
 * thermal printer prints it.
 */
export declare const escPosToHtml: (commands: string[], { widthPx, pageHeightPx }?: EscPosToHtmlOptions) => string;
export {};
