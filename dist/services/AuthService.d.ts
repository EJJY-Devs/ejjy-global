export interface Login {
    login: string;
    password: string;
}
export interface AcquireToken {
    username: string;
    password: string;
}
declare const service: {
    login: (body: Login, baseURL?: string) => Promise<import("axios").AxiosResponse<any>>;
    retrieve: (id: number, baseURL?: string) => Promise<import("axios").AxiosResponse<any>>;
    acquireToken: (body: AcquireToken, baseURL?: string) => Promise<import("axios").AxiosResponse<any>>;
    logout: (id: number, baseURL?: string) => Promise<import("axios").AxiosResponse<any>>;
};
export default service;
