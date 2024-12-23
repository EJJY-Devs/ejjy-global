import React from 'react';
import { ServiceOptions } from '../../../hooks/inteface';
import { SiteSettings, Transaction } from '../../../types';
type Props = {
    transaction: Transaction | number;
    siteSettings: SiteSettings;
    serviceOptions?: ServiceOptions;
    onClose: () => void;
};
export declare const ViewTransactionModal: ({ transaction, siteSettings, serviceOptions, onClose, }: Props) => React.JSX.Element;
export {};
