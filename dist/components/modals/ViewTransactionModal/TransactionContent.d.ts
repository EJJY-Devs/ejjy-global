import React from 'react';
import { SiteSettings, Transaction } from '../../../types';
type Props = {
    transaction: Transaction;
    siteSettings: SiteSettings;
    isReprint?: boolean;
};
export declare const getTransactionData: (transaction: Transaction) => {
    title: string;
    fields: Record<string, string | undefined>[];
    change: number;
    previousTransactionOrNumber: string;
    newTransactionOrNumber: string;
};
export declare const TransactionContent: ({ transaction, siteSettings, isReprint, }: Props) => React.JSX.Element;
export {};
