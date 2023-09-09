import { AxiosResponse } from 'axios';
import { AxiosErrorResponse } from '../services/interfaces';
import { User } from '../types';
export declare const useUsersAuthenticate: () => import("react-query").UseMutationResult<AxiosResponse<User>, AxiosErrorResponse<any>, {
    login: string;
    password: string;
    description?: string | undefined;
}, unknown>;
