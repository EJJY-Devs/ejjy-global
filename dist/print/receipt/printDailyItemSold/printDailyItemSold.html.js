"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printDailyItemSoldHtml = void 0;
const react_1 = __importDefault(require("react"));
const server_1 = __importDefault(require("react-dom/server"));
const DailyItemSoldContent_1 = require("../../../components/modals/ViewDailyItemSoldModal/DailyItemSoldContent");
const helper_receipt_1 = require("../../helper-receipt");
const printDailyItemSoldHtml = ({ dailyItemSoldSummary, siteSettings, user, isPdf = false, }) => {
    const data = server_1.default.renderToStaticMarkup(react_1.default.createElement("div", { className: "container", style: (0, helper_receipt_1.getPageStyleObject)() },
        react_1.default.createElement(DailyItemSoldContent_1.DailyItemSoldContent, { dailyItemSoldSummary: dailyItemSoldSummary, siteSettings: siteSettings, user: user, isForPrint: true })));
    if (isPdf) {
        return (0, helper_receipt_1.appendHtmlElement)(data);
    }
    (0, helper_receipt_1.print)(data, 'Daily Item Sold Summary');
};
exports.printDailyItemSoldHtml = printDailyItemSoldHtml;
