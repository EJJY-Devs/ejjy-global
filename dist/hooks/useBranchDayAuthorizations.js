"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("hooks/helper");
const react_query_1 = require("react-query");
const services_1 = require("services");
const useBranchDayAuthorizations = ({ params, options }) => (0, react_query_1.useQuery)(['useBranchDayAuthorizations', params === null || params === void 0 ? void 0 : params.branchId], () => (0, helper_1.wrapServiceWithCatch)(services_1.BranchDayAuthorizationsService.list({
    branch_id: params === null || params === void 0 ? void 0 : params.branchId,
})), options);
exports.default = useBranchDayAuthorizations;
