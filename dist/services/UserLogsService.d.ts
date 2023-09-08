import { UserLog } from '../types';
import { ListQueryParams, ListResponseData } from './interfaces';
export interface Params extends ListQueryParams {
    acting_user_id?: number;
    type?: string;
}
declare const service: {
    list: (params: Params, baseURL?: string) => Promise<ListResponseData<UserLog>>;
};
export default service;
