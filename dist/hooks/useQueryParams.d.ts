import * as queryString from 'query-string';
import { ParsedQuery } from 'query-string';
type Props = {
    onParamsCheck?: (currentParams: ParsedQuery<string>) => ParsedQuery<string>;
};
declare const useQueryParams: ({ onParamsCheck }?: Props) => {
    params: queryString.ParsedQuery<string>;
    setQueryParams: (param: Record<string, any>, { shouldResetPage, shouldIncludeCurrentParams }?: {
        shouldResetPage?: boolean | undefined;
        shouldIncludeCurrentParams?: boolean | undefined;
    }) => void;
};
export default useQueryParams;
