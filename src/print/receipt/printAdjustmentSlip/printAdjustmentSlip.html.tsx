import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ReceiptHeaderV2 } from '../../../components/Printing';
import { formatDateTime, formatQuantity, getFullName } from '../../../utils';
import { EMPTY_CELL } from '../../../globals';
import dayjs from 'dayjs';
import { appendHtmlElement, getPageStyleObject } from '../../helper-receipt';
import { PrintAdjustmentSlip } from './types';

export const printAdjustmentSlipHtml = ({
	adjustmentSlip,
	isPdf = false,
}: PrintAdjustmentSlip) => {
	const data = ReactDOMServer.renderToStaticMarkup(
		<div className="container" style={getPageStyleObject()}>
			<div style={{ textAlign: 'center' }}>
				<ReceiptHeaderV2
					branchHeader={adjustmentSlip.branch}
					title="ADJUSTMENT SLIP"
				/>

				<br />
				<div>Datetime Requested:</div>
				<div>{formatDateTime(adjustmentSlip.datetime_created)}</div>
			</div>

			<br />

			<table style={{ width: '100%', fontSize: '12px' }}>
				<tbody>
					<tr>
						<td>Adjustment Slip ID:</td>
						<td style={{ textAlign: 'right' }}>
							{adjustmentSlip.reference_number || EMPTY_CELL}
						</td>
					</tr>
					<tr>
						<td>Branch:</td>
						<td style={{ textAlign: 'right' }}>
							{adjustmentSlip.branch?.name || 'N/A'}
						</td>
					</tr>
					<tr>
						<td>Encoded By:</td>
						<td style={{ textAlign: 'right' }}>
							{getFullName(adjustmentSlip.encoded_by)}
						</td>
					</tr>
					<tr>
						<td>Date & Time Created:</td>
						<td style={{ textAlign: 'right' }}>
							{formatDateTime(adjustmentSlip.datetime_created)}
						</td>
					</tr>
				</tbody>
			</table>

			<hr />

			<div style={{ marginTop: '16px' }}>
				{adjustmentSlip.products?.map((product, index) => (
					<div key={product.id} style={{ marginBottom: '12px' }}>
						<div style={{ fontWeight: 'bold' }}>
							{product?.branch_product?.product.name}
							{product?.branch_product?.product?.is_vat_exempted
								? ' - VE'
								: ' - V'}
						</div>
						<div style={{ marginLeft: '20px' }}>
							{product.adjusted_value >= 0 ? '+' : ''}{' '}
							{formatQuantity(
								product.adjusted_value,
								product?.branch_product?.product,
							)}
							{product.error_remarks !== 'N/A' && product.error_remarks ? (
								<span> Error - {product.error_remarks}</span>
							) : (
								<span style={{ marginLeft: '16px' }}>
									{product.remarks && product.remarks !== 'N/A'
										? product.remarks
										: 'Spoilage'}
								</span>
							)}
						</div>
						{index < adjustmentSlip.products.length - 1 && <br />}
					</div>
				))}
			</div>

			<br />

			<div style={{ textAlign: 'center' }}>
				<div>Print Details: {dayjs().format('MM/DD/YYYY h:mmA')}</div>
			</div>

			{adjustmentSlip.remarks && (
				<div style={{ textAlign: 'center', marginTop: '8px' }}>
					<div>Overall Remarks: {adjustmentSlip.remarks}</div>
				</div>
			)}
		</div>,
	);

	if (isPdf) {
		return appendHtmlElement(data);
	}

	return data;
};
