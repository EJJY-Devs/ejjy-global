"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BirHeader = exports.birReportStyles = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const react_1 = __importDefault(require("react"));
const utils_1 = require("../../../utils");
exports.birReportStyles = react_1.default.createElement('style', {}, [
    `
    body .bir-reports-pdf {
      font-family: Helvetica, monospace;
      font-size: 12px;
    }

    table.bir-reports,
    div.details,
    .title {
      width: 1990px;
    }

    table.bir-reports {
      border-collapse: collapse;
    }

    table.bir-reports th,
    table.bir-reports .nested-row td {
      min-width: 60px;
      line-height: 100%;
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
    }

    .bir-reports-pdf .title {
      text-align: center;
      font-weight: bold;
    }
  `,
]);
const BirHeader = ({ branchMachine, siteSettings, title, user, }) => (react_1.default.createElement(react_1.default.Fragment, null,
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
    react_1.default.createElement("h4", { className: "title" }, title)));
exports.BirHeader = BirHeader;
