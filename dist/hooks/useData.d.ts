import { UseMutationOptions, UseQueryOptions } from 'react-query';
import { Params, Upload } from '../services/DataService';
import { CamelCasedProperties } from 'type-fest';
import { AxiosErrorResponse } from '../services/interfaces';
import { AxiosResponse } from 'axios';
export declare const REFETCH_SYNC_INTERVAL_MS = 60000;
export declare const useUploadData: (options?: UseMutationOptions<AxiosResponse<boolean>, AxiosErrorResponse, CamelCasedProperties<Upload>>) => import("react-query").UseMutationResult<AxiosResponse<boolean>, AxiosErrorResponse<any>, {
    isBackOffice: boolean;
}, unknown>;
interface InitializeDataQuery<T, TParams> {
    options: UseQueryOptions<T, Error>;
    params: TParams;
}
export declare const useInitializeData: (data: InitializeDataQuery<void, CamelCasedProperties<Params>>) => import("react-query").UseQueryResult<void, Error>;
export {};
