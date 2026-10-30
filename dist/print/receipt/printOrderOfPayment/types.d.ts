import { OrderOfPayment } from '../../../types';
export type PrintOrderOfPayment = {
    orderOfPayment: OrderOfPayment;
    isPdf?: boolean;
    pdfPageHeight?: number;
};
