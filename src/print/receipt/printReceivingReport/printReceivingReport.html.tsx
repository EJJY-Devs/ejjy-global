import dayjs from 'dayjs';
import { formatDateTime, formatQuantity, getFullName } from '../../../utils';
import {
	EMPTY_CELL,
	appendHtmlElement,
	getHeader,
	getPageStyle,
	print,
} from '../../helper-receipt';
import { PrintReceivingReport } from './types';

export const printReceivingReportHtml = ({
	receivingReport,
	siteSettings,
	isPdf = false,
}: PrintReceivingReport) => {
	const products = receivingReport?.receiving_voucher_products;

	const data = `
	<div className="container" style="${getPageStyle()}">
		${getHeader(siteSettings, undefined, 'RECEIVING REPORT', receivingReport.branch)}

		<br />

		<table style="width: 100%;">
			${products
				.map(
					(item) => `<tr>
						<td colspan="2">
							${item.product.name}
						</td>
					</tr>
					<tr>
						<td colspan="2" style="padding-left: 30px;">
							${formatQuantity(item.quantity, item.product)}
						</td>
					</tr>`,
				)
				.join('')}
		</table>

		<br />

		<div style="display: flex; align-items: center; justify-content: space-between">
			<span>Encoder: ${getFullName(receivingReport?.encoded_by) || EMPTY_CELL}</span>
			<span style="text-align: right;">Inspector: ${
				getFullName(receivingReport.checked_by) || EMPTY_CELL
			}</span>
		</div>

		<br />
		<div>Vendor: ${receivingReport.supplier_name}</div>

		<br />
		<div>GDT: ${formatDateTime(receivingReport.datetime_created)}</div>
		<div>PDT: ${formatDateTime(dayjs(), false)}</div>
		<br />
	</div>
	`;

	if (isPdf) {
		return appendHtmlElement(data);
	}

	print(data, 'Receiving Report');
};
