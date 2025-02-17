"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printOrderSlip = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const globals_1 = require("../../globals");
const utils_1 = require("../../utils");
const helper_receipt_1 = require("../helper-receipt");
// TODO: Finalize once feature is back
const printOrderSlip = (orderSlip, products, user, quantityType, siteSettings, isPdf = false) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    const data = `
		<div className="container" style="${(0, helper_receipt_1.getPageStyle)()}">
    ${(0, helper_receipt_1.getHeader)(siteSettings, undefined, 'ORDER SLIP')}

			<br />

			<table style="width: 100%;">
				<tr>
					<td>Date & Time Requested:</td>
					<td style="text-align: right">${(0, utils_1.formatDateTime)(orderSlip === null || orderSlip === void 0 ? void 0 : orderSlip.datetime_created)}</td>
				</tr>
				<tr>
					<td>Requesting Branch:</td>
					<td style="text-align: right">${(_c = (_b = (_a = orderSlip === null || orderSlip === void 0 ? void 0 : orderSlip.requisition_slip) === null || _a === void 0 ? void 0 : _a.requesting_user) === null || _b === void 0 ? void 0 : _b.branch) === null || _c === void 0 ? void 0 : _c.name}</td>
				</tr>
				<tr>
					<td>Created By:</td>
					<td style="text-align: right">${(_e = (_d = orderSlip === null || orderSlip === void 0 ? void 0 : orderSlip.requisition_slip) === null || _d === void 0 ? void 0 : _d.requesting_user) === null || _e === void 0 ? void 0 : _e.first_name} ${(_g = (_f = orderSlip === null || orderSlip === void 0 ? void 0 : orderSlip.requisition_slip) === null || _f === void 0 ? void 0 : _f.requesting_user) === null || _g === void 0 ? void 0 : _g.last_name}</td>
				</tr>
				<tr>
					<td>F-RS1:</td>
					<td style="text-align: right">${(_h = orderSlip === null || orderSlip === void 0 ? void 0 : orderSlip.requisition_slip) === null || _h === void 0 ? void 0 : _h.id}</td>
				</tr>
				<tr>
					<td>F-OS1:</td>
					<td style="text-align: right">${orderSlip.id}</td>
				</tr>
				<tr>
					<td>Status:</td>
					<td style="text-align: right">${(0, utils_1.getOrderSlipStatusBranchManagerText)((_j = orderSlip === null || orderSlip === void 0 ? void 0 : orderSlip.status) === null || _j === void 0 ? void 0 : _j.value, ((_k = orderSlip === null || orderSlip === void 0 ? void 0 : orderSlip.status) === null || _k === void 0 ? void 0 : _k.percentage_fulfilled) * 100, (_l = orderSlip === null || orderSlip === void 0 ? void 0 : orderSlip.delivery_receipt) === null || _l === void 0 ? void 0 : _l.status)}</td>
				</tr>
			</table>

			<br />
			<br />

			<table style="width: 100%;">
				<thead>
					<tr>
						<th style="text-align: left; font-weight: normal">NAME</th>
						<th style="text-align: center; font-weight: normal">QTY REQUESTED<br/>(${quantityType === globals_1.quantityTypes.PIECE ? 'PCS' : 'BULK'})</th>
						<th style="text-align: right; font-weight: normal">QTY SERVED</th>
					</tr>
				</thead>
				<tbody>
					${products
        .map((product) => `
							<tr>
								<td>
									<span style="display:block">${product.name}</span>
									<small>${product.barcode || product.selling_barcode}</small>
								</td>

								<td style="text-align: center">
									${product.ordered}
								</td>

								<td style="text-align: right">
									<div style="width: 50pt; height: 12pt; border: 0.1pt solid #898989; margin-left: auto;"></div>
								</td>
							</tr>
						`)
        .join('')}
				</tbody>
			</table>

			<br/>
			<br/>

			<table style="width: 100%;">
				<tr>
					<td>Date & Time Printed:</td>
					<td style="text-align: right">${(0, dayjs_1.default)().format('MM/DD/YYYY h:mmA')}</td>
				</tr>
				<tr>
					<td>Printed By:</td>
					<td style="text-align: right">${(0, utils_1.getFullName)(user)}</td>
				</tr>
			</table>
		</div>
	`;
    if (isPdf) {
        return (0, helper_receipt_1.appendHtmlElement)(data);
    }
    (0, helper_receipt_1.print)(data, 'Order Slip');
};
exports.printOrderSlip = printOrderSlip;
