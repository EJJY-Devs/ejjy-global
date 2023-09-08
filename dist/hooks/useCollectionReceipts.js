"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCollectionReceiptCreate = void 0;
const react_query_1 = require("react-query");
const services_1 = require("../services");
const useCollectionReceiptCreate = (options) => (0, react_query_1.useMutation)(({ amount, bankBranch, bankName, branchMachineId, checkDate, checkNumber, createdById, orderOfPaymentId, }) => services_1.CollectionReceiptsService.create({
    amount,
    bank_branch: bankBranch,
    bank_name: bankName,
    branch_machine_id: branchMachineId,
    check_date: checkDate,
    check_number: checkNumber,
    created_by_id: createdById,
    order_of_payment_id: orderOfPaymentId,
}), options);
exports.useCollectionReceiptCreate = useCollectionReceiptCreate;
