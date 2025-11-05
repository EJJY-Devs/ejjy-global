"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printCollectionReceiptNative = void 0;
const utils_1 = require("../../../utils");
const globals_1 = require("../../../globals");
const helper_escpos_1 = require("../../helper-escpos");
const escpos_enum_1 = require("../../utils/escpos.enum");
const dayjs_1 = __importDefault(require("dayjs"));
const printCollectionReceiptNative = ({ collectionReceipt, siteSettings, }) => [
    ...generateCollectionReceiptContentCommands(collectionReceipt, siteSettings),
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
];
exports.printCollectionReceiptNative = printCollectionReceiptNative;
const generateCollectionReceiptContentCommands = (collectionReceipt, siteSettings) => {
    var _a, _b, _c;
    const commands = [];
    const invoice = (_b = (_a = collectionReceipt.order_of_payment) === null || _a === void 0 ? void 0 : _a.charge_sales_transaction) === null || _b === void 0 ? void 0 : _b.invoice;
    const orderOfPayment = collectionReceipt === null || collectionReceipt === void 0 ? void 0 : collectionReceipt.order_of_payment;
    console.log('collectionReceipt', collectionReceipt);
    console.log('orderOfPayment', orderOfPayment);
    // const { amount } = orderOfPayment;
    let description = orderOfPayment.extra_description;
    if (orderOfPayment.purpose === globals_1.orderOfPaymentPurposes.FULL_PAYMENT) {
        description = 'Full Payment';
    }
    else if (orderOfPayment.purpose === globals_1.orderOfPaymentPurposes.PARTIAL_PAYMENT) {
        description = 'Partial Payment';
    }
    // Header
    commands.push(...(0, helper_escpos_1.generateReceiptHeaderCommands)({
        branchMachine: collectionReceipt.branch_machine,
    }));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push((0, helper_escpos_1.printCenter)('[Collection Receipt]'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push((0, helper_escpos_1.printCenter)('Received payment from'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Customer details
    commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
        // {
        // 	label: 'Name',
        // 	value: getFullName(payor),
        // },
        // {
        // 	label: 'Address',
        // 	value: payor.home_address || EMPTY_CELL,
        // },
        // {
        // 	label: 'Tin',
        // 	value: payor.tin || EMPTY_CELL,
        // },
        // {
        // 	label: 'the sum of',
        // 	value: formatInPeso(amount, PESO_SIGN),
        // },
        {
            label: 'Description',
            value: description || globals_1.EMPTY_CELL,
        },
        {
            label: 'with invoice',
            value: (invoice === null || invoice === void 0 ? void 0 : invoice.or_number) || globals_1.EMPTY_CELL,
        },
    ]));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Check details (if applicable)
    if (collectionReceipt.check_number) {
        commands.push('CHECK DETAILS');
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
            {
                label: 'Bank',
                value: collectionReceipt.bank_name || globals_1.EMPTY_CELL,
            },
            {
                label: 'Branch',
                value: collectionReceipt.bank_branch || globals_1.EMPTY_CELL,
            },
            {
                label: 'Check No',
                value: collectionReceipt.check_number || globals_1.EMPTY_CELL,
            },
            {
                label: 'Check Date',
                value: collectionReceipt.check_date
                    ? (0, utils_1.formatDate)(collectionReceipt.check_date)
                    : globals_1.EMPTY_CELL,
            },
        ]));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    // Footer details
    commands.push(`GDT: ${(0, utils_1.formatDateTime)(collectionReceipt === null || collectionReceipt === void 0 ? void 0 : collectionReceipt.datetime_created)}`);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(`PDT: ${(0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)}`);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // ID and employee details
    const employeeId = ((_c = collectionReceipt === null || collectionReceipt === void 0 ? void 0 : collectionReceipt.created_by) === null || _c === void 0 ? void 0 : _c.employee_id) || '';
    commands.push(`ID: ${(collectionReceipt === null || collectionReceipt === void 0 ? void 0 : collectionReceipt.id) || globals_1.EMPTY_CELL}`);
    if (employeeId) {
        // Calculate padding for right alignment
        const idText = `ID: ${(collectionReceipt === null || collectionReceipt === void 0 ? void 0 : collectionReceipt.id) || globals_1.EMPTY_CELL}`;
        const availableSpace = 40 - idText.length - employeeId.length;
        const padding = ' '.repeat(Math.max(1, availableSpace));
        // Replace the last command with the properly formatted line
        commands[commands.length - 1] = idText + padding + employeeId;
    }
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Site settings footer
    commands.push(...(0, helper_escpos_1.generateReceiptFooterCommands)(siteSettings));
    // Final messages
    commands.push((0, helper_escpos_1.printCenter)('This Document Is Not Valid For Claim Of Input Tax'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push((0, helper_escpos_1.printCenter)('Thank You!'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    return commands;
};
