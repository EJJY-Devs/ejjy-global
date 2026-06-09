import React from 'react';
export type ItemBlockItems = {
    label: string;
    value: string | number | React.ReactElement;
    labelStyle?: React.CSSProperties;
    contentStyle?: React.CSSProperties;
    isIndented?: boolean;
    isUnderlined?: boolean;
    isParenthesized?: boolean;
};
export type ItemBlockProps = {
    items: ItemBlockItems[];
};
export declare const ItemBlock: ({ items }: ItemBlockProps) => React.JSX.Element;
