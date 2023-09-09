"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBranchDayEdit = exports.useBranchDayCreate = exports.useBranchDayRetrieve = void 0;
const react_query_1 = require("react-query");
const services_1 = require("../services");
const helper_1 = require("./helper");
const useBranchDayRetrieve = (data = {}) => {
    const { options, serviceOptions } = data;
    return (0, react_query_1.useQuery)(['useBranchDayRetrieve'], () => (0, helper_1.wrapServiceWithCatch)(services_1.BranchDaysService.retrieveToday(serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.baseURL)), options);
};
exports.useBranchDayRetrieve = useBranchDayRetrieve;
const useBranchDayCreate = () => (0, react_query_1.useMutation)(({ branchMachineId, startedById }) => services_1.BranchDaysService.create({
    branch_machine_id: branchMachineId,
    started_by_id: startedById,
}));
exports.useBranchDayCreate = useBranchDayCreate;
const useBranchDayEdit = () => (0, react_query_1.useMutation)(({ id, branchMachineId, endedById, isAutomaticallyClosed }) => services_1.BranchDaysService.edit(id, {
    branch_machine_id: branchMachineId,
    ended_by_id: endedById,
    is_automatically_closed: isAutomaticallyClosed,
}));
exports.useBranchDayEdit = useBranchDayEdit;
