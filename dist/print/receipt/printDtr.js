"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printDtr = void 0;
const utils_1 = require("../../utils");
const helper_receipt_1 = require("../helper-receipt");
const printDtr = (dtr, month) => {
    const { employee, logs } = dtr;
    return `
  <html lang="en">
    <head>
      <style>
        .container, .container > div, .container > table {
          width: 380px !important;
        }

        .container table,
        .container th,
        .container td {
          font-size: 0.9em;
          border: 1px solid black;
          border-collapse: collapse;
        }
      </style>
    </head>
    <body>
      <div class="container" style="${(0, helper_receipt_1.getPageStyle)()}">
        <div
          style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          "
        >
          <span>DAILY TIME RECORD</span>
          <br />
          <span>${(0, utils_1.getFullName)(employee).toUpperCase()}</span>
          <div style="width: 70%; border-bottom: 1px solid black"></div>
          <span>(Name)</span>
        </div>

        <br />

        <div style="display: flex; column-gap: 1ch">
          <span>For the month of</span>
          <div style="flex: 1; border-bottom: 1px solid black; text-align: center">${month}</div>
        </div>

        <table style="margin-top: 8px">
          <thead style="font-size: 0.8em">
            <tr>
              <th rowspan="2">Day</th>
              <th colspan="2">A.M.</th>
              <th colspan="2">P.M.</th>
              <th colspan="2">OVERTIME</th>
            </tr>
            <tr>
              <th style="width: 55px">Arrival</th>
              <th style="width: 55px">Departure</th>
              <th style="width: 55px">Arrival</th>
              <th style="width: 55px">Departure</th>
              <th style="width: 55px">Hours</th>
              <th style="width: 55px">Minutes</th>
            </tr>
          </thead>
          <tbody>
          ${logs
        .map((log) => `
              <tr>
                <td style="text-align: center">${log.day_number}</td>
                <td>${log.am_arrival ? (0, utils_1.formatTimeOnly)(log.am_arrival) : helper_receipt_1.EMPTY_CELL}</td>
                <td>${log.am_departure
        ? (0, utils_1.formatTimeOnly)(log.am_departure)
        : helper_receipt_1.EMPTY_CELL}</td>
                <td>${log.pm_arrival ? (0, utils_1.formatTimeOnly)(log.pm_arrival) : helper_receipt_1.EMPTY_CELL}</td>
                <td>${log.pm_departure
        ? (0, utils_1.formatTimeOnly)(log.pm_departure)
        : helper_receipt_1.EMPTY_CELL}</td>
                <td></td>
                <td></td>
              </tr>`)
        .join('')}

            <tr>
              <td colspan="5" style="text-align: center">
                <strong>TOTAL</strong>
              </td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <br />

        <div
          style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          "
        >
          <span style="text-indent: 2em">
            I certify on my honor that the above is true and correct record of the
            hours of work performed, record of which was made daily at the time of
            arrival and departure from the office.
          </span>
          <br />
          <div style="width: 100%; border-bottom: 1px solid black"></div>
          <span>(Signature)</span>

          <br />
          <span style="align-self: flex-start">
            Verified as to the prescribed office hours
          </span>
          <br />
          <br />
          <div style="width: 100%; border-bottom: 1px solid black"></div>
          <span>(In-charge)</span>
        </div>
      </div>
    </body>
  </html>`;
};
exports.printDtr = printDtr;
