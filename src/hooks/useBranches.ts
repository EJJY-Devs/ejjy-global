import { useQuery } from "react-query";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../globals";
import { BranchesService } from "../services";
import { ListResponseData, QueryResponse } from "../services/interfaces";
import { Branch } from "../types";
import { wrapServiceWithCatch } from "./helper";
import { UseListQuery } from "./inteface";

interface ListQuery extends UseListQuery<Branch> {
  params?: {
    page?: number;
    pageSize?: number;
  };
}

const useBranches = (data: ListQuery = {}) => {
  const { params, options } = data;

  return useQuery<ListResponseData<Branch>, Error, QueryResponse<Branch>>(
    ["useBranches", params?.page, params?.pageSize],
    () =>
      wrapServiceWithCatch(
        BranchesService.list({
          page_size: params?.pageSize || DEFAULT_PAGE_SIZE,
          page: params?.page || DEFAULT_PAGE,
        })
      ),
    {
      placeholderData: {
        results: [],
        count: 0,
      },
      select: (query) => ({
        list: query.results,
        total: query.count,
      }),
      ...options,
    }
  );
};

export default useBranches;
