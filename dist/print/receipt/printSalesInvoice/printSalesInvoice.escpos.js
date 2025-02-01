"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printSalesInvoiceEscPos = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const TransactionContent_1 = require("../../../components/modals/ViewTransactionModal/TransactionContent");
const globals_1 = require("../../../globals");
const utils_1 = require("../../../utils");
const helper_escpos_1 = require("../../helper-escpos");
const helper_receipt_1 = require("../../helper-receipt");
const escpos_enum_1 = require("../../utils/escpos.enum");
const printSalesInvoiceEscPos = ({ transaction, siteSettings, isReprint = false, }) => [
    '1. Lorem ipsu',
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    '2. m dolor si',
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    '3. t amet, co',
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    '4. nsectetur ',
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    '5. adipiscing',
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    '6. elit. Se',
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    '7. d do eiusm',
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    '8. od tempor',
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    '9. incididun',
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    '10. t ut labore',
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    '11. et dolore',
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    '12. magna ali',
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    '13. qua. Ut en',
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    '14. im ad mini',
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    '15. m veniam, ',
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    '16. quis nostr',
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    '17. ud exercit',
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    '18. ation ull',
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    '19. amco labor',
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    '20. is nisi ut',
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    // ...generateTransactionContentCommands(transaction, siteSettings, isReprint),
    // EscPosCommands.LINE_BREAK,
    // EscPosCommands.LINE_BREAK,
    // EscPosCommands.LINE_BREAK,
    // EscPosCommands.LINE_BREAK,
    // EscPosCommands.LINE_BREAK,
    // EscPosCommands.LINE_BREAK,
];
exports.printSalesInvoiceEscPos = printSalesInvoiceEscPos;
const generateTransactionContentCommands = (transaction, siteSettings, isReprint) => {
    var _a;
    const { title, fields, change, previousTransactionOrNumber, newTransactionOrNumber, } = (0, TransactionContent_1.getTransactionData)(transaction);
    const commands = [];
    commands.push(...(0, helper_escpos_1.generateReceiptHeaderCommands)({
        branchMachine: transaction.branch_machine,
        siteSettings,
        title,
    }));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Products
    transaction.products.forEach((item) => {
        const productDetails = `${item.branch_product.product.print_details} - ${item.branch_product.product.is_vat_exempted ? globals_1.vatTypes.VAT_EMPTY : globals_1.vatTypes.VATABLE}`;
        const quantityAndPrice = `   ${item.original_quantity} @ ${(0, utils_1.formatInPeso)(item.price_per_piece, helper_receipt_1.PESO_SIGN)}`;
        const totalAmount = (0, utils_1.formatInPeso)(Number(item.quantity) * Number(item.price_per_piece), helper_receipt_1.PESO_SIGN);
        commands.push(escpos_enum_1.EscPosCommands.ALIGN_LEFT);
        commands.push(productDetails);
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
            {
                label: quantityAndPrice,
                value: totalAmount,
                isIndented: true,
            },
        ]));
    });
    // Divider
    commands.push(escpos_enum_1.EscPosCommands.ALIGN_RIGHT);
    commands.push('----------------');
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Discounts and Total
    if (transaction.discount_option) {
        commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
            {
                label: 'GROSS AMOUNT',
                value: (0, utils_1.formatInPeso)(transaction.gross_amount, helper_receipt_1.PESO_SIGN),
            },
            {
                label: `DISCOUNT | ${transaction.discount_option.code}`,
                value: (0, utils_1.formatInPeso)((0, utils_1.getComputedDiscount)(transaction), helper_receipt_1.PESO_SIGN),
                isParenthesized: true,
            },
        ]));
        if (transaction.discount_option.is_special_discount) {
            commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
                {
                    label: 'ADJ. ON VAT',
                    value: (0, utils_1.formatInPeso)(transaction.invoice.vat_amount, helper_receipt_1.PESO_SIGN),
                    isParenthesized: true,
                },
            ]));
        }
        commands.push(escpos_enum_1.EscPosCommands.ALIGN_RIGHT);
        commands.push('----------------');
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
        {
            label: 'TOTAL AMOUNT',
            value: (0, utils_1.formatInPeso)(transaction.total_amount, helper_receipt_1.PESO_SIGN),
        },
    ]));
    // Payment Details
    if (transaction.payment.mode === globals_1.saleTypes.CASH) {
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
            {
                label: 'AMOUNT RECEIVED',
                value: (0, utils_1.formatInPeso)(transaction.payment.amount_tendered, helper_receipt_1.PESO_SIGN),
            },
            {
                label: 'AMOUNT DUE',
                value: (0, utils_1.formatInPeso)(transaction.total_amount, helper_receipt_1.PESO_SIGN),
            },
            {
                label: 'CHANGE',
                value: (0, utils_1.formatInPeso)(change, helper_receipt_1.PESO_SIGN),
            },
        ]));
    }
    // VAT Details
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
        {
            label: 'VAT Exempt',
            value: (0, utils_1.formatInPeso)(transaction.invoice.vat_exempt, helper_receipt_1.PESO_SIGN),
        },
        {
            label: 'VATable Sales',
            value: (0, utils_1.formatInPeso)(transaction.invoice.vat_sales, helper_receipt_1.PESO_SIGN),
        },
        {
            label: 'VAT Amount (12%)',
            value: (0, utils_1.formatInPeso)(transaction.invoice.vat_amount, helper_receipt_1.PESO_SIGN),
        },
        {
            label: 'ZERO Rated',
            value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
        },
    ]));
    // Add GDT and PDT
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push('GDT: ' + (0, utils_1.formatDateTime)(transaction.invoice.datetime_created));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push('PDT: ' + (0, utils_1.formatDateTime)((0, dayjs_1.default)(), false));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // OR Number and Item Count
    commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
        {
            label: transaction.invoice.or_number,
            value: `${transaction.products.length} item(s)`,
        },
    ]));
    // Teller ID
    commands.push(((_a = transaction === null || transaction === void 0 ? void 0 : transaction.teller) === null || _a === void 0 ? void 0 : _a.employee_id) || helper_receipt_1.EMPTY_CELL);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Previous and New Invoice Numbers
    if (previousTransactionOrNumber) {
        commands.push('Prev Invoice #: ' + previousTransactionOrNumber);
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if (newTransactionOrNumber) {
        commands.push('New Invoice #: ' + newTransactionOrNumber);
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    // Additional Fields
    fields === null || fields === void 0 ? void 0 : fields.forEach(({ key, value }) => {
        commands.push(`${key}: ${value}`);
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    });
    // Footer
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(...(0, helper_escpos_1.generateReceiptFooterCommands)(siteSettings));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Final Messages
    if (transaction.status === globals_1.transactionStatuses.FULLY_PAID) {
        commands.push(isReprint ? globals_1.REPRINT_ONLY_MESSAGE : globals_1.INVOICE_LAST_MESSAGE);
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if ([
        globals_1.transactionStatuses.VOID_EDITED,
        globals_1.transactionStatuses.VOID_CANCELLED,
    ].includes(transaction.status)) {
        commands.push('VOIDED TRANSACTION');
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    commands.push(`${siteSettings === null || siteSettings === void 0 ? void 0 : siteSettings.thank_you_message}`);
    return commands;
};
