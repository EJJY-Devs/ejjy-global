import { UseQueryOptions, useQuery } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { SiteSettingsService } from '../services';
import { Params } from '../services/SiteSettingsService';
import { SiteSettings } from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery } from './inteface';

const SITE_SETTINGS_STALE_TIME = 5000;

const useSiteSettings = (
	data: UseListQuery<
		SiteSettings,
		CamelCasedProperties<Params>,
		UseQueryOptions<SiteSettings>
	> = {},
) => {
	const { params, options, serviceOptions } = data;

	return useQuery<SiteSettings>(
		['useSiteSettings', params],
		() =>
			wrapServiceWithCatch(
				SiteSettingsService.retrieve(
					{ branch_id: params?.branchId },
					serviceOptions?.baseURL,
					serviceOptions?.type,
				),
			),
		{
			refetchOnMount: 'always',
			staleTime: SITE_SETTINGS_STALE_TIME,
			...options,
		},
	);
};

export default useSiteSettings;
