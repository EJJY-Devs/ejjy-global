import React from 'react';
import { SpecialDiscountCode } from '../../globals';
import { SiteSettings, Transaction } from '../../types';
type Props = {
    transactions: Transaction[];
    transactionsTotal: number;
    discountCode: SpecialDiscountCode;
    category: string;
    isLoading: boolean;
    siteSettings: SiteSettings;
};
export declare const BirAnnexTransactions: ({ transactions, transactionsTotal, category, discountCode, siteSettings, isLoading, }: Props) => React.JSX.Element;
export {};
