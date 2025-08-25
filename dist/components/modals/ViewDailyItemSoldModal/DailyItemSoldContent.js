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
const Printing_1 = require("../../Printing");
const DailyItemSoldContent = ({ dailyItemSoldSummary, branch, branchMachine, isForPrint, }) => {
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
            align: 'center',
            render: (quantity) => quantity.toLocaleString(),
        },
    ];
    const currentDate = (0, dayjs_1.default)();
    const currentDateTime = currentDate.format('MM/DD/YYYY hh:mm A');
    return (react_1.default.createElement(react_1.default.Fragment, null,
        dailyItemSoldSummary.length === 0 && !isForPrint && (react_1.default.createElement("img", { alt: "no transaction", className: "pointer-events-none absolute left-0 top-0 w-full", src: no_transaction_png_1.default })),
        react_1.default.createElement("div", { className: "relative bg-white px-2 pt-2 text-center font-mono text-sm leading-4" },
            react_1.default.createElement(Printing_1.ReceiptHeaderV2, { branchMachine: branchMachine, branchHeader: branch }),
            react_1.default.createElement("br", null),
            react_1.default.createElement("strong", null, "DAILY ITEM SOLD"),
            react_1.default.createElement("br", null),
            react_1.default.createElement("br", null),
            dailyItemSoldSummary.length === 0 ? (react_1.default.createElement("div", { className: "py-8 text-center" },
                react_1.default.createElement("span", null, "No items sold today"))) : (react_1.default.createElement(antd_1.Table, { columns: columns, dataSource: dailyItemSoldSummary, pagination: false, rowKey: "name", size: "small", className: "daily-item-sold-table" })),
            react_1.default.createElement("br", null),
            react_1.default.createElement("span", null,
                "PDT: ",
                currentDateTime),
            react_1.default.createElement("br", null),
            react_1.default.createElement("br", null))));
};
exports.DailyItemSoldContent = DailyItemSoldContent;
