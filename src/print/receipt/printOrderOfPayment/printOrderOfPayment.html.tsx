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
		// Order of Payment is the one PF B document laid out for A4 1/2
		// Crosswise (landscape half-sheet), not the narrow receipt column
		// every other item here uses — OrderOfPaymentContent's flex rows and
		// justified paragraph assume that width. 794px matches an A4 sheet's
		// full width (the dimension a crosswise cut preserves).
		return appendHtmlElement(data, 794);
	}

	return data;
};
