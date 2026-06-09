import React from 'react';
import { DeliveryInvoice } from '../../../types';
import { SiteSettings } from '../../../types';
type Props = {
    deliveryInvoice: DeliveryInvoice;
    siteSettings: SiteSettings;
    isReprint?: boolean;
};
export declare const DeliveryInvoiceContent: ({ deliveryInvoice, siteSettings, isReprint, }: Props) => React.JSX.Element;
export {};
