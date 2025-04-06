import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { XReadContent } from '../../../components/modals/ViewXReadReportModal/XReadContent';
import {
	appendHtmlElement,
	getPageStyleObject,
	print,
} from '../../helper-receipt';
import { PrintXReadReport } from './types';

export const printXReadReportHtml = ({
	report,
	siteSettings,
	user,
	isPdf = false,
}: PrintXReadReport) => {
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
