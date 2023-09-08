import { BranchDay } from '../types';
export interface Create {
    branch_machine_id: number;
    started_by_id: number;
}
export interface Edit {
    branch_machine_id: number;
    ended_by_id: number;
    is_automatically_closed?: boolean;
}
declare const service: {
    retrieveToday: (baseURL?: string) => Promise<BranchDay>;
    create: (body: Create) => Promise<import("axios").AxiosResponse<BranchDay>>;
    edit: (id: number, body: Edit) => Promise<import("axios").AxiosResponse<BranchDay>>;
};
export default service;
