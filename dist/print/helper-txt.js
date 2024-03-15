"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFooter = exports.writeHeader = void 0;
const utils_1 = require("../utils");
const writeHeader = (reportTextFile, siteSettings, branchMachine, rowNumber, title) => {
    const { contact_number: contactNumber, address_of_tax_payer: location, proprietor, store_name: storeName, tax_type: taxType, tin, } = siteSettings;
    const { name, machine_identification_number: machineID, pos_terminal: posTerminal, } = branchMachine;
    if (storeName) {
        const storeNames = storeName.trim().split('\n');
        storeNames.forEach((item) => {
            reportTextFile.write({
                text: item,
                alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
                rowNumber,
            });
            rowNumber += 1;
        });
    }
    if (location) {
        const locations = location.trim().split('\n');
        locations.forEach((item) => {
            reportTextFile.write({
                text: item,
                alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
                rowNumber,
            });
            rowNumber += 1;
        });
    }
    reportTextFile.write({
        text: `${contactNumber} | ${name}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: proprietor,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `${(0, utils_1.getTaxTypeDescription)(taxType)} | ${tin}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `MIN: ${machineID}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `SN: ${posTerminal}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
        rowNumber,
    });
    rowNumber += 1;
    if (title) {
        rowNumber += 1;
        reportTextFile.write({
            text: `[${title}]`,
            alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
            rowNumber,
        });
    }
    return rowNumber;
};
exports.writeHeader = writeHeader;
const writeFooter = (reportTextFile, siteSettings, rowNumber) => {
    const { software_developer: softwareDeveloper, software_developer_address: softwareDeveloperAddress, software_developer_tin: softwareDeveloperTin, pos_accreditation_number: posAccreditationNumber, pos_accreditation_date: posAccreditationDate, ptu_number: ptuNumber, ptu_date: ptuDate, } = siteSettings;
    reportTextFile.write({
        text: softwareDeveloper,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
        rowNumber,
    });
    rowNumber += 1;
    if (softwareDeveloperAddress) {
        const locations = softwareDeveloperAddress.trim().split('\n');
        locations.forEach((name) => {
            reportTextFile.write({
                text: name,
                alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
                rowNumber,
            });
            rowNumber += 1;
        });
    }
    reportTextFile.write({
        text: softwareDeveloperTin,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `Acc No: ${posAccreditationNumber}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `Date Issued: ${posAccreditationDate}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
        rowNumber,
    });
    rowNumber += 1;
    rowNumber += 1;
    reportTextFile.write({
        text: `PTU No: ${ptuNumber}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
        rowNumber,
    });
    rowNumber += 1;
    reportTextFile.write({
        text: `Date Issued: ${ptuDate}`,
        alignment: utils_1.ReportTextFile.ALIGNMENTS.CENTER,
        rowNumber,
    });
    rowNumber += 1;
    return rowNumber;
};
exports.writeFooter = writeFooter;
