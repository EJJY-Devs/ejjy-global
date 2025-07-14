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
const ReceiptHeader = ({ branchMachine, title, branchHeader, }) => {
    var _a, _b, _c, _d, _e, _f;
    const { name, machine_identification_number: machineID, pos_terminal: posTerminal, branch, ptu_date_issued: ptuDateIssued, permit_to_use, } = branchMachine || {};
    console.log('branchHeader', branchHeader);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        globalStyles,
        react_1.default.createElement("div", { style: {
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
            } },
            react_1.default.createElement("span", { style: { whiteSpace: 'pre-line' } }, (_a = (branch !== null && branch !== void 0 ? branch : branchHeader)) === null || _a === void 0 ? void 0 : _a.store_name),
            react_1.default.createElement("span", { style: { whiteSpace: 'pre-line' } }, (_b = (branch !== null && branch !== void 0 ? branch : branchHeader)) === null || _b === void 0 ? void 0 : _b.store_address),
            react_1.default.createElement("span", null, [(_c = (branch !== null && branch !== void 0 ? branch : branchHeader)) === null || _c === void 0 ? void 0 : _c.contact_number, name]
                .filter(Boolean)
                .join(' | ')),
            react_1.default.createElement("span", null, (_d = (branch !== null && branch !== void 0 ? branch : branchHeader)) === null || _d === void 0 ? void 0 : _d.proprietor),
            react_1.default.createElement("span", null, [
                (0, utils_1.getTaxTypeDescription)((_e = (branch !== null && branch !== void 0 ? branch : branchHeader)) === null || _e === void 0 ? void 0 : _e.vat_type),
                (_f = (branch !== null && branch !== void 0 ? branch : branchHeader)) === null || _f === void 0 ? void 0 : _f.tin,
            ]
                .filter(Boolean)
                .join(' | ')),
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
