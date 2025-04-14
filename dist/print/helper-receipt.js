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
exports.addUnderline = exports.formatInPesoWithUnderline = exports.print = exports.appendHtmlElement = exports.getPageStyleObject = exports.getPageStyle = exports.getFooter = exports.getHeader = exports.configurePrinter = exports.PRINT_MESSAGE_KEY = exports.QZ_MESSAGE_KEY = exports.PAPER_WIDTH_INCHES = exports.PAPER_MARGIN_INCHES = exports.UNDERLINE_TEXT = exports.EMPTY_CELL = exports.PESO_SIGN = void 0;
const antd_1 = require("antd");
const qz_tray_1 = __importDefault(require("qz-tray"));
const react_1 = __importDefault(require("react"));
const server_1 = __importDefault(require("react-dom/server"));
const components_1 = require("../components");
const utils_1 = require("../utils");
const globals_1 = require("../globals");
exports.PESO_SIGN = 'P';
exports.EMPTY_CELL = '';
exports.UNDERLINE_TEXT = '---------';
exports.PAPER_MARGIN_INCHES = 0.2;
exports.PAPER_WIDTH_INCHES = 3;
exports.QZ_MESSAGE_KEY = 'QZ_MESSAGE_KEY';
exports.PRINT_MESSAGE_KEY = 'PRINT_MESSAGE_KEY';
let printerName;
let printerFontSize;
let printerFontFamily;
const configurePrinter = (appPrinterName, appPrinterFontSize, appPrinterFontFamily) => {
    printerName = appPrinterName;
    printerFontSize = appPrinterFontSize;
    printerFontFamily = appPrinterFontFamily;
    if (!qz_tray_1.default.websocket.isActive()) {
        (0, utils_1.authenticateQZTray)(qz_tray_1.default);
        antd_1.message.loading({
            content: 'Connecting to QZTray...',
            key: exports.QZ_MESSAGE_KEY,
            duration: 5000,
        });
        qz_tray_1.default.websocket
            .connect()
            .then(() => {
            antd_1.message.success({
                content: 'Successfully connected to QZTray.',
                key: exports.QZ_MESSAGE_KEY,
            });
        })
            .catch((err) => {
            antd_1.message.error({
                content: 'Cannot connect to QZTray.',
                key: exports.QZ_MESSAGE_KEY,
            });
            console.error('QZ Tray Error', err);
        });
    }
};
exports.configurePrinter = configurePrinter;
const getHeader = (siteSettings, branchMachine, title) => server_1.default.renderToStaticMarkup(react_1.default.createElement(components_1.ReceiptHeader, { branchMachine: branchMachine, title: title }));
exports.getHeader = getHeader;
const getFooter = (siteSettings) => server_1.default.renderToStaticMarkup(react_1.default.createElement(components_1.ReceiptFooter, { siteSettings: siteSettings }));
exports.getFooter = getFooter;
const getPageStyle = (extraStyle = '') => {
    return `width: 100%; font-size: ${printerFontSize}pt; font-family: ${printerFontFamily}, monospace; line-height: 100%; position: relative; ${extraStyle}`;
};
exports.getPageStyle = getPageStyle;
const getPageStyleObject = (extraStyle) => (Object.assign({ width: '100%', fontSize: `${printerFontSize}pt`, fontFamily: printerFontFamily, lineHeight: '100%', position: 'relative' }, extraStyle));
exports.getPageStyleObject = getPageStyleObject;
const appendHtmlElement = (data) => `
  <html lang="en">
  <head>
    <style>
      .container, .container > div, .container > table {
        width: 380px !important;
      }
    </style>
  </head>
  <body>
      ${data}
  </body>
</html>`;
exports.appendHtmlElement = appendHtmlElement;
const print = (printData, entity, onComplete, type) => __awaiter(void 0, void 0, void 0, function* () {
    antd_1.message.loading({
        content: `Printing ${entity.toLowerCase()}...`,
        key: exports.PRINT_MESSAGE_KEY,
        duration: 5000,
    });
    let printerStatus = null;
    // Add printer callback to capture events
    qz_tray_1.default.printers.setPrinterCallbacks((event) => {
        console.log('event', event);
        printerStatus = event; // Set printer status based on event
    });
    // Register listener and get status; deregister after
    yield qz_tray_1.default.printers.startListening(printerName);
    // Wait for the printer status to be retrieved
    yield qz_tray_1.default.printers.getStatus();
    // Stop listening after status check
    yield qz_tray_1.default.printers.stopListening();
    // // Check if printerStatus was not set
    // if (printerStatus === null) {
    // 	message.error({
    // 		key: PRINT_MESSAGE_KEY,
    // 		content: 'Unable to detect the selected printer.',
    // 	});
    // 	return;
    // }
    // // Check if the printer is available
    // if (printerStatus.statusText === 'NOT_AVAILABLE') {
    // 	message.error({
    // 		key: PRINT_MESSAGE_KEY,
    // 		content:
    // 			'Printer is not available. Make sure the printer is connected to the machine.',
    // 	});
    // 	return;
    // }
    // // If status is OK, continue with printing
    // message.success({
    // 	key: PRINT_MESSAGE_KEY,
    // 	content: 'Printer is available.',
    // });
    try {
        console.log('Printing receipt.');
        const config = qz_tray_1.default.configs.create(printerName, Object.assign({}, (type !== globals_1.printingTypes.NATIVE
            ? {
                margins: {
                    top: 0,
                    right: exports.PAPER_MARGIN_INCHES,
                    bottom: 0,
                    left: exports.PAPER_MARGIN_INCHES,
                },
                scaleContent: true,
                scaling: 'shrinkToFit',
            }
            : {})));
        console.log('config', config);
        if (type === globals_1.printingTypes.NATIVE) {
            yield qz_tray_1.default.print(config, printData);
        }
        else {
            yield qz_tray_1.default.print(config, [
                {
                    type: 'pixel',
                    format: 'html',
                    flavor: 'plain',
                    options: { pageWidth: exports.PAPER_WIDTH_INCHES },
                    data: printData,
                },
            ]);
        }
        antd_1.message.success({
            content: `${entity} has been printed successfully.`,
            key: exports.PRINT_MESSAGE_KEY,
        });
    }
    catch (e) {
        antd_1.message.error({
            content: `Error occurred while trying to print ${entity}.`,
            key: exports.PRINT_MESSAGE_KEY,
        });
        console.error(e);
    }
    finally {
        if (onComplete) {
            onComplete();
        }
    }
    return;
});
exports.print = print;
// OTHERS
antd_1.message.error({
    key: exports.PRINT_MESSAGE_KEY,
    content: 'Printer cannot print right now. Please contact an administrator.',
});
const formatInPesoWithUnderline = (value) => `<div style="display:inline-block">
    ${(0, utils_1.formatInPeso)(value, exports.PESO_SIGN)}
  </div>`;
exports.formatInPesoWithUnderline = formatInPesoWithUnderline;
const addUnderline = (value) => Number(value) > 0
    ? '<div style="width: 100%; text-align: right">-----------</div>'
    : '';
exports.addUnderline = addUnderline;
