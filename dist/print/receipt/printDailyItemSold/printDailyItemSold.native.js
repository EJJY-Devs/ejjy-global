"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printDailyItemSoldNative = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const helper_escpos_1 = require("../../helper-escpos");
const escpos_enum_1 = require("../../utils/escpos.enum");
const printDailyItemSoldNative = ({ dailyItemSoldSummary, branchMachine, }) => [
    ...generateDailyItemSoldContentCommands(dailyItemSoldSummary, branchMachine),
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
];
exports.printDailyItemSoldNative = printDailyItemSoldNative;
const generateDailyItemSoldContentCommands = (dailyItemSoldSummary, branchMachine) => {
    const currentDate = (0, dayjs_1.default)();
    const currentDateTime = currentDate.format('MM/DD/YYYY hh:mm A [PDT]');
    const commands = [];
    // Header
    commands.push(...(0, helper_escpos_1.generateReceiptHeaderCommands)({
        branchMachine,
        title: 'DAILY ITEM SOLD SUMMARY',
    }));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    if (dailyItemSoldSummary.length === 0) {
        commands.push(...(0, helper_escpos_1.printCenter)('No items sold today'));
    }
    else {
        // Item list
        dailyItemSoldSummary.forEach((item) => {
            var _a;
            const name = item.name || '';
            const quantity = ((_a = item.quantity) === null || _a === void 0 ? void 0 : _a.toLocaleString()) || '0';
            // Format: "Name                     Qty"
            const maxNameLength = 25;
            const paddedName = name.length > maxNameLength
                ? name.substring(0, maxNameLength - 3) + '...'
                : name.padEnd(maxNameLength);
            const line = `${paddedName} ${quantity.padStart(8)}`;
            commands.push(line);
            commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        });
    }
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(`PDT: ${currentDateTime}`);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    return commands;
};
