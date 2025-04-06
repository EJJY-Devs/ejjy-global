import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ZReadContent } from '../../../components/modals/ViewZReadReportModal/ZReadContent';
import { PrintZReadReport } from './types';
import {
	appendHtmlElement,
	getPageStyleObject,
	print,
} from '../../helper-receipt';

export const printZReadReportHtml = ({
	report,
	siteSettings,
	user,
	isPdf,
}: PrintZReadReport) => {
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
