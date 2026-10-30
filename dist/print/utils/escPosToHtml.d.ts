type EscPosToHtmlOptions = {
    widthPx?: number;
};
/**
 * Converts a native (ESC/POS) template's commands into a standalone HTML
 * document (see appendHtmlElement) for usePdf, laid out exactly as the
 * thermal printer prints it. Pair it with usePdf's `continuousPage` so a long
 * document stays on one page, like the printed roll.
 */
export declare const escPosToHtml: (commands: string[], { widthPx }?: EscPosToHtmlOptions) => string;
export {};
