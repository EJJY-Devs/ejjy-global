"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyItemSoldContent = void 0;
const antd_1 = require("antd");
const dayjs_1 = __importDefault(require("dayjs"));
const react_1 = __importDefault(require("react"));
const no_transaction_png_1 = __importDefault(require("../../../../public/no-transaction.png"));
const utils_1 = require("../../../utils");
const Printing_1 = require("../../Printing");
const DailyItemSoldContent = ({ dailyItemSoldSummary, siteSettings, isForPrint, }) => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '70%',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            width: '30%',
            align: 'right',
            render: (quantity) => quantity.toLocaleString(),
        },
    ];
    const currentDate = (0, dayjs_1.default)();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        dailyItemSoldSummary.length === 0 && !isForPrint && (react_1.default.createElement("img", { alt: "no transaction", className: "pointer-events-none absolute left-0 top-0 w-full", src: no_transaction_png_1.default })),
        react_1.default.createElement("div", { className: "relative bg-white px-2 pt-2 text-center font-mono text-sm leading-4" },
            react_1.default.createElement(Printing_1.ReceiptHeader, null),
            react_1.default.createElement("br", null),
            react_1.default.createElement("span", { className: "font-bold" }, "DAILY ITEM SOLD SUMMARY"),
            react_1.default.createElement("br", null),
            react_1.default.createElement("br", null),
            dailyItemSoldSummary.length === 0 ? (react_1.default.createElement("div", { className: "py-8 text-center" },
                react_1.default.createElement("span", null, "No items sold today"))) : (react_1.default.createElement(antd_1.Table, { columns: columns, dataSource: dailyItemSoldSummary, pagination: false, rowKey: "name", size: "small", className: "daily-item-sold-table" })),
            react_1.default.createElement("br", null),
            react_1.default.createElement("span", null,
                "Date: ",
                (0, utils_1.formatDate)(currentDate)),
            react_1.default.createElement("br", null),
            react_1.default.createElement("span", null,
                "Time: ",
                (0, utils_1.formatTime)(currentDate)),
            react_1.default.createElement("br", null),
            react_1.default.createElement("br", null),
            react_1.default.createElement(Printing_1.ReceiptFooter, { siteSettings: siteSettings }))));
};
exports.DailyItemSoldContent = DailyItemSoldContent;
