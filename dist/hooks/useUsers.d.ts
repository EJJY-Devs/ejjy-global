import { AxiosResponse } from 'axios';
import { UseMutationOptions } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { AuthenticateAnAction } from '../services/UsersService';
import { AxiosErrorResponse, QueryResponse } from '../services/interfaces';
import { User } from '../types';
import { UseListQuery } from './inteface';
declare const useUsers: (data?: UseListQuery<User>) => import("react-query").UseQueryResult<QueryResponse<User>, Error>;
export declare const useUsersAuthenticate: (options?: UseMutationOptions<AxiosResponse<User>, AxiosErrorResponse, CamelCasedProperties<AuthenticateAnAction>>, baseURL?: string) => import("react-query").UseMutationResult<AxiosResponse<User>, AxiosErrorResponse<any>, {
    login: string;
    password: string;
    description?: string | undefined;
}, unknown>;
export default useUsers;
