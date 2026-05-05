import React from 'react';
import { ServiceOptions } from '../../../hooks/inteface';
import { DeliveryInvoice, SiteSettings } from '../../../types';
type Props = {
    deliveryInvoice: DeliveryInvoice | number;
    siteSettings: SiteSettings;
    serviceOptions?: ServiceOptions;
    onClose: () => void;
};
export declare const ViewDeliveryInvoiceModal: ({ deliveryInvoice, siteSettings, serviceOptions, onClose, }: Props) => React.JSX.Element;
export {};
