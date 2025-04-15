"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptHeader = void 0;
const react_1 = __importDefault(require("react"));
const utils_1 = require("../../utils");
const globalStyles = react_1.default.createElement('style', {}, [
    `
  table {
    font-size: inherit;
  }

  td {
    padding: 0;
  }
  `,
]);
const ReceiptHeader = ({ branchMachine, title }) => {
    const { name, machine_identification_number: machineID, pos_terminal: posTerminal, branch, ptu_date_issued: ptuDateIssued, permit_to_use, } = branchMachine || {};
    return (react_1.default.createElement(react_1.default.Fragment, null,
        globalStyles,
        react_1.default.createElement("div", { style: {
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
            } },
            react_1.default.createElement("span", { style: { whiteSpace: 'pre-line' } }, branch === null || branch === void 0 ? void 0 : branch.store_name),
            react_1.default.createElement("span", { style: { whiteSpace: 'pre-line' } }, branch === null || branch === void 0 ? void 0 : branch.store_address),
            react_1.default.createElement("span", null, [branch === null || branch === void 0 ? void 0 : branch.contact_number, name].filter(Boolean).join(' | ')),
            react_1.default.createElement("span", null, branch === null || branch === void 0 ? void 0 : branch.proprietor),
            react_1.default.createElement("span", null, (0, utils_1.getTaxTypeDescription)(branch === null || branch === void 0 ? void 0 : branch.vat_type)),
            react_1.default.createElement("span", null, branch === null || branch === void 0 ? void 0 : branch.tin),
            machineID && react_1.default.createElement("span", null,
                "MIN: ",
                machineID),
            posTerminal && react_1.default.createElement("span", null,
                "SN: ",
                posTerminal),
            permit_to_use && react_1.default.createElement("span", null,
                "PTU No: ",
                permit_to_use),
            ptuDateIssued && react_1.default.createElement("span", null,
                "Date Issued: ",
                ptuDateIssued),
            title ? react_1.default.createElement("br", null) : '',
            title)));
};
exports.ReceiptHeader = ReceiptHeader;
