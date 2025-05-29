"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printReceivingReportHtml = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utils_1 = require("../../../utils");
const helper_receipt_1 = require("../../helper-receipt");
const printReceivingReportHtml = ({ receivingReport, siteSettings, isPdf = false, }) => {
    const products = receivingReport === null || receivingReport === void 0 ? void 0 : receivingReport.receiving_voucher_products;
    const data = `
	<div className="container" style="${(0, helper_receipt_1.getPageStyle)()}">
		${(0, helper_receipt_1.getHeader)(siteSettings, undefined, 'RECEIVING REPORT', receivingReport.branch)}

		<br />

		<table style="width: 100%;">
			${products
        .map((item) => `<tr>
						<td colspan="2">
							${item.product.name}
						</td>
					</tr>
					<tr>
						<td colspan="2" style="padding-left: 30px;">
							${(0, utils_1.formatQuantity)(item.quantity, item.product)}
						</td>
					</tr>`)
        .join('')}
		</table>

		<br />

		<div style="display: flex; align-items: center; justify-content: space-between">
			<span>Encoder: ${(0, utils_1.getFullName)(receivingReport === null || receivingReport === void 0 ? void 0 : receivingReport.encoded_by) || helper_receipt_1.EMPTY_CELL}</span>
			<span style="text-align: right;">Inspector: ${(0, utils_1.getFullName)(receivingReport.checked_by) || helper_receipt_1.EMPTY_CELL}</span>
		</div>

		<br />
		<div>Vendor: ${receivingReport.supplier_name}</div>

		<br />
		<div>GDT: ${(0, utils_1.formatDateTime)(receivingReport.datetime_created)}</div>
		<div>PDT: ${(0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)}</div>
		<br />
	</div>
	`;
    if (isPdf) {
        return (0, helper_receipt_1.appendHtmlElement)(data);
    }
    (0, helper_receipt_1.print)(data, 'Receiving Report');
};
exports.printReceivingReportHtml = printReceivingReportHtml;
