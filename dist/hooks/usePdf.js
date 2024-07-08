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
const TIMEOUT_MS = 3000;
const FORMAT_WIDTH = 400;
const FORMAT_HEIGHT = 2000;
const JSPDF_SETTINGS = {
    orientation: 'p',
    unit: 'px',
    hotfixes: ['px_scaling'],
};
const usePdf = ({ title = '', containerRef, print, jsPdfSettings, image, }) => {
    const [htmlPdf, setHtmlPdf] = (0, react_1.useState)('');
    const [isLoadingPdf, setLoadingPdf] = (0, react_1.useState)(false);
    const handlePdfAction = (actionCallback) => __awaiter(void 0, void 0, void 0, function* () {
        setLoadingPdf(true);
        try {
            // Correctly resolving the type of dataHtml here.
            const dataHtml = typeof print === 'function' ? print() : undefined;
            if (dataHtml instanceof Promise) {
                // If dataHtml is a Promise, await it.
                const resolvedDataHtml = yield dataHtml;
                if (resolvedDataHtml) {
                    performPdfOperation(resolvedDataHtml, actionCallback);
                }
            }
            else if (typeof dataHtml === 'string') {
                // If dataHtml is a string, process it directly.
                performPdfOperation(dataHtml, actionCallback);
            }
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoadingPdf(false);
        }
    });
    const performPdfOperation = (dataHtml, callback) => {
        setHtmlPdf(dataHtml);
        console.log('dataHtml', dataHtml);
        setTimeout(() => {
            if (containerRef === null || containerRef === void 0 ? void 0 : containerRef.current) {
                JSPDF_SETTINGS.format = [
                    (containerRef === null || containerRef === void 0 ? void 0 : containerRef.current.offsetWidth) || FORMAT_WIDTH,
                    (containerRef === null || containerRef === void 0 ? void 0 : containerRef.current.offsetHeight) || FORMAT_HEIGHT,
                ];
            }
            const pdf = new jspdf_1.default(Object.assign(Object.assign({}, JSPDF_SETTINGS), jsPdfSettings));
            pdf.setProperties({ title });
            if (image) {
                pdf.addImage(image.src, 'png', image.x, image.y, image.w, image.h);
            }
            pdf.html(dataHtml, {
                margin: 10,
                autoPaging: false,
                callback: (instance) => {
                    callback(instance);
                    setLoadingPdf(false);
                    setHtmlPdf('');
                },
            });
        }, TIMEOUT_MS);
    };
    const previewPdf = () => {
        handlePdfAction((pdf) => window.open(pdf.output('bloburl').toString()));
    };
    const downloadPdf = () => {
        handlePdfAction((pdf) => pdf.save(title || 'Document'));
    };
    return {
        htmlPdf,
        isLoadingPdf,
        previewPdf,
        downloadPdf,
    };
};
exports.default = usePdf;
