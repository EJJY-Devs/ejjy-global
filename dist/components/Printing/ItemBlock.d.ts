import React from 'react';
type Items = {
    label: string;
    value: string | number | React.ReactElement;
    isIndented?: boolean;
    isUnderlined?: boolean;
    isParenthesized?: boolean;
};
type ItemBlockProps = {
    items: Items[];
};
export declare const ItemBlock: ({ items }: ItemBlockProps) => React.JSX.Element;
export {};
