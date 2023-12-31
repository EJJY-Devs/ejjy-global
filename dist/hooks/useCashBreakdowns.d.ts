import { AxiosResponse } from 'axios';
import { CamelCasedProperties } from 'type-fest';
import { Params } from '../services/CashBreakdownsService';
import { AxiosErrorResponse, QueryResponse } from '../services/interfaces';
import { CashBreakdown } from '../types';
import { UseListQuery } from './inteface';
declare const useCashBreakdowns: (data?: UseListQuery<CashBreakdown, CamelCasedProperties<Params>>) => import("react-query").UseQueryResult<QueryResponse<CashBreakdown>, Error>;
export declare const useCashBreakdownCreate: () => import("react-query").UseMutationResult<AxiosResponse<CashBreakdown>, AxiosErrorResponse<any>, {
    bills100?: number | undefined;
    bills1000?: number | undefined;
    bills20?: number | undefined;
    bills200?: number | undefined;
    bills50?: number | undefined;
    bills500?: number | undefined;
    branchMachineId?: number | undefined;
    cashOutMetadata?: {
        payee: string;
        particulars: string;
        amount: string;
        preparedByUserId: number;
        approvedByUserId: number;
        receivedBy: string;
    } | undefined;
    cashieringSessionId?: number | undefined;
    category?: import("../types").CashBreakdownCategory | undefined;
    coins1?: number | undefined;
    coins10?: number | undefined;
    coins20?: number | undefined;
    coins25?: number | undefined;
    coins5?: number | undefined;
    coins50?: number | undefined;
    remarks?: string | undefined;
    type?: import("../types").CashBreakdownType | undefined;
}, unknown>;
export default useCashBreakdowns;
