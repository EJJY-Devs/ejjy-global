import { CamelCasedProperties } from 'type-fest';
import { Params } from '../services/AccountsService';
import { QueryResponse } from '../services/interfaces';
import { Account } from '../types';
import { UseListQuery, UseRetrieveQuery } from './inteface';
declare const useAccounts: (data?: UseListQuery<Account, CamelCasedProperties<Params>>) => import("react-query").UseQueryResult<QueryResponse<Account>, Error>;
export declare const useAccountRetrieve: (data: UseRetrieveQuery<Account>) => void;
export default useAccounts;
