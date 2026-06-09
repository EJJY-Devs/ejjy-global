import { ConnectivityLogs } from '../types';
interface Create {
    branch_machine_id: number;
    type: string;
}
declare const service: {
    create: (body: Create) => Promise<import("axios").AxiosResponse<ConnectivityLogs>>;
};
export default service;
