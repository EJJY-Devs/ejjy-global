"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printRequisitionSlipNative = void 0;
const utils_1 = require("../../../utils");
const escpos_enum_1 = require("../../utils/escpos.enum");
const helper_escpos_1 = require("../../helper-escpos");
const dayjs_1 = __importDefault(require("dayjs"));
const printRequisitionSlipNative = ({ requisitionSlip, siteSettings, user, }) => [
    ...generateRequisitionSlipContentCommands(requisitionSlip, siteSettings, user),
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
];
exports.printRequisitionSlipNative = printRequisitionSlipNative;
const generateRequisitionSlipContentCommands = (requisitionSlip, siteSettings, user) => {
    const commands = [];
    // Header
    commands.push(...(0, helper_escpos_1.generateReceiptHeaderCommands)({
        title: 'REQUISITION SLIP',
    }));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Date & Time Requested
    if (requisitionSlip.datetime_created) {
        commands.push((0, helper_escpos_1.printCenter)('Date & Time Requested'));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        commands.push((0, helper_escpos_1.printCenter)((0, utils_1.formatDateTime)(requisitionSlip.datetime_created)));
    }
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Requestor Name
    if (requisitionSlip.approved_by) {
        commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
            {
                label: 'Requestor',
                value: (0, utils_1.getFullName)(requisitionSlip.approved_by) || '',
            },
        ]));
    }
    // Branch Name
    if (requisitionSlip.branch) {
        commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
            {
                label: 'Requesting Branch:',
                value: requisitionSlip.branch.name || '',
            },
        ]));
    }
    // Requisition Slip Reference Number
    if (requisitionSlip.reference_number) {
        commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
            {
                label: 'Requisition Slip ID:',
                value: requisitionSlip.reference_number || '',
            },
        ]));
    }
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Table Header
    commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
        {
            label: 'Product Name',
            value: 'Quantity',
        },
    ]));
    commands.push((0, helper_escpos_1.printRight)('----------------------------------------'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Product List
    commands.push(...(0, helper_escpos_1.generateItemBlockCommands)(requisitionSlip.products.map(({ product, quantity }) => ({
        label: product.name,
        value: (0, utils_1.formatQuantity)(quantity, product),
    }))));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Footer
    if (user) {
        commands.push((0, helper_escpos_1.printCenter)(`Print Details: ${(0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)} ${user.employee_id}`));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    return commands;
};
