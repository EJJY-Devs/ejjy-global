import React from 'react';
import { CollectionReceipt, SiteSettings } from '../../../types';
type Props = {
    collectionReceipt: CollectionReceipt;
    siteSettings: SiteSettings;
    onClose: () => void;
};
export declare const ViewCollectionReceiptModal: ({ collectionReceipt, siteSettings, onClose, }: Props) => React.JSX.Element;
export {};
