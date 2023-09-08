import { ServiceType } from '../globals';
import { ListQueryParams } from './interfaces';
import { SiteSettings } from '../types';
export interface Params extends ListQueryParams {
    branch_id?: number;
}
declare const service: {
    retrieve: (params: Params, baseURL?: string, serviceType?: ServiceType) => Promise<SiteSettings>;
};
export default service;
