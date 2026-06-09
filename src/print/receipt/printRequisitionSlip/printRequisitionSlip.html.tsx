import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { RequisitionSlipContent } from '../../../components/modals/ViewRequisitionSlipModal/RequisitionSlipContent';
import { appendHtmlElement, getPageStyleObject } from '../../helper-receipt';
import { PrintRequisitionSlip } from './types';

export const printRequisitionSlipHtml = ({
	requisitionSlip,
	user,
	isPdf = false,
}: PrintRequisitionSlip) => {
	const data = ReactDOMServer.renderToStaticMarkup(
		<div className="container" style={getPageStyleObject()}>
			<RequisitionSlipContent
				requisitionSlip={requisitionSlip}
				user={user}
			/>
		</div>,
	);

	if (isPdf) {
		return appendHtmlElement(data);
	}

	return data;
};
