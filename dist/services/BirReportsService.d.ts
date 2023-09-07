import { ListQueryParams, ListResponseData } from './interfaces';
import { BirReport } from '../types';
interface Params extends ListQueryParams {
    branch_machine_id?: number;
}
declare const service: {
    list: (params: Params, baseURL?: string) => Promise<ListResponseData<BirReport>>;
};
export default service;
