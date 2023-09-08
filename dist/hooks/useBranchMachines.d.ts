import { UseListQuery } from 'hooks/inteface';
import { BranchMachine } from 'ejjy-global';
interface ListQuery extends UseListQuery<BranchMachine> {
    params?: {
        branchId?: number;
    };
}
declare const useBranchMachines: (data?: ListQuery) => import("react-query").UseQueryResult<QueryResponse<BranchMachine>, Error>;
export declare const useBranchMachineRetrieve: () => import("react-query").UseMutationResult<any, any, any, unknown>;
export declare const useBranchMachinePing: () => import("react-query").UseMutationResult<any, any, any, unknown>;
export default useBranchMachines;
