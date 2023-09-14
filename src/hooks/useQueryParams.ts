import _ from 'lodash';
import * as queryString from 'query-string';
import { ParsedQuery } from 'query-string';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

interface Props {
	page?: number | string;
	pageSize?: number | string;
	debounceTime?: number;
	onParamsCheck?: (currentParams: ParsedQuery<string>) => ParsedQuery<string>;
}

const useQueryParams = ({
	page: currentPage,
	pageSize: currentPageSize,
	debounceTime = 500,
	onParamsCheck,
}: Props = {}) => {
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

	const handleChange = () => {
		const pageSize = params.pageSize || currentPageSize;
		const page = params.page || currentPage;
	};

	const debouncedOnChange = useDebouncedCallback(handleChange, debounceTime);

	useEffect(() => {
		debouncedOnChange();
	}, [history.location.search]);

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
					...(shouldResetPage ? { page: 1 } : {}),
					...param,
				},
			}),
		);
	};

	return { params, setQueryParams, refreshList: handleChange };
};

export default useQueryParams;
