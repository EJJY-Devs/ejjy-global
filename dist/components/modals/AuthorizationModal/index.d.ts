import React from 'react';
type Props = {
    title?: string;
    description?: string;
    userTypes?: string[];
    onSuccess: () => void;
    onCancel: () => void;
};
export declare const AuthorizationModal: ({ title, description, userTypes, onSuccess, onCancel, }: Props) => React.JSX.Element;
export {};
