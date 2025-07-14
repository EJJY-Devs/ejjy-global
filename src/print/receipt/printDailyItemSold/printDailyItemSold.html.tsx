import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { DailyItemSoldContent } from '../../../components/modals/ViewDailyItemSoldModal/DailyItemSoldContent';
import {
	appendHtmlElement,
	getPageStyleObject,
	print,
} from '../../helper-receipt';
import { PrintDailyItemSold } from './types';

export const printDailyItemSoldHtml = ({
	dailyItemSoldSummary,
	siteSettings,
	user,
	isPdf = false,
}: PrintDailyItemSold) => {
	const data = ReactDOMServer.renderToStaticMarkup(
		<div className="container" style={getPageStyleObject()}>
			<DailyItemSoldContent
				dailyItemSoldSummary={dailyItemSoldSummary}
				siteSettings={siteSettings}
				user={user}
				isForPrint
			/>
		</div>,
	);

	if (isPdf) {
		return appendHtmlElement(data);
	}

	print(data, 'Daily Item Sold Summary');
};
