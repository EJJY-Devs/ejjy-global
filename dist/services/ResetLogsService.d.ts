import { ResetLog } from '../types';
import { ListQueryParams, ListResponseData } from './interfaces';
declare const service: {
    list: (params: ListQueryParams, baseURL?: string) => Promise<ListResponseData<ResetLog>>;
};
export default service;
