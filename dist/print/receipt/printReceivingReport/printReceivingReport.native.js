"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printReceivingReportNative = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utils_1 = require("../../../utils");
const escpos_enum_1 = require("../../utils/escpos.enum");
const helper_escpos_1 = require("../../helper-escpos");
const helper_receipt_1 = require("../../helper-receipt");
const printReceivingReportNative = ({ receivingReport, isPdf, }) => {
    const commands = [
        ...generateReceivingReportContentCommands(receivingReport),
        escpos_enum_1.EscPosCommands.LINE_BREAK,
        escpos_enum_1.EscPosCommands.LINE_BREAK,
        escpos_enum_1.EscPosCommands.LINE_BREAK,
        escpos_enum_1.EscPosCommands.LINE_BREAK,
        escpos_enum_1.EscPosCommands.LINE_BREAK,
        escpos_enum_1.EscPosCommands.LINE_BREAK,
    ];
    if (isPdf) {
        return (0, helper_receipt_1.appendHtmlElement)(commands.join(''));
    }
    return commands;
};
exports.printReceivingReportNative = printReceivingReportNative;
const generateReceivingReportContentCommands = (receivingReport) => {
    var _a, _b;
    const commands = [];
    // Header
    commands.push(...(0, helper_escpos_1.generateReceiptHeaderCommandsV2)({
        branchHeader: receivingReport.branch,
        title: 'RECEIVING REPORT',
    }), escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Datetime created
    if (receivingReport.datetime_created) {
        commands.push((0, helper_escpos_1.printCenter)('Datetime Generated:'));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        commands.push((0, helper_escpos_1.printCenter)((0, utils_1.formatDateTime)(receivingReport.datetime_created)));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Reference Number
    if (receivingReport.reference_number) {
        commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
            {
                label: 'Reference #:',
                value: receivingReport.reference_number,
            },
        ]));
    }
    // Vendor
    if (receivingReport.supplier_name) {
        commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
            {
                label: 'Vendor:',
                value: receivingReport.supplier_name,
            },
        ]));
    }
    // Customer
    if ((_a = receivingReport.branch) === null || _a === void 0 ? void 0 : _a.name) {
        commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
            {
                label: 'Customer:',
                value: (_b = receivingReport.branch) === null || _b === void 0 ? void 0 : _b.name,
            },
        ]));
    }
    // Encoder
    if (receivingReport.encoded_by) {
        commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
            {
                label: 'Encoder:',
                value: (0, utils_1.getFullName)(receivingReport.encoded_by),
            },
        ]), escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    // Table Header (still done with generateItemBlockCommands)
    commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
        { label: 'Product Name', value: 'Quantity' },
    ]));
    commands.push((0, helper_escpos_1.printRight)('----------------------------------------'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Product List
    commands.push(...(0, helper_escpos_1.generateItemBlockCommands)(receivingReport.receiving_voucher_products.map(({ product, quantity }) => ({
        label: product.name,
        value: (0, utils_1.formatQuantity)(quantity, product),
    }))));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Print details (footer)
    commands.push((0, helper_escpos_1.printCenter)(`Print Details: ${(0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)}`));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push((0, helper_escpos_1.printCenter)(`Remarks ${(receivingReport === null || receivingReport === void 0 ? void 0 : receivingReport.overall_remarks) || ''}`));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    return commands;
};
