import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ReceivingReportContent } from '../../../components/modals/ViewReceivingReportModal/ReceivingReportContent';
import { appendHtmlElement, getPageStyleObject } from '../../helper-receipt';
import { PrintReceivingReport } from './types';

export const printReceivingReportHtml = ({
	receivingReport,
	isPdf = false,
}: PrintReceivingReport) => {
	const data = ReactDOMServer.renderToStaticMarkup(
		<div className="container" style={getPageStyleObject()}>
			<ReceivingReportContent receivingReport={receivingReport} />
		</div>,
	);

	if (isPdf) {
		return appendHtmlElement(data);
	}

	return data;
};
