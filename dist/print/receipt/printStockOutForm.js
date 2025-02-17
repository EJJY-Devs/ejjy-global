"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printStockOutForm = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utils_1 = require("../../utils");
const helper_receipt_1 = require("../helper-receipt");
const printStockOutForm = (backOrder, siteSettings, isPdf = false) => {
    /**
     * * The following details are hidden as it is not implemented yet (per Emman):
     * * 1. Supplier
     * * 2. Check/Authorizer
     * * 3. Invoice #
     */
    //    <div style="display: flex; align-items: center; justify-content: space-between">
    //    <span>${formatDateTime(backOrder.datetime_created)}</span>
    //    <span style="text-align: right;">${
    //      backOrder.transaction?.invoice?.or_number || EMPTY_CELL
    //    }</span>
    //  </div>
    //  <div style="display: flex; align-items: center; justify-content: space-between">
    //    <span>C: ${backOrder?.sender?.employee_id || EMPTY_CELL}</span>
    //    <span style="text-align: right;">E: ${
    //      backOrder?.encoded_by?.employee_id || EMPTY_CELL
    //    }</span>
    //  </div>
    //  <div>
    //    <span>Supplier: ${backOrder?.supplier_name || EMPTY_CELL}</span>
    //  </div>
    const products = backOrder === null || backOrder === void 0 ? void 0 : backOrder.products;
    let totalAmount = 0;
    const data = `
	<div style="${(0, helper_receipt_1.getPageStyle)('padding: 24px; width: 380px;')}">
		${(0, helper_receipt_1.getHeader)(siteSettings, undefined, 'DELIVERY RECEIPT')}

		<br />

		<table style="width: 100%;">
			${products
        .map((item) => {
        const subtotal = Number(item.quantity_returned) *
            Number(item.current_price_per_piece);
        totalAmount += subtotal;
        return `<tr>
						<td colspan="2">${item.product.name}</td>
					</tr>
					<tr>
						<td style="padding-left: 30px">${(0, utils_1.formatQuantity)(Number(item.quantity_returned), item.product)} @ ${(0, utils_1.formatInPeso)(item.current_price_per_piece, helper_receipt_1.PESO_SIGN)}</td>
						<td style="text-align: right">
							${(0, utils_1.formatInPeso)(subtotal, helper_receipt_1.PESO_SIGN)}
						</td>
					</tr>`;
    })
        .join('')}
		</table>

		<div style="width: 100%; text-align: right">----------------</div>

		<table style="width: 100%;">
			<tr>
				<td>TOTAL AMOUNT</td>
				<td style="text-align: right; font-weight: bold;">
					${(0, utils_1.formatInPeso)(totalAmount, helper_receipt_1.PESO_SIGN)}
				</td>
			</tr>
		</table>

		<br />

		<div style="display: flex; align-items: center; justify-content: space-between">
			<span>Customer: ${(backOrder === null || backOrder === void 0 ? void 0 : backOrder.customer_name) || helper_receipt_1.EMPTY_CELL}</span>
			<span style="text-align: right;">Encoder: ${(0, utils_1.getFullName)(backOrder === null || backOrder === void 0 ? void 0 : backOrder.encoded_by) || helper_receipt_1.EMPTY_CELL}</span>
		</div>

		<br />
		<div>Remarks: ${backOrder === null || backOrder === void 0 ? void 0 : backOrder.overall_remarks}</div>

		<br />
	<div>GDT: ${(0, utils_1.formatDateTime)(backOrder.datetime_created)}</div>
    <div>PDT: ${(0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)}</div>	
		<br />
	</div>
	`;
    if (isPdf) {
        return (0, helper_receipt_1.appendHtmlElement)(data);
    }
    (0, helper_receipt_1.print)(data, 'Delivery Receipt');
};
exports.printStockOutForm = printStockOutForm;
