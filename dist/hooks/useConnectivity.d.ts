declare const useConnectivity: () => {
    isConnected: null;
};
export declare const useNetwork: ({ options }: UseListQuery) => import("react-query").UseQueryResult<any, unknown>;
export default useConnectivity;
