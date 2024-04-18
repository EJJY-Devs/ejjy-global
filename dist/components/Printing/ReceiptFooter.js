"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptFooter = void 0;
const react_1 = __importDefault(require("react"));
const ReceiptFooter = ({ siteSettings }) => {
    const { software_developer: softwareDeveloper, software_developer_address: softwareDeveloperAddress, software_developer_tin: softwareDeveloperTin, pos_accreditation_number: posAccreditationNumber, pos_accreditation_date: posAccreditationDate, ptu_number: ptuNumber, ptu_date: ptuDate, } = siteSettings;
    return (react_1.default.createElement("div", { style: {
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
        } },
        react_1.default.createElement("span", null, softwareDeveloper),
        react_1.default.createElement("span", { style: { whiteSpace: 'pre-line' } }, softwareDeveloperAddress),
        react_1.default.createElement("span", null, softwareDeveloperTin),
        react_1.default.createElement("span", null,
            "Acc No: ",
            posAccreditationNumber),
        react_1.default.createElement("span", null,
            "Date Issued: ",
            posAccreditationDate),
        react_1.default.createElement("br", null),
        react_1.default.createElement("span", null,
            "PTU No: ",
            ptuNumber),
        react_1.default.createElement("span", null,
            "Date Issued: ",
            ptuDate)));
};
exports.ReceiptFooter = ReceiptFooter;
