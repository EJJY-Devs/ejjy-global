"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptFooter = void 0;
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
const { Text } = antd_1.Typography;
const ReceiptFooter = ({ siteSettings }) => {
    const { software_developer: softwareDeveloper, software_developer_address: softwareDeveloperAddress, software_developer_tin: softwareDeveloperTin, pos_accreditation_number: posAccreditationNumber, pos_accreditation_date: posAccreditationDate, ptu_number: ptuNumber, ptu_date: ptuDate, } = siteSettings;
    return (react_1.default.createElement(antd_1.Space, { align: "center", className: "mt-8 w-full text-center", direction: "vertical", size: 0 },
        react_1.default.createElement(Text, null, softwareDeveloper),
        react_1.default.createElement(Text, { style: { whiteSpace: 'pre-line' } }, softwareDeveloperAddress),
        react_1.default.createElement(Text, null, softwareDeveloperTin),
        react_1.default.createElement(Text, null,
            "Acc No: ",
            posAccreditationNumber),
        react_1.default.createElement(Text, null,
            "Date Issued: ",
            posAccreditationDate),
        react_1.default.createElement("br", null),
        react_1.default.createElement(Text, null,
            "PTU No: ",
            ptuNumber),
        react_1.default.createElement(Text, null,
            "Date Issued: ",
            ptuDate)));
};
exports.ReceiptFooter = ReceiptFooter;
