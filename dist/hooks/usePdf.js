"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jspdf_1 = __importDefault(require("jspdf"));
const react_1 = require("react");
const antd_1 = require("antd");
const FORMAT_WIDTH = 400;
const FORMAT_HEIGHT = 2000;
const JSPDF_SETTINGS = {
    orientation: 'p',
    unit: 'px',
    hotfixes: ['px_scaling'],
    format: [FORMAT_WIDTH, FORMAT_HEIGHT],
};
const usePdf = ({ title = '', container, print, jsPdfSettings, htmlOptions, image, }) => {
    const [htmlPdf, setHtmlPdf] = (0, react_1.useState)('');
    const [isLoadingPdf, setLoadingPdf] = (0, react_1.useState)(false);
    const handlePdfAction = (actionCallback) => __awaiter(void 0, void 0, void 0, function* () {
        setLoadingPdf(true);
        try {
            // Correctly resolving the type of dataHtml here.
            const dataHtml = typeof print === 'function' ? print() : undefined;
            if (dataHtml instanceof Promise) {
                const resolvedDataHtml = yield dataHtml;
                if (resolvedDataHtml) {
                    performPdfOperation(resolvedDataHtml, actionCallback);
                }
                else {
                    setLoadingPdf(false);
                }
            }
            else if (typeof dataHtml === 'string') {
                performPdfOperation(dataHtml, actionCallback);
            }
            else {
                setLoadingPdf(false);
            }
        }
        catch (error) {
            console.error(error);
            setLoadingPdf(false);
        }
    });
    const performPdfOperation = (dataHtml, callback) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        setHtmlPdf(dataHtml);
        try {
            // setHtmlPdf() only schedules the re-render that fills containerRef via
            // dangerouslySetInnerHTML; wait for it to actually paint (double rAF) and
            // for webfonts to finish loading before measuring the container/snapshotting
            // it with html2canvas, otherwise we read stale dimensions or mismeasured text.
            yield new Promise((resolve) => {
                requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
            });
            if ((_a = document.fonts) === null || _a === void 0 ? void 0 : _a.ready) {
                yield document.fonts.ready;
            }
            if ((_b = container === null || container === void 0 ? void 0 : container.containerRef) === null || _b === void 0 ? void 0 : _b.current) {
                const width = ((((_c = container === null || container === void 0 ? void 0 : container.containerRef) === null || _c === void 0 ? void 0 : _c.current.offsetWidth) || FORMAT_WIDTH) +
                    ((container === null || container === void 0 ? void 0 : container.widthAdd) || 0)) *
                    (container.widthMultiplier || 1);
                const height = ((((_d = container === null || container === void 0 ? void 0 : container.containerRef) === null || _d === void 0 ? void 0 : _d.current.offsetHeight) || FORMAT_HEIGHT) +
                    ((container === null || container === void 0 ? void 0 : container.heightAdd) || 0)) *
                    (container.heightMultiplier || 1);
                JSPDF_SETTINGS.format = [width, height];
                JSPDF_SETTINGS.orientation = width > height ? 'l' : 'p';
            }
            const pdf = new jspdf_1.default(Object.assign(Object.assign({}, JSPDF_SETTINGS), jsPdfSettings));
            pdf.setProperties({ title });
            if (image) {
                pdf.addImage(image.src, 'png', image.x, image.y, image.w, image.h);
            }
            yield pdf.html(dataHtml, Object.assign(Object.assign({ margin: 10 }, htmlOptions), { callback }));
        }
        catch (error) {
            console.error(error);
            antd_1.message.error('Failed to generate the PDF. Please try again.');
        }
        finally {
            setLoadingPdf(false);
        }
    });
    const previewPdf = () => {
        // Open the tab synchronously, in direct response to the user's click,
        // before any of the async PDF generation work (rAF, font loading,
        // jsPDF's own async .html() render) happens below. If we wait until the
        // blob URL is ready to call window.open(), the call is no longer inside
        // the original user gesture and browsers' popup blockers silently
        // swallow it. Navigating this already-open tab to the blob URL once
        // it's ready does not require a fresh user gesture.
        const previewTab = window.open('', '_blank');
        if (!previewTab) {
            antd_1.message.error('Unable to open PDF preview. Please allow pop-ups for this site and try again.');
            return;
        }
        handlePdfAction((pdf) => {
            previewTab.location.href = pdf.output('bloburl').toString();
        });
    };
    const downloadPdf = () => {
        // jsPDF's save() takes "the filename including extension" verbatim and
        // does not append one itself, so every caller here — none of which
        // includes ".pdf" in its title — was downloading an extensionless file
        // that the OS/browser can't associate back to a PDF viewer.
        const filename = title || 'Document';
        handlePdfAction((pdf) => pdf.save(filename.endsWith('.pdf') ? filename : `${filename}.pdf`));
    };
    return {
        htmlPdf,
        isLoadingPdf,
        previewPdf,
        downloadPdf,
    };
};
exports.default = usePdf;
