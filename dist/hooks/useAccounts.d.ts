import { QueryResponse } from '../services/interfaces';
import { Account } from '../types';
import { UseListQuery, UseListQueryParams, UseRetrieveQuery } from './inteface';
interface ListQueryParams extends UseListQueryParams {
    accountCode?: string;
    type?: string;
    withCreditRegistration?: boolean;
    withSupplierRegistration?: boolean;
}
declare const useAccounts: (data?: UseListQuery<Account, ListQueryParams>) => import("react-query").UseQueryResult<QueryResponse<Account>, Error>;
export declare const useAccountRetrieve: (data: UseRetrieveQuery<Account>) => void;
export default useAccounts;
