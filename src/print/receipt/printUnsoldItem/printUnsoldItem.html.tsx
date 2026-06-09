import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { UnsoldItemContent } from '../../../components/modals/ViewUnsoldItemModal/UnsoldItemContent';
import {
	appendHtmlElement,
	getPageStyleObject,
} from '../../helper-receipt';
import { PrintUnsoldItem } from './types';

// eslint-disable-next-line react-refresh/only-export-components
export const printUnsoldItemHtml = ({
	unsoldItemSummary,
	branch,
	branchMachine,
	user,
	isPdf = false,
	reportDate,
}: PrintUnsoldItem) => {
	const data = ReactDOMServer.renderToStaticMarkup(
		<div className="container" style={getPageStyleObject()}>
			<UnsoldItemContent
				unsoldItemSummary={unsoldItemSummary}
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

	return data;
};
