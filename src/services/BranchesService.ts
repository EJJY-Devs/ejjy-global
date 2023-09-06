import axios from "axios";
import { Branch } from "../types";
import { ListRequest, ListResponseData } from "./interfaces";

const service = {
  list: async (params: ListRequest, baseURL?: string) => {
    const response = await axios.get<ListResponseData<Branch>>("/branches/", {
      baseURL,
      params,
    });

    return response.data;
  },
};

export default service;
