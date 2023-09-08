import { AxiosResponse } from 'axios';
import { AxiosErrorResponse } from '../services/interfaces';
export declare const useUsersAuthenticate: () => import("react-query").UseMutationResult<AxiosResponse<string | boolean>, AxiosErrorResponse<any>, {
    login: string;
    password: string;
    description?: string | undefined;
}, unknown>;
