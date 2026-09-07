import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { appendHtmlElement, getPageStyleObject } from '../../helper-receipt';
import { CashInVoucherContent } from './CashInVoucherContent';
import { PrintCashIn } from './types';

export const printCashInHtml = ({
	cashBreakdown,
	siteSettings,
	user,
	isPdf = false,
}: PrintCashIn) => {
	const data = ReactDOMServer.renderToStaticMarkup(
		<div className="container" style={getPageStyleObject()}>
			<CashInVoucherContent
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
