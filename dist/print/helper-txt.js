"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = exports.getTxtItemBlock = exports.getTxtFooter = exports.getTxtPrintDetails = exports.getTxtHeader = exports.TXT_DIVIDER = exports.TXT_NBSP = exports.TXT_LINE_BREAK = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utils_1 = require("../utils");
exports.TXT_LINE_BREAK = '';
exports.TXT_NBSP = ' ';
exports.TXT_DIVIDER = '----------------------------------------------------------------------';
const getTxtHeader = ({ title, branchMachine, siteSettings, }) => {
    const { contact_number: contactNumber, address_of_tax_payer: location = '', proprietor, store_name: storeName = '', tax_type: taxType, tin, } = siteSettings;
    const { name, machine_identification_number: machineID, pos_terminal: posTerminal, } = branchMachine;
    const storeNames = storeName
        .trim()
        .split('\n')
        .map((item) => item);
    const locations = location
        .trim()
        .split('\n')
        .map((item) => item);
    return [
        ...storeNames,
        ...locations,
        [contactNumber, name].filter(Boolean).join(' | '),
        proprietor,
        [(0, utils_1.getTaxTypeDescription)(taxType), tin].filter(Boolean).join(' | '),
        `MIN: ${machineID}`,
        `SN: ${posTerminal}`,
        exports.TXT_LINE_BREAK,
        title,
    ]
        .filter(Boolean)
        .filter((row) => typeof row === 'string')
        .map((data) => ({ center: data }));
};
exports.getTxtHeader = getTxtHeader;
const getTxtPrintDetails = (user) => {
    const rowData = [];
    if (user) {
        rowData.push({
            left: `PDT: ${(0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)} ${user === null || user === void 0 ? void 0 : user.employee_id}`,
        });
    }
    return rowData;
};
exports.getTxtPrintDetails = getTxtPrintDetails;
const getTxtFooter = (siteSettings) => {
    const { software_developer: softwareDeveloper, software_developer_address: softwareDeveloperAddress = '', software_developer_tin: softwareDeveloperTin, pos_accreditation_number: posAccreditationNumber, pos_accreditation_date: posAccreditationDate, ptu_number: ptuNumber, ptu_date: ptuDate, } = siteSettings;
    const locations = softwareDeveloperAddress
        .trim()
        .split('\n')
        .map((item) => item);
    return [
        softwareDeveloper,
        ...locations,
        softwareDeveloperTin,
        `Acc No: ${posAccreditationNumber}`,
        `Date Issued: ${posAccreditationDate}`,
        exports.TXT_LINE_BREAK,
        `PTU No: ${ptuNumber}`,
        `Date Issued: ${ptuDate}`,
    ]
        .filter((row) => typeof row === 'string')
        .map((data) => ({ center: data }));
};
exports.getTxtFooter = getTxtFooter;
const getTxtItemBlock = (items) => items.map((item) => ({
    left: item.label,
    right: item.value,
}));
exports.getTxtItemBlock = getTxtItemBlock;
const writeFile = (rowData, reportTextFile) => {
    let rowNumber = 0;
    rowData.forEach((row) => {
        if (typeof row === 'string') {
            reportTextFile.write({
                text: row,
                alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
                rowNumber,
            });
        }
        else {
            if (row === null || row === void 0 ? void 0 : row.left) {
                reportTextFile.write({
                    text: row.left.toString(),
                    alignment: utils_1.ReportTextFile.ALIGNMENTS.LEFT,
                    rowNumber,
                });
            }
            if (row === null || row === void 0 ? void 0 : row.center) {
                reportTextFile.write({
                    text: row.center.toString(),
                    alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
                    rowNumber,
                });
            }
            if (row === null || row === void 0 ? void 0 : row.right) {
                reportTextFile.write({
                    text: row.right.toString(),
                    alignment: utils_1.ReportTextFile.ALIGNMENTS.RIGHT,
                    rowNumber,
                });
            }
        }
        rowNumber += 1;
    });
};
exports.writeFile = writeFile;
