import React from 'react';
import { User } from '../../../types';
export type Props = {
    title?: string;
    description?: string;
    userTypes?: string[];
    onSuccess?: (user: User) => void;
    onCancel?: () => void;
};
export declare const AuthorizationModal: ({ title, description, userTypes, onSuccess, onCancel, }: Props) => React.JSX.Element;
