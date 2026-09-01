"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BirHeader = exports.birReportStyles = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const react_1 = __importDefault(require("react"));
const utils_1 = require("../../../utils");
const birReportStyles = (variant = 'wide') => {
    const isWide = variant === 'wide';
    return react_1.default.createElement('style', {}, [
        `
    .bir-reports-pdf {
      ${isWide
            ? 'max-width: 2300px;\n      min-width: 2000px;'
            : 'width: fit-content;\n      max-width: 100%;'}
    }

    .bir-reports-pdf * {
      font-family: Helvetica, monospace;
      font-size: 12px;
    }

    .bir-report-header div.details,
    .bir-report-header .title {
      width: 100%;
    }

    table.bir-reports {
      border-collapse: collapse;
      ${isWide ? 'min-width: 2000px;\n      width: 100%;' : 'width: auto;'}
    }

    table.bir-reports th,
    table.bir-reports .nested-row td {
      min-width: 60px;
    }

    table.bir-reports th[colspan] {
      background-color: #ADB9CA;
    }

    table.bir-reports th,
    table.bir-reports .nested-row td {
      background-color: #BDD6EE;
    }

    table.bir-reports th,
    table.bir-reports td {
      border: 1px solid black;
      text-align: center;
      vertical-align: middle;
      padding: 6px 4px;
      box-sizing: border-box;
      overflow-wrap: break-word;
      word-break: normal;
      line-height: 1.3;
    }

    .bir-reports-pdf .title {
      text-align: center;
      font-weight: bold;
      margin-bottom:4px;
    }
  `,
    ]);
};
exports.birReportStyles = birReportStyles;
const BirHeader = ({ branchMachine, siteSettings, title, user, }) => (react_1.default.createElement("div", { className: "bir-report-header" },
    react_1.default.createElement("div", { className: "details" }, siteSettings.proprietor),
    react_1.default.createElement("div", { className: "details" }, siteSettings.address_of_tax_payer),
    react_1.default.createElement("div", { className: "details" }, siteSettings.tin),
    react_1.default.createElement("br", null),
    react_1.default.createElement("div", { className: "details" }, "V1.0 (Static)"),
    react_1.default.createElement("div", { className: "details" }, branchMachine === null || branchMachine === void 0 ? void 0 : branchMachine.pos_terminal),
    react_1.default.createElement("div", { className: "details" }, branchMachine === null || branchMachine === void 0 ? void 0 : branchMachine.name),
    react_1.default.createElement("div", { className: "details" }, (0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)),
    react_1.default.createElement("div", { className: "details" }, user.employee_id),
    react_1.default.createElement("br", null),
    react_1.default.createElement("div", { className: "title" }, title)));
exports.BirHeader = BirHeader;
