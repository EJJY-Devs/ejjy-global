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
	branch,
	branchMachine,
	user,
	isPdf = false,
	reportDate,
}: PrintDailyItemSold) => {
	const data = ReactDOMServer.renderToStaticMarkup(
		<div className="container" style={getPageStyleObject()}>
			<DailyItemSoldContent
				dailyItemSoldSummary={dailyItemSoldSummary}
				branch={branch}
				branchMachine={branchMachine}
				user={user}
				reportDate={reportDate}
			/>
		</div>,
	);

	if (isPdf) {
		return appendHtmlElement(data);
	}

	print(data, 'Daily Item Sold Summary');
};
