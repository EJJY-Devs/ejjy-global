import React from 'react';
import { SiteSettings, Transaction } from '../../../types';
type Props = {
    transaction: Transaction;
    siteSettings: SiteSettings;
    isReprint?: boolean;
};
export declare const TransactionContent: ({ transaction, siteSettings, isReprint, }: Props) => React.JSX.Element;
export {};
