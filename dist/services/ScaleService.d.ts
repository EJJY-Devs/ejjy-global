export interface Connect {
    comPort: number;
}
declare const service: {
    connect: (body: Connect) => Promise<import("axios").AxiosResponse<boolean>>;
    getWeight: (baseURL: string) => Promise<number>;
};
export default service;
