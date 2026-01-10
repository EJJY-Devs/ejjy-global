import React from 'react';
import { OrderOfPayment } from '../../../types';
type Props = {
    orderOfPayment: OrderOfPayment;
    onClose: () => void;
};
export declare const ViewOrderOfPaymentModal: ({ orderOfPayment, onClose }: Props) => React.JSX.Element;
export {};
