import * as queryString from 'query-string';
import { ParsedQuery } from 'query-string';
interface Props {
    page?: number | string;
    pageSize?: number | string;
    debounceTime?: number;
    onParamsCheck?: (currentParams: ParsedQuery<string>) => ParsedQuery<string>;
}
declare const useQueryParams: ({ page: currentPage, pageSize: currentPageSize, debounceTime, onParamsCheck, }?: Props) => {
    params: queryString.ParsedQuery<string>;
    setQueryParams: (param: Record<string, any>, { shouldResetPage, shouldIncludeCurrentParams }?: {
        shouldResetPage?: boolean | undefined;
        shouldIncludeCurrentParams?: boolean | undefined;
    }) => void;
    refreshList: () => void;
};
export default useQueryParams;
