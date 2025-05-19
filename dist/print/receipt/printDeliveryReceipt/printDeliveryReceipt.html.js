"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printDeliveryReceiptHtml = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utils_1 = require("../../../utils");
const helper_receipt_1 = require("../../helper-receipt");
const printDeliveryReceiptHtml = ({ deliveryReceipt, siteSettings, isPdf = false, }) => {
    const products = deliveryReceipt === null || deliveryReceipt === void 0 ? void 0 : deliveryReceipt.products;
    const data = `
	<div className="container" style="${(0, helper_receipt_1.getPageStyle)()}">
		${(0, helper_receipt_1.getHeader)(siteSettings, undefined, 'DELIVERY RECEIPT', deliveryReceipt.branch)}

		<br />

		<table style="width: 100%; border-collapse: collapse;">
			<thead>
				<tr>
					<th style="text-align: left;">Product Name</th>
					<th style="text-align: center;">Quantity</th>
				</tr>
				<tr>
					<td colspan="2" style="border-bottom: 1px solid black;"></td>
				</tr>
			</thead>
			<tbody>
				${products
        .map((item) => `
							<tr>
								<td>${item.product.name}</td>
								<td style="text-align: center;">
									${(0, utils_1.formatQuantity)(Number(item.quantity_returned), item.product)}
								</td>
							</tr>
						`)
        .join('')}
			</tbody>
		</table>

		<br />

		<div style="display: flex; align-items: center; justify-content: space-between">
			<span>Customer: ${(deliveryReceipt === null || deliveryReceipt === void 0 ? void 0 : deliveryReceipt.customer_name) || helper_receipt_1.EMPTY_CELL}</span>
			<span style="text-align: right;">Encoder: ${(0, utils_1.getFullName)(deliveryReceipt === null || deliveryReceipt === void 0 ? void 0 : deliveryReceipt.encoded_by) || helper_receipt_1.EMPTY_CELL}</span>
		</div>

		<br />
		<div>Remarks: ${deliveryReceipt === null || deliveryReceipt === void 0 ? void 0 : deliveryReceipt.overall_remarks}</div>

		<br />
		<div>GDT: ${(0, utils_1.formatDateTime)(deliveryReceipt === null || deliveryReceipt === void 0 ? void 0 : deliveryReceipt.datetime_created)}</div>
		<div>PDT: ${(0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)}</div>	
		<br />
	</div>
	`;
    if (isPdf) {
        return (0, helper_receipt_1.appendHtmlElement)(data);
    }
    (0, helper_receipt_1.print)(data, 'Delivery Receipt');
};
exports.printDeliveryReceiptHtml = printDeliveryReceiptHtml;
