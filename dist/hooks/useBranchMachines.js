"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBranchMachinePing = exports.useBranchMachineRetrieve = void 0;
const helper_1 = require("hooks/helper");
const react_query_1 = require("react-query");
const services_1 = require("services");
const useBranchMachines = (data = {}) => {
    const { params, options } = data;
    return (0, react_query_1.useQuery)(['useBranchMachines', params === null || params === void 0 ? void 0 : params.branchId], () => (0, helper_1.wrapServiceWithCatch)(services_1.BranchMachinesService.list({
        branch_id: params === null || params === void 0 ? void 0 : params.branchId,
    })), Object.assign({ placeholderData: {
            results: [],
            count: 0,
        }, select: (query) => ({
            list: query.results,
            total: query.count,
        }) }, options));
};
const useBranchMachineRetrieve = () => (0, react_query_1.useMutation)((id) => services_1.BranchMachinesService.retrieve(id));
exports.useBranchMachineRetrieve = useBranchMachineRetrieve;
const useBranchMachinePing = () => (0, react_query_1.useMutation)(({ id }) => services_1.BranchMachinesService.ping({
    online_branch_machine_id: id,
}));
exports.useBranchMachinePing = useBranchMachinePing;
exports.default = useBranchMachines;
