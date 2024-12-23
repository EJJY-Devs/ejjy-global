import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { TransactionContent } from '../../../components/modals/ViewTransactionModal/TransactionContent';
import { appendHtmlElement, getPageStyleObject } from '../../helper-receipt';
import { PrintSalesInvoice } from './types';

export const printSalesInvoiceHtml = ({
	transaction,
	siteSettings,
	isReprint = false,
	isPdf = false,
}: PrintSalesInvoice) => {
	let data = ReactDOMServer.renderToStaticMarkup(
		<div className="container" style={getPageStyleObject()}>
			<TransactionContent
				transaction={transaction}
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
