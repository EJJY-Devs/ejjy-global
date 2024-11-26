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
exports.openCashDrawer = void 0;
const antd_1 = require("antd");
const qz_tray_1 = __importDefault(require("qz-tray"));
const helper_receipt_1 = require("../helper-receipt");
const openCashDrawer = (printerName) => __awaiter(void 0, void 0, void 0, function* () {
    if (!qz_tray_1.default.websocket.isActive()) {
        antd_1.message.error({
            content: 'Printer is not connected or QZTray is not open.',
        });
        return;
    }
    antd_1.message.loading({
        content: 'Opening cash drawer...',
        key: helper_receipt_1.PRINT_MESSAGE_KEY,
        duration: 5000,
    });
    let printerStatus = null;
    // Add printer callback
    qz_tray_1.default.printers.setPrinterCallbacks((event) => {
        console.log('event', event);
        printerStatus = event;
    });
    // Register listener and get status; deregister after
    yield qz_tray_1.default.printers.startListening(printerName);
    yield qz_tray_1.default.printers.getStatus();
    yield qz_tray_1.default.printers.stopListening();
    // if (printerStatus === null) {
    // 	message.error({
    // 		key: PRINT_MESSAGE_KEY,
    // 		content: 'Unable to detect selected printer.',
    // 	});
    // 	return;
    // }
    // if (printerStatus.statusText === printerStatuses.NOT_AVAILABLE) {
    // 	message.error({
    // 		key: PRINT_MESSAGE_KEY,
    // 		content:
    // 			'Printer is not available. Make sure printer is connected to the machine.',
    // 	});
    // 	return;
    // }
    try {
        const config = qz_tray_1.default.configs.create(printerName);
        yield qz_tray_1.default.print(config, [
            '\x1B' + '\x40',
            '\x10' + '\x14' + '\x01' + '\x00' + '\x05',
        ]);
        antd_1.message.success({
            content: 'Cash drawer has been opened.',
            key: helper_receipt_1.PRINT_MESSAGE_KEY,
        });
    }
    catch (e) {
        antd_1.message.error({
            content: 'An error occurred while opening cash drawer.',
            key: helper_receipt_1.PRINT_MESSAGE_KEY,
        });
        console.error(e);
        return;
    }
    // OTHERS
    antd_1.message.error({
        key: helper_receipt_1.PRINT_MESSAGE_KEY,
        content: 'Cash drawer cannot open right now. Please contact an administrator.',
    });
});
exports.openCashDrawer = openCashDrawer;
