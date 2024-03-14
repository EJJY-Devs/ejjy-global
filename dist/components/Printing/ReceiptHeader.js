"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptHeader = void 0;
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
const utils_1 = require("../../utils");
const { Text } = antd_1.Typography;
const ReceiptHeader = ({ branchMachine, siteSettings, title, }) => {
    const { contact_number: contactNumber, address_of_tax_payer: location, proprietor, store_name: storeName, tax_type: taxType, tin, } = siteSettings;
    const { name, machine_identification_number: machineID, pos_terminal: posTerminal, } = branchMachine;
    return (react_1.default.createElement(antd_1.Space, { align: "center", className: "w-full text-center", direction: "vertical", size: 0 },
        react_1.default.createElement(Text, { style: { whiteSpace: 'pre-line' } }, storeName),
        react_1.default.createElement(Text, { style: { whiteSpace: 'pre-line' } }, location),
        react_1.default.createElement(Text, null, [contactNumber, name].filter(Boolean).join(' | ')),
        react_1.default.createElement(Text, null, proprietor),
        react_1.default.createElement(Text, null, [(0, utils_1.getTaxTypeDescription)(taxType), tin].filter(Boolean).join(' | ')),
        react_1.default.createElement(Text, null,
            "MIN: ",
            machineID),
        react_1.default.createElement(Text, null,
            "SN: ",
            posTerminal),
        title && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("br", null),
            react_1.default.createElement(Text, null,
                "[",
                title,
                "]")))));
};
exports.ReceiptHeader = ReceiptHeader;
