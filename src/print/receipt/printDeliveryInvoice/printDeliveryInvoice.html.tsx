import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { DeliveryInvoiceContent } from '../../../components/modals/ViewDeliveryInvoiceModal/DeliveryInvoiceContent';
import { appendHtmlElement, getPageStyleObject } from '../../helper-receipt';
import { PrintDeliveryInvoice } from './types';

export const printDeliveryInvoiceHtml = ({
	deliveryInvoice,
	siteSettings,
	isReprint = false,
	isPdf = false,
}: PrintDeliveryInvoice) => {
	let data = ReactDOMServer.renderToStaticMarkup(
		<div className="container" style={getPageStyleObject()}>
			<DeliveryInvoiceContent
				deliveryInvoice={deliveryInvoice}
				siteSettings={siteSettings}
				isReprint={isReprint}
			/>
		</div>,
	);

	if (isPdf) {
		data = appendHtmlElement(data);
	}

	return data;
};
