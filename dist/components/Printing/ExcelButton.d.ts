import React from 'react';
type Props = {
    downloadExcel: () => void;
    isDisabled?: boolean;
    isLoading?: boolean;
};
export declare const ExcelButton: ({ downloadExcel, isDisabled, isLoading, }: Props) => React.JSX.Element;
export {};
