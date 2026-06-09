import React from 'react';
import { SpecialDiscountCode } from '../../globals';
import { SiteSettings, Transaction } from '../../types';
type Props = {
    category: string;
    discountCode: SpecialDiscountCode;
    isLoading: boolean;
    siteSettings: SiteSettings;
    transactions: Transaction[];
    transactionsTotal: number;
};
export declare const BirAnnexTransactions: ({ category, discountCode, isLoading, siteSettings, transactions, transactionsTotal, }: Props) => React.JSX.Element;
export {};
