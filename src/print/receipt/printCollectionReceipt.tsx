import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { CollectionReceiptContent } from '../../components/modals/ViewCollectionReceiptModal/CollectionReceiptContent';
import { CollectionReceipt, SiteSettings } from '../../types';
import {
	appendHtmlElement,
	getPageStyleObject,
	print,
} from '../helper-receipt';

export const printCollectionReceipt = (
	collectionReceipt: CollectionReceipt,
	siteSettings: SiteSettings,
	isPdf = false,
) => {
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

	print(data, 'Collection Receipt');
};
