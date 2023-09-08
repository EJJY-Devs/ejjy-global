import { ServiceType } from '../globals';
import { SiteSettings } from '../types';
declare const service: {
    get: (baseURL?: string, serviceType?: ServiceType) => Promise<SiteSettings>;
};
export default service;
