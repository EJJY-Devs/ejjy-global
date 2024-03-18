import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { XReadContent } from '../../components/modals/ViewXReadReportModal/XReadContent';
import { SiteSettings, User, XReadReport } from '../../types';
import {
	appendHtmlElement,
	getPageStyleObject,
	print,
} from '../helper-receipt';

export const printXReadReport = (
	report: XReadReport,
	siteSettings: SiteSettings,
	user: User,
	isPdf = false,
) => {
	const data = ReactDOMServer.renderToStaticMarkup(
		<div className="container" style={getPageStyleObject()}>
			<XReadContent
				report={report}
				siteSettings={siteSettings}
				user={user}
				isForPrint
			/>
		</div>,
	);

	if (isPdf) {
		return appendHtmlElement(data);
	}

	print(data, 'XRead Report');
};
