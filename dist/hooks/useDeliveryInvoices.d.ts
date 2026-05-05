import { DeliveryInvoice } from '../types';
interface Params {
    branchMachineId?: number;
    timeRange?: string;
}
interface Query {
    params?: Params;
}
interface DeliveryInvoicesResponse {
    results: DeliveryInvoice[];
    count: number;
}
export declare const useDeliveryInvoices: ({ params }: Query) => import("react-query").UseQueryResult<DeliveryInvoicesResponse, unknown>;
export default useDeliveryInvoices;
