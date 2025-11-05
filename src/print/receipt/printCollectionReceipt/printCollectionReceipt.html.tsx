import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { CollectionReceiptContent } from '../../../components/modals/ViewCollectionReceiptModal/CollectionReceiptContent';
import { appendHtmlElement, getPageStyleObject } from '../../helper-receipt';
import { PrintCollectionReceipt } from './types';

export const printCollectionReceiptHtml = ({
	collectionReceipt,
	siteSettings,
	isPdf = false,
}: PrintCollectionReceipt) => {
	const data = ReactDOMServer.renderToStaticMarkup(
		<div className="container" style={getPageStyleObject()}>
			<CollectionReceiptContent
				collectionReceipt={collectionReceipt}
				siteSettings={siteSettings}
			/>
		</div>,
	);

	if (isPdf) {
		return appendHtmlElement(data);
	}

	return data;
};
