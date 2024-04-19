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
const TIMEOUT_MS = 2000;
const JSPDF_SETTINGS = {
    orientation: 'p',
    unit: 'px',
    format: [400, 700],
    hotfixes: ['px_scaling'],
};
const usePdf = ({ title = '', print, jsPdfSettings, image }) => {
    const [htmlPdf, setHtmlPdf] = (0, react_1.useState)('');
    const [isLoadingPdf, setLoadingPdf] = (0, react_1.useState)(false);
    const handlePdfAction = (actionCallback) => __awaiter(void 0, void 0, void 0, function* () {
        setLoadingPdf(true);
        const pdf = new jspdf_1.default(Object.assign(Object.assign({}, JSPDF_SETTINGS), jsPdfSettings));
        pdf.setProperties({ title });
        const dataHtml = print === null || print === void 0 ? void 0 : print();
        if (dataHtml === undefined) {
            console.error('Print function returned undefined');
            setLoadingPdf(false);
            return;
        }
        const resolveDataHtml = typeof dataHtml === 'function' ? yield dataHtml() : dataHtml;
        setHtmlPdf(resolveDataHtml);
        if (image) {
            const img = new Image();
            img.onload = () => addImageToPdf(img, pdf, resolveDataHtml, actionCallback);
            img.onerror = () => {
                console.error('Failed to load image');
                setLoadingPdf(false);
            };
            img.src = image.src;
        }
        else {
            performPdfOperation(pdf, resolveDataHtml, actionCallback);
        }
    });
    const addImageToPdf = (img, pdf, dataHtml, callback) => {
        pdf.addImage(img, 'png', image.x, image.y, image.w, image.h);
        performPdfOperation(pdf, dataHtml, callback);
    };
    const performPdfOperation = (pdf, dataHtml, callback) => {
        setTimeout(() => {
            pdf.html(dataHtml, {
                margin: 10,
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
