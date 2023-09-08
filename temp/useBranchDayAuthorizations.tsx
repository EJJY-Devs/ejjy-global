import { wrapServiceWithCatch } from 'hooks/helper';
import { useQuery } from 'react-query';
import { BranchDayAuthorizationsService } from 'services';
import { UseListQuery } from './inteface';

const useBranchDayAuthorizations = ({ params, options }: UseListQuery) =>
	useQuery(
		['useBranchDayAuthorizations', params?.branchId],
		() =>
			wrapServiceWithCatch(
				BranchDayAuthorizationsService.list({
					branch_id: params?.branchId,
				}),
			),
		options,
	);

export default useBranchDayAuthorizations;
