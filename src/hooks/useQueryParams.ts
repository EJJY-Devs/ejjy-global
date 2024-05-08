import _ from 'lodash';
import * as queryString from 'query-string';
import { ParsedQuery } from 'query-string';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { DEFAULT_PAGE } from '../globals';

type Props = {
	onParamsCheck?: (currentParams: ParsedQuery<string>) => ParsedQuery<string>;
};

const useQueryParams = ({ onParamsCheck }: Props = {}) => {
	const history = useHistory();
	const params: ParsedQuery<string> = queryString.parse(
		history.location.search,
	);

	useEffect(() => {
		const newParams = onParamsCheck?.(params);
		if (!_.isEmpty(newParams)) {
			history.replace({
				search: queryString.stringifyUrl({
					url: '',
					query: {
						...newParams,
						...params,
					},
				}),
			});
		}
	}, []);

	/**
	 * @param param
	 * @param options
	 */
	const setQueryParams = (
		param: Record<string, any>,
		{ shouldResetPage = false, shouldIncludeCurrentParams = true } = {},
	) => {
		const currentParams = queryString.parse(history.location.search);

		history.push(
			queryString.stringifyUrl({
				url: '',
				query: {
					...(shouldIncludeCurrentParams ? currentParams : {}),
					...(shouldResetPage ? { page: DEFAULT_PAGE } : {}),
					...param,
				},
			}),
		);
	};

	return { params, setQueryParams };
};

export default useQueryParams;
