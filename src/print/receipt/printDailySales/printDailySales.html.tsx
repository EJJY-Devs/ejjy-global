import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { DailySalesContent } from '../../../components/modals/ViewDailySalesModal/DailySalesContent';
import {
	appendHtmlElement,
	getPageStyleObject,
	print,
} from '../../helper-receipt';
import { PrintDailySales } from './types';

export const printDailySalesHtml = ({
	dailySales,
	siteSettings,
	user,
	isPdf = false,
}: PrintDailySales) => {
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
