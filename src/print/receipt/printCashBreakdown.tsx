import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { CashBreakdownContent } from '../../components/modals/ViewCashBreakdown/CashBreakdownContent';
import { CashBreakdown, SiteSettings, User } from '../../types';
import {
	appendHtmlElement,
	getPageStyleObject,
	print,
} from '../helper-receipt';

export const printCashBreakdown = (
	cashBreakdown: CashBreakdown,
	siteSettings: SiteSettings,
	user?: User,
	isPdf = false,
) => {
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

	print(data, 'Cash Breakdown');
};
