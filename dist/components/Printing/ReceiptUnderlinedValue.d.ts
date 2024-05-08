import React, { ReactNode } from 'react';
type Props = {
    value: number;
    prefix?: string | ReactNode;
    postfix?: string | ReactNode;
};
export declare const ReceiptUnderlinedValue: ({ value, prefix, postfix }: Props) => React.JSX.Element;
export {};
