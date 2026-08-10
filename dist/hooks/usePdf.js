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
const utils_1 = require("../utils");
const usePdfPreviewModal_1 = __importDefault(require("./usePdfPreviewModal"));
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
    // Keep the most recently generated document so the preview modal's Download
    // button can reuse it (preserving the user gesture the folder picker needs)
    // instead of regenerating the PDF.
    const lastPdfRef = (0, react_1.useRef)(null);
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
    // savePdf appends ".pdf" itself, so we pass the raw title here.
    const getFilename = () => title || 'Document';
    const downloadPdf = () => {
        handlePdfAction((pdf) => {
            lastPdfRef.current = pdf;
            void (0, utils_1.savePdf)(pdf, getFilename());
        });
    };
    // Reuse the already-generated document when the user hits Download from
    // inside the preview modal — this keeps the click's user activation intact
    // for the folder picker and avoids re-rendering the PDF.
    const handlePreviewDownload = () => {
        if (lastPdfRef.current) {
            void (0, utils_1.savePdf)(lastPdfRef.current, getFilename());
        }
        else {
            downloadPdf();
        }
    };
    const { showPreview, pdfPreviewModal } = (0, usePdfPreviewModal_1.default)({
        title,
        onDownload: handlePreviewDownload,
    });
    const previewPdf = () => {
        // Render the PDF into an in-app modal instead of a new browser tab. A
        // blob URL opened via window.open() after the async generation work is
        // no longer inside the original user gesture, so popup blockers (and the
        // packaged Electron shell) swallow it. An iframe inside a modal has no
        // such restriction.
        handlePdfAction((pdf) => {
            lastPdfRef.current = pdf;
            showPreview(pdf.output('bloburl').toString());
        });
    };
    return {
        htmlPdf,
        isLoadingPdf,
        previewPdf,
        downloadPdf,
        pdfPreviewModal,
    };
};
exports.default = usePdf;
