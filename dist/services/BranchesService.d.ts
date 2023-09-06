import { Branch } from "../types";
import { ListRequest, ListResponseData } from "./interfaces";
declare const service: {
    list: (params: ListRequest, baseURL?: string) => Promise<ListResponseData<Branch>>;
};
export default service;
