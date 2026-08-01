"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printEmployeeCode = void 0;
const printEmployeeCode = (name, barcode, qrCode) => `
    <div
      style="
        width: 56mm;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      "
    >
      <div style="
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        word-break: break-word;
        margin: 0 0 2mm;
      ">${name}</div>
      <img width="100" style="display: block; margin-bottom: 2mm;" src="${barcode}" />
      <img width="100" style="display: block;" src="${qrCode}" />
    </div>
  `;
exports.printEmployeeCode = printEmployeeCode;
