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
      <h4>${name}</h4>
      <img width="100" src="${barcode}" />
      <img width="100" src="${qrCode}" />
    </div>
  `;
exports.printEmployeeCode = printEmployeeCode;
