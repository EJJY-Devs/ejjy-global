import React from 'react';
import { CollectionReceipt, SiteSettings } from '../../../types';
type Props = {
    collectionReceipt: CollectionReceipt;
    siteSettings: SiteSettings;
    onClose: () => void;
};
export declare const ViewCollectionReceipt: ({ collectionReceipt, siteSettings, onClose, }: Props) => React.JSX.Element;
export {};
