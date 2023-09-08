import { UseQueryOptions } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { Params } from '../services/SiteSettingsService';
import { SiteSettings } from '../types';
import { UseListQuery } from './inteface';
declare const useSiteSettings: (data?: UseListQuery<SiteSettings, CamelCasedProperties<Params>, UseQueryOptions<SiteSettings>>) => import("react-query").UseQueryResult<SiteSettings, unknown>;
export default useSiteSettings;
