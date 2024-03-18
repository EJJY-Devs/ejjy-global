import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { TransactionContent } from '../../components/modals/ViewTransactionModal/TransactionContent';
import { SiteSettings, Transaction } from '../../types';
import {
	appendHtmlElement,
	getPageStyleObject,
	print,
} from '../helper-receipt';

export const printSalesInvoice = (
	transaction: Transaction,
	siteSettings: SiteSettings,
	isReprint = false,
	isPdf = false,
) => {
	const data = ReactDOMServer.renderToStaticMarkup(
		<div className="container" style={getPageStyleObject()}>
			<TransactionContent
				transaction={transaction}
				siteSettings={siteSettings}
				isReprint={isReprint}
			/>
		</div>,
	);

	if (isPdf) {
		return appendHtmlElement(data);
	}

	print(data, 'Sales Invoice');
};
