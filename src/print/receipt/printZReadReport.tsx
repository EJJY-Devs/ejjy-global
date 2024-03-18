import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ZReadContent } from '../../components/modals/ViewZReadReportModal/ZReadContent';
import { SiteSettings, User, ZReadReport } from '../../types';
import {
	appendHtmlElement,
	getPageStyleObject,
	print,
} from '../helper-receipt';

export const printZReadReport = (
	report: ZReadReport,
	siteSettings: SiteSettings,
	user: User,
	isPdf = false,
) => {
	const data = ReactDOMServer.renderToStaticMarkup(
		<div className="container" style={getPageStyleObject()}>
			<ZReadContent
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

	print(data, 'ZRead Report');
};
