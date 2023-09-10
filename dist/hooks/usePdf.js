"use strict";
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
    const previewPdf = () => {
        setLoadingPdf(true);
        // eslint-disable-next-line new-cap
        const pdf = new jspdf_1.default(Object.assign(Object.assign({}, JSPDF_SETTINGS), jsPdfSettings));
        pdf.setProperties({ title });
        const dataHtml = print === null || print === void 0 ? void 0 : print();
        if (typeof dataHtml === 'string') {
            setHtmlPdf(dataHtml);
            if (image) {
                const img = new Image();
                img.src = image.src;
                pdf.addImage(img, 'png', image.x, image.y, image.w, image.h);
            }
            setTimeout(() => {
                pdf.html(dataHtml, {
                    margin: 10,
                    callback: (instance) => {
                        window.open(instance.output('bloburl').toString());
                        setLoadingPdf(false);
                        setHtmlPdf('');
                    },
                });
            }, TIMEOUT_MS);
        }
    };
    const downloadPdf = () => {
        setLoadingPdf(true);
        // eslint-disable-next-line new-cap
        const pdf = new jspdf_1.default(Object.assign(Object.assign({}, JSPDF_SETTINGS), jsPdfSettings));
        pdf.setProperties({ title });
        const dataHtml = print === null || print === void 0 ? void 0 : print();
        if (typeof dataHtml === 'string') {
            setHtmlPdf(dataHtml);
            if (image) {
                const img = new Image();
                img.src = image.src;
                pdf.addImage(img, 'png', image.x, image.y, image.w, image.h);
            }
            setTimeout(() => {
                pdf.html(dataHtml, {
                    margin: 10,
                    callback: (instance) => {
                        instance.save(title);
                        setLoadingPdf(false);
                        setHtmlPdf('');
                    },
                });
            }, TIMEOUT_MS);
        }
    };
    return {
        htmlPdf,
        isLoadingPdf,
        previewPdf,
        downloadPdf,
    };
};
exports.default = usePdf;
