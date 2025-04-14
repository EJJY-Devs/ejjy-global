"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBranchMachineDelete = exports.useBranchMachineEdit = exports.useBranchMachineCreate = exports.useBranchMachinePing = exports.useBranchMachineRetrieve = void 0;
const react_query_1 = require("react-query");
const services_1 = require("../services");
const helper_1 = require("./helper");
const useBranchMachines = (data = {}) => {
    const { params, options, serviceOptions } = data;
    return (0, react_query_1.useQuery)(['useBranchMachines', params], () => (0, helper_1.wrapServiceWithCatch)(services_1.BranchMachinesService.list({
        branch_id: params === null || params === void 0 ? void 0 : params.branchId,
    }, serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.baseURL, serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.type)), Object.assign({ placeholderData: {
            results: [],
            count: 0,
        }, select: (query) => ({
            list: query.results,
            total: query.count,
        }) }, options));
};
const useBranchMachineRetrieve = (data) => {
    const { id, options, serviceOptions } = data;
    return (0, react_query_1.useQuery)(['useBranchMachineRetrieve', id], () => (0, helper_1.wrapServiceWithCatch)(services_1.BranchMachinesService.retrieve(id, serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.baseURL, serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.type)), Object.assign({ enabled: typeof id === 'number' }, options));
};
exports.useBranchMachineRetrieve = useBranchMachineRetrieve;
const useBranchMachinePing = () => (0, react_query_1.useMutation)(({ onlineBranchMachineId, onlineApiUrlOverride }) => services_1.BranchMachinesService.ping({
    online_branch_machine_id: onlineBranchMachineId,
    online_api_url_override: onlineApiUrlOverride,
}));
exports.useBranchMachinePing = useBranchMachinePing;
const useBranchMachineCreate = (options, baseURL) => (0, react_query_1.useMutation)(({ branchId, machineIdentificationNumber, name, permitToUse, serverUrl, storageSerialNumber, type, ptuDateIssued, }) => services_1.BranchMachinesService.create({
    branch_id: branchId,
    machine_identification_number: machineIdentificationNumber,
    name,
    permit_to_use: permitToUse,
    server_url: serverUrl,
    storage_serial_number: storageSerialNumber,
    type,
    ptu_date_issued: ptuDateIssued,
}, baseURL), options);
exports.useBranchMachineCreate = useBranchMachineCreate;
const useBranchMachineEdit = (options, baseURL) => (0, react_query_1.useMutation)(({ id, branchId, machineIdentificationNumber, name, permitToUse, serverUrl, storageSerialNumber, type, ptuDateIssued, }) => services_1.BranchMachinesService.edit(id, {
    branch_id: branchId,
    machine_identification_number: machineIdentificationNumber,
    name,
    permit_to_use: permitToUse,
    server_url: serverUrl,
    storage_serial_number: storageSerialNumber,
    type,
    ptu_date_issued: ptuDateIssued,
}, baseURL), options);
exports.useBranchMachineEdit = useBranchMachineEdit;
const useBranchMachineDelete = (options, baseURL) => (0, react_query_1.useMutation)((id) => services_1.BranchMachinesService.delete(id, baseURL), options);
exports.useBranchMachineDelete = useBranchMachineDelete;
exports.default = useBranchMachines;
