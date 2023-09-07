import { Branch } from '../types';
import { ListResponseData } from './interfaces';
declare const service: {
    list: (params: ListRequest) => Promise<ListResponseData<Branch>>;
};
export default service;
