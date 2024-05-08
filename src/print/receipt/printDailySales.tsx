import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { DailySalesContent } from '../../components/modals/ViewDailySalesModal/DailySalesContent';
import { DailySales, SiteSettings, User } from '../../types';
import {
	appendHtmlElement,
	getPageStyleObject,
	print,
} from '../helper-receipt';

export const printDailySales = (
	dailySales: DailySales,
	siteSettings: SiteSettings,
	user?: User,
	isPdf = false,
) => {
	const data = ReactDOMServer.renderToStaticMarkup(
		<div className="container" style={getPageStyleObject()}>
			<DailySalesContent
				dailySales={dailySales}
				siteSettings={siteSettings}
				user={user}
				isForPrint
			/>
		</div>,
	);

	if (isPdf) {
		return appendHtmlElement(data);
	}

	print(data, 'Daily Sales');
};
