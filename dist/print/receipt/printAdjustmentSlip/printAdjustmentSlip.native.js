"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printAdjustmentSlipNative = void 0;
const utils_1 = require("../../../utils");
const globals_1 = require("../../../globals");
const helper_escpos_1 = require("../../helper-escpos");
const escpos_enum_1 = require("../../utils/escpos.enum");
const dayjs_1 = __importDefault(require("dayjs"));
const printAdjustmentSlipNative = ({ adjustmentSlip, }) => [
    ...generateAdjustmentSlipContentCommands(adjustmentSlip),
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
];
exports.printAdjustmentSlipNative = printAdjustmentSlipNative;
const generateAdjustmentSlipContentCommands = (adjustmentSlip) => {
    var _a, _b;
    const commands = [];
    // Header
    commands.push(...(0, helper_escpos_1.generateReceiptHeaderCommandsV2)({
        branchHeader: adjustmentSlip.branch,
        title: 'ADJUSTMENT SLIP',
    }));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push((0, helper_escpos_1.printCenter)('Datetime Requested:'));
    commands.push((0, helper_escpos_1.printCenter)((0, utils_1.formatDateTime)(adjustmentSlip.datetime_created)));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Details
    commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
        {
            label: 'Adjustment Slip ID',
            value: adjustmentSlip.reference_number || globals_1.EMPTY_CELL,
        },
        {
            label: 'Branch',
            value: ((_a = adjustmentSlip.branch) === null || _a === void 0 ? void 0 : _a.name) || 'N/A',
        },
        {
            label: 'Encoded By',
            value: (0, utils_1.getFullName)(adjustmentSlip.encoded_by),
        },
        {
            label: 'Date & Time Created',
            value: (0, utils_1.formatDateTime)(adjustmentSlip.datetime_created),
        },
    ]));
    commands.push((0, helper_escpos_1.printCenter)('----------------------------------------'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Products
    (_b = adjustmentSlip.products) === null || _b === void 0 ? void 0 : _b.forEach((product, index) => {
        var _a, _b, _c, _d;
        const productName = `${(_a = product === null || product === void 0 ? void 0 : product.branch_product) === null || _a === void 0 ? void 0 : _a.product.name}${((_c = (_b = product === null || product === void 0 ? void 0 : product.branch_product) === null || _b === void 0 ? void 0 : _b.product) === null || _c === void 0 ? void 0 : _c.is_vat_exempted) ? ' - VE' : ' - V'}`;
        commands.push(productName);
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        const adjustmentText = `${product.adjusted_value >= 0 ? '+' : ''} ${(0, utils_1.formatQuantity)(product.adjusted_value, (_d = product === null || product === void 0 ? void 0 : product.branch_product) === null || _d === void 0 ? void 0 : _d.product)}`;
        const reasonText = product.error_remarks && product.error_remarks !== 'N/A'
            ? ` Error - ${product.error_remarks}`
            : ` ${product.remarks && product.remarks !== 'N/A' ? product.remarks : 'Spoilage'}`;
        commands.push(`  ${adjustmentText}${reasonText}`);
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        if (index < adjustmentSlip.products.length - 1) {
            commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        }
    });
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push((0, helper_escpos_1.printCenter)('----------------------------------------'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Print details
    commands.push((0, helper_escpos_1.printCenter)(`Print Details: ${(0, dayjs_1.default)().format('MM/DD/YYYY h:mmA')}`));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Overall remarks
    if (adjustmentSlip.remarks) {
        commands.push((0, helper_escpos_1.printCenter)(`Overall Remarks: ${adjustmentSlip.remarks}`));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    return commands;
};
