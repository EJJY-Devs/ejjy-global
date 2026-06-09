import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { DeliveryReceiptContent } from '../../../components/modals/ViewDeliveryReceiptModal/DeliveryReceiptContent';
import { appendHtmlElement, getPageStyleObject } from '../../helper-receipt';
import { PrintDeliveryReceipt } from './types';

export const printDeliveryReceiptHtml = ({
	deliveryReceipt,
	isPdf = false,
}: PrintDeliveryReceipt) => {
	const data = ReactDOMServer.renderToStaticMarkup(
		<div className="container" style={getPageStyleObject()}>
			<DeliveryReceiptContent deliveryReceipt={deliveryReceipt} />
		</div>,
	);

	if (isPdf) {
		return appendHtmlElement(data);
	}

	return data;
};
