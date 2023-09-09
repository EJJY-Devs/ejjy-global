import { AxiosResponse } from 'axios';
import { AxiosErrorResponse, QueryResponse } from '../services/interfaces';
import { User } from '../types';
import { UseListQuery } from './inteface';
declare const useUsers: (data?: UseListQuery<User>) => import("react-query").UseQueryResult<QueryResponse<User>, Error>;
export declare const useUsersAuthenticate: () => import("react-query").UseMutationResult<AxiosResponse<User>, AxiosErrorResponse<any>, {
    login: string;
    password: string;
    description?: string | undefined;
}, unknown>;
export default useUsers;
