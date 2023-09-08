"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBranchDayEdit = exports.useBranchDayCreate = exports.useBranchDayRetrieve = void 0;
const helper_1 = require("hooks/helper");
const react_query_1 = require("react-query");
const services_1 = require("services");
const useBranchDayRetrieve = ({ options } = {}) => (0, react_query_1.useQuery)(['useBackOrderRetrieve'], () => (0, helper_1.wrapServiceWithCatch)(services_1.BranchDaysService.retrieveToday()), Object.assign({ select: (query) => query.data }, options));
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
