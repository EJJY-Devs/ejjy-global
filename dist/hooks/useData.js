"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInitializeData = exports.useUploadData = exports.REFETCH_SYNC_INTERVAL_MS = void 0;
const react_query_1 = require("react-query");
const helper_1 = require("./helper");
const services_1 = require("../services");
exports.REFETCH_SYNC_INTERVAL_MS = 60000;
const useUploadData = (options) => (0, react_query_1.useMutation)(({ isBackOffice }) => services_1.DataService.upload({
    is_back_office: isBackOffice,
}), Object.assign({}, options));
exports.useUploadData = useUploadData;
const useInitializeData = (data) => {
    const { params, options } = data;
    return (0, react_query_1.useQuery)(['useInitializeData', params], () => (0, helper_1.wrapServiceWithCatch)(services_1.DataService.initialize({
        branch_id: params === null || params === void 0 ? void 0 : params.branchId,
        branch_machine_id: params === null || params === void 0 ? void 0 : params.branchMachineId,
    })), Object.assign({ refetchInterval: exports.REFETCH_SYNC_INTERVAL_MS, refetchIntervalInBackground: true, notifyOnChangeProps: ['isLoading'] }, options));
};
exports.useInitializeData = useInitializeData;
