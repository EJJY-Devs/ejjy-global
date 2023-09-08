import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'ejjy-global';
import { wrapServiceWithCatch } from 'hooks/helper';
import { UseListQuery } from 'hooks/inteface';
import { useQuery } from 'react-query';
import { DiscountOptionsService } from 'services';

const useDiscountOptions = ({ params, options }: UseListQuery) =>
	useQuery<any>(
		['useDiscountOptions', params?.page, params?.pageSize],
		async () =>
			wrapServiceWithCatch(
				DiscountOptionsService.listOffline({
					page: params?.page || DEFAULT_PAGE,
					page_size: params?.pageSize || DEFAULT_PAGE_SIZE,
				}),
			),
		{
			initialData: { data: { results: [], count: 0 } },
			select: (query) => ({
				discountOptions: query.data.results,
				total: query.data.count,
			}),
			...options,
		},
	);
export default useDiscountOptions;
