"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printRequisitionSlipNative = void 0;
const utils_1 = require("../../../utils");
const escpos_enum_1 = require("../../utils/escpos.enum");
const helper_escpos_1 = require("../../helper-escpos");
const printRequisitionSlipNative = ({ requisitionSlip, siteSettings, user, }) => {
    const commands = [];
    // Header
    commands.push(...(0, helper_escpos_1.generateReceiptHeaderCommands)({
        siteSettings,
        title: 'REQUISITION SLIP',
    }));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Requisition details
    commands.push((0, helper_escpos_1.printCenter)('REQUISITION SLIP'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Date & Time Requested
    if (requisitionSlip.datetime_created) {
        commands.push((0, helper_escpos_1.printCenter)('Date & Time Requested'));
        commands.push((0, helper_escpos_1.printCenter)((0, utils_1.formatDateTime)(requisitionSlip.datetime_created)));
    }
    // Requestor Name
    if (requisitionSlip.approved_by) {
        commands.push((0, helper_escpos_1.printCenter)('Requestor:'));
        commands.push((0, helper_escpos_1.printCenter)((0, utils_1.getFullName)(requisitionSlip.approved_by)));
    }
    // Branch Name
    if (requisitionSlip.branch) {
        commands.push((0, helper_escpos_1.printCenter)('Requesting Branch:'));
        commands.push((0, helper_escpos_1.printCenter)(requisitionSlip.branch.name));
    }
    // Requisition Slip Reference Number
    if (requisitionSlip.reference_number) {
        commands.push((0, helper_escpos_1.printCenter)('Requisition Slip ID:'));
        commands.push((0, helper_escpos_1.printCenter)(requisitionSlip.reference_number));
    }
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Item List (Products)
    commands.push((0, helper_escpos_1.printCenter)('Product List'));
    commands.push(...(0, helper_escpos_1.generateItemBlockCommands)(requisitionSlip.products.map(({ product, quantity }) => ({
        label: product.name,
        value: (0, utils_1.formatQuantity)(quantity, product),
    }))));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Footer
    if (user) {
        commands.push((0, helper_escpos_1.printRight)(`Printed by: ${(0, utils_1.getFullName)(user)}`));
    }
    commands.push(...(0, helper_escpos_1.generateReceiptFooterCommands)(siteSettings));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push((0, helper_escpos_1.printCenter)('This Document Is Not Valid For Claim Of Input Tax'));
    commands.push((0, helper_escpos_1.printCenter)('Thank You!'));
    return commands;
};
exports.printRequisitionSlipNative = printRequisitionSlipNative;
