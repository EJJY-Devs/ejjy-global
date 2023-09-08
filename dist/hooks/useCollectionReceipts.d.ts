import { AxiosResponse } from 'axios';
import { UseMutationOptions } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { Create } from '../services/CollectionReceiptsService';
import { AxiosErrorResponse } from '../services/interfaces';
import { CollectionReceipt } from '../types';
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
