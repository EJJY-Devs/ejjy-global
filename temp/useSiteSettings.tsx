import { wrapServiceWithCatch } from 'hooks/helper';
import { UseListQuery } from 'hooks/inteface';
import { useQuery } from 'react-query';
import { SiteSettingsService } from 'services';

const SITE_SETTINGS_STALE_TIME = 1500;

const useSiteSettings = ({ options }: UseListQuery = {}) =>
	useQuery<any>(
		'useSiteSettings',
		() => wrapServiceWithCatch(SiteSettingsService.get()),
		{
			staleTime: SITE_SETTINGS_STALE_TIME,
			refetchOnMount: false,
			notifyOnChangeProps: ['data'],
			select: (query) => query.data,
			...options,
		},
	);

export default useSiteSettings;
