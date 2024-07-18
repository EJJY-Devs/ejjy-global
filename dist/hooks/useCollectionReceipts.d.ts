import { AxiosResponse } from 'axios';
import { UseMutationOptions } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { Create, Params } from '../services/CollectionReceiptsService';
import { AxiosErrorResponse, QueryResponse } from '../services/interfaces';
import { CollectionReceipt } from '../types';
import { UseListQuery } from './inteface';
declare const useCollectionReceipts: (data?: UseListQuery<CollectionReceipt, CamelCasedProperties<Params>>) => import("react-query").UseQueryResult<QueryResponse<CollectionReceipt>, Error>;
export declare const useCollectionReceiptCreate: (options?: UseMutationOptions<AxiosResponse<CollectionReceipt>, AxiosErrorResponse, CamelCasedProperties<Create>>) => import("react-query").UseMutationResult<AxiosResponse<CollectionReceipt>, AxiosErrorResponse<any>, {
    amount: string;
    bankBranch?: string | undefined;
    bankName?: string | undefined;
    branchMachineId: number;
    checkDate?: string | undefined;
    checkNumber?: string | undefined;
    createdById: number;
    orderOfPaymentId: number;
}, unknown>;
export default useCollectionReceipts;
