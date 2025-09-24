"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printDailyItemSoldNative = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const helper_escpos_1 = require("../../helper-escpos");
const escpos_enum_1 = require("../../utils/escpos.enum");
const printDailyItemSoldNative = ({ dailyItemSoldSummary, branch, branchMachine, reportDate, }) => [
    ...generateDailyItemSoldContentCommands(dailyItemSoldSummary, branch, branchMachine, reportDate),
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
];
exports.printDailyItemSoldNative = printDailyItemSoldNative;
const generateDailyItemSoldContentCommands = (dailyItemSoldSummary, branch, branchMachine, reportDate) => {
    const currentDate = (0, dayjs_1.default)();
    const currentDateTime = currentDate.format('MM/DD/YYYY hh:mm A');
    // Use provided reportDate or current date
    const displayDate = reportDate
        ? (0, dayjs_1.default)(reportDate).format('MM/DD/YYYY')
        : currentDate.format('MM/DD/YYYY');
    const commands = [];
    // Header
    commands.push(...(0, helper_escpos_1.generateReceiptHeaderCommandsV2)({
        branchMachine,
        branchHeader: branch,
        title: 'DAILY ITEM SOLD',
    }));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push((0, helper_escpos_1.printCenter)(displayDate));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    if (dailyItemSoldSummary.length === 0) {
        commands.push(...(0, helper_escpos_1.printCenter)('No items sold today'));
    }
    else {
        // Table Header
        commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([{ label: 'Name', value: 'Quantity' }]));
        commands.push((0, helper_escpos_1.printRight)('----------------------------------------'));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        // Item list
        dailyItemSoldSummary.forEach((item) => {
            var _a;
            const name = item.name || '';
            const quantity = ((_a = item.quantity) === null || _a === void 0 ? void 0 : _a.toLocaleString()) || '0';
            commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([{ label: name, value: quantity }]));
        });
    }
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push((0, helper_escpos_1.printCenter)(`PDT: ${currentDateTime}`));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    return commands;
};
