import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { appendHtmlElement, getPageStyleObject } from '../../helper-receipt';
import { PrintOrderOfPayment } from './types';
import { OrderOfPaymentContent } from '../../../components/modals/ViewOrderOfPaymentModal/OrderOfPaymentContent';

export const printOrderOfPaymentHtml = ({
	orderOfPayment,
	isPdf = false,
}: PrintOrderOfPayment) => {
	const data = ReactDOMServer.renderToStaticMarkup(
		<div className="container" style={getPageStyleObject()}>
			<OrderOfPaymentContent orderOfPayment={orderOfPayment} />
		</div>,
	);

	if (isPdf) {
		return appendHtmlElement(data);
	}

	return data;
};
