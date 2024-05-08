import React from 'react';
import { SiteSettings, Transaction } from '../../../types';
type Props = {
    transaction: Transaction | number;
    siteSettings: SiteSettings;
    onClose: () => void;
};
export declare const ViewTransactionModal: ({ transaction, siteSettings, onClose, }: Props) => React.JSX.Element;
export {};
