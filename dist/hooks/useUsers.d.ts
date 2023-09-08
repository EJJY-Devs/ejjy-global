export declare const useUsers: () => {
    authenticateUser: (data: any, extraCallback?: null) => void;
    listOfflineUsers: (extraCallback?: null) => void;
    status: any;
    errors: any;
    reset: () => void;
};
export declare const useUsersAuthenticate: () => import("react-query").UseMutationResult<any, any, any, unknown>;
