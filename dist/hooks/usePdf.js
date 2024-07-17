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
            setLoadingPdf(false);
        }
    });
    const performPdfOperation = (dataHtml, callback) => {
        setHtmlPdf(dataHtml);
        console.log('dataHtml', dataHtml);
        setTimeout(() => {
            var _a, _b, _c, _d;
            if ((_a = container === null || container === void 0 ? void 0 : container.containerRef) === null || _a === void 0 ? void 0 : _a.current) {
                const width = ((((_b = container === null || container === void 0 ? void 0 : container.containerRef) === null || _b === void 0 ? void 0 : _b.current.offsetWidth) || FORMAT_WIDTH) +
                    ((container === null || container === void 0 ? void 0 : container.widthAdd) || 0)) *
                    (container.widthMultiplier || 1);
                const height = ((((_c = container === null || container === void 0 ? void 0 : container.containerRef) === null || _c === void 0 ? void 0 : _c.current.offsetHeight) || FORMAT_HEIGHT) +
                    ((container === null || container === void 0 ? void 0 : container.heightAdd) || 0)) *
                    (container.heightMultiplier || 1);
                JSPDF_SETTINGS.format = [width, height];
                JSPDF_SETTINGS.orientation = width > height ? 'l' : 'p';
                console.log((_d = container.containerRef) === null || _d === void 0 ? void 0 : _d.current);
                console.log(JSPDF_SETTINGS.format);
            }
            const pdf = new jspdf_1.default(Object.assign(Object.assign({}, JSPDF_SETTINGS), jsPdfSettings));
            pdf.setProperties({ title });
            if (image) {
                pdf.addImage(image.src, 'png', image.x, image.y, image.w, image.h);
            }
            pdf.html(dataHtml, Object.assign(Object.assign({ margin: 10 }, htmlOptions), { callback: (instance) => {
                    callback(instance);
                    setLoadingPdf(false);
                } }));
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
