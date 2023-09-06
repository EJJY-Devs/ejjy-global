import { AxiosRequestConfig } from "axios";

export interface ListRequest {
  ordering?: string;
  page?: number;
  page_size?: number;
  fields?: string;
  search?: string;
}

export interface ListResponseData<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}

export interface AxiosResponse<T = any> {
  data: T;
  status?: number;
  statusText?: string;
  headers?: any;
  config?: AxiosRequestConfig;
  request?: any;
}

export interface QueryResponse<T> {
  list: T[];
  total: number;
}
