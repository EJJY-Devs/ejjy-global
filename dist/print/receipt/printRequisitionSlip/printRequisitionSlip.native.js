"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printRequisitionSlipNative = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utils_1 = require("../../../utils");
const escpos_enum_1 = require("../../utils/escpos.enum");
const helper_escpos_1 = require("../../helper-escpos");
const helper_receipt_1 = require("../../helper-receipt");
const printRequisitionSlipNative = ({ requisitionSlip, isPdf, }) => {
    const commands = [
        ...generateRequisitionSlipContentCommands(requisitionSlip),
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
exports.printRequisitionSlipNative = printRequisitionSlipNative;
const generateRequisitionSlipContentCommands = (requisitionSlip) => {
    const commands = [];
    // Header
    commands.push(...(0, helper_escpos_1.generateReceiptHeaderCommandsV2)({
        branchHeader: requisitionSlip.branch,
        title: 'REQUISITION SLIP',
    }), escpos_enum_1.EscPosCommands.LINE_BREAK, escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Date & Time Requested
    if (requisitionSlip.datetime_created) {
        commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
            {
                label: 'Datetime Requested:',
                value: (0, utils_1.formatDateTime)(requisitionSlip.datetime_created),
            },
        ]));
    }
    // Reference Number
    if (requisitionSlip.reference_number) {
        commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
            { label: 'Reference #:', value: requisitionSlip.reference_number },
        ]));
    }
    // Vendor
    if (requisitionSlip.vendor) {
        commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
            { label: 'Vendor:', value: requisitionSlip.vendor.name || '' },
        ]));
    }
    // Customer (Branch Name)
    if (requisitionSlip.branch) {
        commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
            { label: 'Customer:', value: requisitionSlip.branch.name || '' },
        ]));
    }
    // Encoder (Prepared By)
    if (requisitionSlip.prepared_by) {
        commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
            {
                label: 'Encoder:',
                value: (0, utils_1.getFullName)(requisitionSlip.prepared_by) || '',
            },
        ]));
    }
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Table Header
    commands.push((0, helper_escpos_1.generateThreeColumnLine)('Product Name', 'Quantity', 'Unit'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push((0, helper_escpos_1.printCenter)('----------------------------------------'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Product List
    requisitionSlip.products.forEach(({ product, quantity, unit }) => {
        commands.push((0, helper_escpos_1.generateThreeColumnLine)(product.print_details || '', (0, utils_1.formatQuantity)(quantity, product), unit != null ? unit : '-'));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    });
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Footer - Print Details
    commands.push((0, helper_escpos_1.printCenter)(`Print Details: ${(0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)}`));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push((0, helper_escpos_1.printCenter)(`Remarks: ${(requisitionSlip === null || requisitionSlip === void 0 ? void 0 : requisitionSlip.overall_remarks) || ''}`));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    return commands;
};
