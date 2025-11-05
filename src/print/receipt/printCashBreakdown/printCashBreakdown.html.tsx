import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { CashBreakdownContent } from '../../../components/modals/ViewCashBreakdown/CashBreakdownContent';
import { appendHtmlElement, getPageStyleObject } from '../../helper-receipt';
import { PrintCashBreakdown } from './types';

export const printCashBreakdownHtml = ({
	cashBreakdown,
	siteSettings,
	user,
	isPdf = false,
}: PrintCashBreakdown) => {
	const data = ReactDOMServer.renderToStaticMarkup(
		<div className="container" style={getPageStyleObject()}>
			<CashBreakdownContent
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
