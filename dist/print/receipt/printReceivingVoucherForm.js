"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printReceivingVoucherForm = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utils_1 = require("../../utils");
const helper_receipt_1 = require("../helper-receipt");
const printReceivingVoucherForm = (receivingVoucher, siteSettings, isPdf = false) => {
    /**
     * * The following details are hidden as it is not implemented yet (per Emman):
     * * 1. Invoice #
     */
    const products = receivingVoucher === null || receivingVoucher === void 0 ? void 0 : receivingVoucher.products;
    const data = `
	<div style="${(0, helper_receipt_1.getPageStyle)('padding: 24px; width: 380px;')}">
		${(0, helper_receipt_1.getHeader)(siteSettings, undefined, 'RECEIVING REPORT')}

		<br />

		<table style="width: 100%;">
			${products
        .map((item) => `<tr>
						<td colspan="2">
							${item.product.name}
						</td>
					</tr>
					<tr>
						<td style="padding-left: 30px">${(0, utils_1.formatQuantity)(item.quantity, item.product)} @ ${(0, utils_1.formatInPeso)(item.cost_per_piece, helper_receipt_1.PESO_SIGN)}</td>
						<td style="text-align: right">
							${(0, utils_1.formatInPeso)(Number(item.quantity) * Number(item.cost_per_piece), helper_receipt_1.PESO_SIGN)}
						</td>
					</tr>`)
        .join('')}
		</table>

		<div style="width: 100%; text-align: right">----------------</div>

		<table style="width: 100%;">
			<tr>
				<td>TOTAL AMOUNT</td>
				<td style="text-align: right; font-weight: bold;">
					${(0, utils_1.formatInPeso)(receivingVoucher.amount_paid, helper_receipt_1.PESO_SIGN)}
				</td>
			</tr>
		</table>

		<br />

		<div style="display: flex; align-items: center; justify-content: space-between">
			<span>Encoder: ${(0, utils_1.getFullName)(receivingVoucher === null || receivingVoucher === void 0 ? void 0 : receivingVoucher.encoded_by) || helper_receipt_1.EMPTY_CELL}</span>
			<span style="text-align: right;">Inspector: ${(0, utils_1.getFullName)(receivingVoucher.checked_by) || helper_receipt_1.EMPTY_CELL}</span>
		</div>

		<br />
		<div>Vendor: ${receivingVoucher.supplier_name}</div>

		<br />
	<div>GDT: ${(0, utils_1.formatDateTime)(receivingVoucher.datetime_created)}</div>
    <div>PDT: ${(0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)}</div>
		<br />
	</div>
	`;
    if (isPdf) {
        return (0, helper_receipt_1.appendHtmlElement)(data);
    }
};
exports.printReceivingVoucherForm = printReceivingVoucherForm;
