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
        throw new Error('QZ websocket not active');
    }
    const config = qz_tray_1.default.configs.create(printerName);
    // Common ESC/POS drawer pulse: ESC p m t1 t2
    const escpPulse = '\x1B\x70\x00\x19\xFA'; // m=0 (first connector), t1/t2 pulse widths
    // Your original DLE DC4 sequence (some models support this)
    const dlePulse = '\x10\x14\x01\x00\x05';
    try {
        console.log('Opening cash drawer (ESC p)...');
        yield qz_tray_1.default.print(config, [escpPulse]);
        antd_1.message.success({
            content: 'Cash drawer opened.',
            key: helper_receipt_1.PRINT_MESSAGE_KEY,
            duration: 3,
        });
        return;
    }
    catch (escErr) {
        console.warn('ESC p pulse failed, trying DLE DC4 fallback:', escErr);
        try {
            console.log('Opening cash drawer (DLE DC4)...');
            yield qz_tray_1.default.print(config, [dlePulse]);
            antd_1.message.success({
                content: 'Cash drawer opened (fallback).',
                key: helper_receipt_1.PRINT_MESSAGE_KEY,
                duration: 3,
            });
            return;
        }
        catch (dleErr) {
            console.error('Cash drawer open failed on both pulses:', dleErr);
            antd_1.message.error({
                content: 'Failed to open cash drawer.',
                key: helper_receipt_1.PRINT_MESSAGE_KEY,
            });
            throw dleErr;
        }
    }
});
exports.openCashDrawer = openCashDrawer;
