import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { appendHtmlElement, getPageStyleObject } from '../../helper-receipt';
import { CashCollectionVoucherContent } from './CashCollectionVoucherContent';
import { PrintCashCollection } from './types';

export const printCashCollectionHtml = ({
	cashBreakdown,
	siteSettings,
	user,
	isPdf = false,
}: PrintCashCollection) => {
	const data = ReactDOMServer.renderToStaticMarkup(
		<div className="container" style={getPageStyleObject()}>
			<CashCollectionVoucherContent
				cashBreakdown={cashBreakdown}
				siteSettings={siteSettings}
				user={user}
			/>
		</div>,
	);

	if (isPdf) {
		return appendHtmlElement(data);
	}

	return data;
};
