"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escPosToHtml = void 0;
const helper_escpos_1 = require("../helper-escpos");
const helper_receipt_1 = require("../helper-receipt");
// Renders the ESC/POS command stream a `.native.ts` template sends to the
// thermal printer as HTML, so a PDF of a document is a replica of its
// printout instead of a separately maintained `.html.tsx` layout that drifts
// from it. The output is a fixed PAPER_CHARACTER_WIDTH-column monospace grid:
// jsPDF draws `Courier New`/`monospace` with its built-in Courier, which has
// the same 0.6em advance, so every padded column survives into the PDF.
const ESC = '\x1B';
const GS = '\x1D';
const FONT_SIZE_PX = 15;
const LINE_HEIGHT_PX = 18;
const DEFAULT_STYLE = { bold: false, underline: false, scale: 1 };
const ALIGNMENTS = ['left', 'center', 'right'];
// ESC/POS parameters may be sent either as raw bytes (0x00, 0x01) or as ASCII
// digits ('0', '1'); both mean the same thing.
const toParam = (char) => {
    const code = char ? char.charCodeAt(0) : 0;
    return code >= 0x30 && code <= 0x39 ? code - 0x30 : code;
};
const appendChar = (segments, style, char) => {
    const last = segments[segments.length - 1];
    if (last &&
        last.bold === style.bold &&
        last.underline === style.underline &&
        last.scale === style.scale) {
        last.text += char;
    }
    else {
        segments.push(Object.assign(Object.assign({}, style), { text: char }));
    }
};
const parseCommands = (commands) => {
    const data = commands.join('');
    const lines = [];
    let align = 'left';
    let style = Object.assign({}, DEFAULT_STYLE);
    // Like the printer, a line takes the alignment in effect when its first
    // character is printed, so the line is only opened at that point.
    let segments = [];
    let lineAlign = null;
    const endLine = () => {
        lines.push({ align: lineAlign || align, segments });
        segments = [];
        lineAlign = null;
    };
    let i = 0;
    while (i < data.length) {
        const char = data[i];
        if (char === '\n') {
            endLine();
            i += 1;
        }
        else if (char === ESC && data[i + 1] === '@') {
            align = 'left';
            style = Object.assign({}, DEFAULT_STYLE);
            i += 2;
        }
        else if (char === ESC) {
            const command = data[i + 1];
            const param = toParam(data[i + 2]);
            if (command === 'a') {
                align = ALIGNMENTS[param] || 'left';
            }
            else if (command === 'E') {
                style = Object.assign(Object.assign({}, style), { bold: (param & 1) === 1 });
            }
            else if (command === '-') {
                style = Object.assign(Object.assign({}, style), { underline: param > 0 });
            }
            else if (command === 'd') {
                for (let feed = 0; feed < param; feed += 1) {
                    endLine();
                }
            }
            // Anything else (font select, line spacing, ...) has no visual
            // equivalent here and is skipped along with its parameter.
            i += 3;
        }
        else if (char === GS) {
            if (data[i + 1] === '!') {
                const param = toParam(data[i + 2]);
                const width = ((param >> 4) & 0x07) + 1;
                const height = (param & 0x07) + 1;
                style = Object.assign(Object.assign({}, style), { scale: Math.max(width, height) });
            }
            // Cuts and other GS commands are skipped along with their parameter.
            i += 3;
        }
        else {
            if (char >= ' ') {
                lineAlign = lineAlign || align;
                appendChar(segments, style, char);
            }
            i += 1;
        }
    }
    if (segments.length) {
        endLine();
    }
    return lines;
};
// The printer wraps anything past the paper width onto the next line at the
// exact character, not at a word boundary, so the wrapping is done here
// instead of leaving it to the browser.
const wrapLine = (line) => {
    const wrapped = [{ align: line.align, segments: [] }];
    let columns = 0;
    line.segments.forEach((segment) => {
        for (const char of segment.text) {
            if (columns > 0 && columns + segment.scale > helper_escpos_1.PAPER_CHARACTER_WIDTH) {
                wrapped.push({ align: line.align, segments: [] });
                columns = 0;
            }
            appendChar(wrapped[wrapped.length - 1].segments, segment, char);
            columns += segment.scale;
        }
    });
    return wrapped;
};
const getLineText = (line) => line.segments.map((segment) => segment.text).join('');
const isBlankLine = (line) => getLineText(line).trim() === '';
// The `----------------` dividers the templates print between sections.
const isRuleLine = (line) => /^-{3,}$/.test(getLineText(line).trim());
const getLineHeight = (line) => LINE_HEIGHT_PX *
    Math.max(1, ...line.segments.map((segment) => segment.scale));
// A section starts at a divider or a blank line and runs until the next one.
const splitIntoSections = (lines) => lines.reduce((sections, line) => {
    if (!sections.length || isBlankLine(line) || isRuleLine(line)) {
        sections.push([]);
    }
    sections[sections.length - 1].push(line);
    return sections;
}, []);
// Lays the lines out on pages of `pageHeightPx`, moving a section that does
// not fit in what is left of a page to the next page instead of splitting it
// (only sections taller than a whole page are split, line by line).
const paginate = (lines, pageHeightPx) => {
    const pages = [[]];
    let usedHeight = 0;
    const startPage = () => {
        pages.push([]);
        usedHeight = 0;
    };
    splitIntoSections(lines).forEach((section) => {
        const sectionHeight = section.reduce((total, line) => total + getLineHeight(line), 0);
        if (usedHeight > 0 &&
            usedHeight + sectionHeight > pageHeightPx &&
            sectionHeight <= pageHeightPx) {
            startPage();
        }
        section.forEach((line) => {
            const lineHeight = getLineHeight(line);
            if (usedHeight > 0 && usedHeight + lineHeight > pageHeightPx) {
                startPage();
            }
            // Spacing between sections is pointless at the top of a page.
            if (usedHeight === 0 && isBlankLine(line)) {
                return;
            }
            pages[pages.length - 1].push(line);
            usedHeight += lineHeight;
        });
    });
    return pages;
};
const escapeHtml = (text) => text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
const renderSegment = (segment) => {
    const styles = [
        segment.bold ? 'font-weight: bold' : '',
        segment.underline ? 'text-decoration: underline' : '',
        segment.scale > 1 ? `font-size: ${FONT_SIZE_PX * segment.scale}px` : '',
    ].filter(Boolean);
    const text = escapeHtml(segment.text);
    return styles.length
        ? `<span style="${styles.join('; ')}">${text}</span>`
        : text;
};
const renderLine = (line) => {
    const height = getLineHeight(line);
    return `<div style="text-align: ${line.align}; height: ${height}px; line-height: ${height}px;">${line.segments
        .map(renderSegment)
        .join('')}</div>`;
};
/**
 * Converts a native (ESC/POS) template's commands into a standalone HTML
 * document (see appendHtmlElement) for usePdf, laid out exactly as the
 * thermal printer prints it.
 */
const escPosToHtml = (commands, { widthPx = helper_receipt_1.RECEIPT_WIDTH_PX, pageHeightPx } = {}) => {
    const lines = parseCommands(commands).reduce((wrapped, line) => wrapped.concat(wrapLine(line)), []);
    // Templates end with blank feeds that push the paper past the cutter; in
    // a PDF they would only add empty space or an empty page.
    while (lines.length && isBlankLine(lines[lines.length - 1])) {
        lines.pop();
    }
    const pages = pageHeightPx ? paginate(lines, pageHeightPx) : [lines];
    const content = pages
        .map((page, index) => {
        const isLastPage = index === pages.length - 1;
        const height = isLastPage ? '' : ` style="height: ${pageHeightPx}px;"`;
        return `<div${height}>${page.map(renderLine).join('')}</div>`;
    })
        .join('');
    // The container is sized inline because jsPDF sanitizes away the <head>
    // style appendHtmlElement adds. That style still sizes `.container > div`
    // where it does apply, so the fixed-width receipt grid sits one level
    // deeper and is centered within it.
    const data = `<div class="container" style="width: ${widthPx}px;"><div><div style="width: ${helper_escpos_1.PAPER_CHARACTER_WIDTH}ch; margin: 0 auto; font-family: 'Courier New', Courier, monospace; font-size: ${FONT_SIZE_PX}px; white-space: pre; color: #000;">${content}</div></div></div>`;
    return (0, helper_receipt_1.appendHtmlElement)(data, widthPx);
};
exports.escPosToHtml = escPosToHtml;
