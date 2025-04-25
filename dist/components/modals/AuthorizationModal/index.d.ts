import React from 'react';
import { User } from '../../../types';
export type Props = {
    baseURL?: string;
    title?: string;
    description?: string;
    userTypes?: string[];
    branchMachineId?: number;
    branchId?: number;
    onSuccess?: (user: User) => void;
    onCancel?: () => void;
};
export declare const AuthorizationModal: ({ baseURL, title, description, branchMachineId, branchId, userTypes, onSuccess, onCancel, }: Props) => React.JSX.Element;
