"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printReceivingVoucherForm = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const globals_1 = require("../../globals");
const utils_1 = require("../../utils");
const helper_receipt_1 = require("../helper-receipt");
const printReceivingVoucherForm = (receivingVoucher, siteSettings, isPdf = false) => {
    /**
     * * The following details are hidden as it is not implemented yet (per Emman):
     * * 1. Invoice #
     */
    const products = receivingVoucher.products;
    const data = `
	<div class="container" style="${(0, helper_receipt_1.getPageStyle)()}">
		${(0, helper_receipt_1.getHeader)(siteSettings, undefined, 'RECEIVING VOUCHER')}

		<br />

		<table style="width: 100%;">
			${products
        .map((item) => `<tr>
						<td colspan="2">${item.product.name} - ${item.product.is_vat_exempted ? globals_1.vatTypes.VAT_EMPTY : globals_1.vatTypes.VATABLE}</td>
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
				<td>TOTAL AMOUNT PAID</td>
				<td style="text-align: right; font-weight: bold;">
					${(0, utils_1.formatInPeso)(receivingVoucher.amount_paid, helper_receipt_1.PESO_SIGN)}
				</td>
			</tr>
		</table>

		<br />

    <div>GDT: ${(0, utils_1.formatDateTime)(receivingVoucher.datetime_created)}</div>
    <div>PDT: ${(0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)}</div>
		<div style="display: flex; align-items: center; justify-content: space-between">
			<span>C: ${receivingVoucher.checked_by.employee_id}</span>
			<span style="text-align: right;">E: ${receivingVoucher.encoded_by.employee_id}</span>
		</div>
		<div>Supplier: ${receivingVoucher.supplier_name}</div>

		<br />

		${(0, helper_receipt_1.getFooter)(siteSettings)}
	</div>
	`;
    if (isPdf) {
        return (0, helper_receipt_1.appendHtmlElement)(data);
    }
    (0, helper_receipt_1.print)(data, 'Receiving Voucher');
};
exports.printReceivingVoucherForm = printReceivingVoucherForm;
