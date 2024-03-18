"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptHeader = void 0;
const react_1 = __importDefault(require("react"));
const utils_1 = require("../../utils");
const ReceiptHeader = ({ branchMachine, siteSettings, title, }) => {
    const { contact_number: contactNumber, address_of_tax_payer: location, proprietor, store_name: storeName, tax_type: taxType, tin, } = siteSettings;
    const { name, machine_identification_number: machineID, pos_terminal: posTerminal, } = branchMachine;
    return (react_1.default.createElement("div", { style: {
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
        } },
        react_1.default.createElement("span", { style: { whiteSpace: 'pre-line' } }, storeName),
        react_1.default.createElement("span", { style: { whiteSpace: 'pre-line' } }, location),
        react_1.default.createElement("span", null, [contactNumber, name].filter(Boolean).join(' | ')),
        react_1.default.createElement("span", null, proprietor),
        react_1.default.createElement("span", null, [(0, utils_1.getTaxTypeDescription)(taxType), tin].filter(Boolean).join(' | ')),
        react_1.default.createElement("span", null,
            "MIN: ",
            machineID),
        react_1.default.createElement("span", null,
            "SN: ",
            posTerminal),
        title ? react_1.default.createElement("br", null) : '',
        title));
};
exports.ReceiptHeader = ReceiptHeader;
