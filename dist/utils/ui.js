"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDualType = exports.isUserFromBranch = exports.getDiscountFields = exports.showErrorMessages = exports.authorization = exports.filterOption = exports.getOrderSlipStatusBranchManagerText = exports.getProductCode = exports.getRequestor = exports.getTransactionStatusDescription = exports.getTaxTypeDescription = exports.getInvoiceType = exports.getModeOfPaymentDescription = exports.getAttendanceLogDescription = exports.getCashBreakdownTypeDescription = exports.getUserTypeDescription = exports.getKeyDownCombination = exports.getFullName = exports.getSubtotal = void 0;
const antd_1 = require("antd");
const lodash_1 = __importDefault(require("lodash"));
const react_1 = __importDefault(require("react"));
const globals_1 = require("../globals");
const services_1 = require("../services");
// Getters
const getSubtotal = (products) => {
    let amount = 0;
    products.forEach(({ price_per_piece, quantity }) => {
        amount += Number(price_per_piece) * Number(quantity);
    });
    return amount;
};
exports.getSubtotal = getSubtotal;
const getFullName = (user) => {
    const name = [user === null || user === void 0 ? void 0 : user.first_name, user === null || user === void 0 ? void 0 : user.middle_name, user === null || user === void 0 ? void 0 : user.last_name].filter(Boolean);
    return name.join(' ');
};
exports.getFullName = getFullName;
const getKeyDownCombination = (keyboardEvent) => {
    let firstKey = '';
    if (keyboardEvent === null || keyboardEvent === void 0 ? void 0 : keyboardEvent.altKey) {
        firstKey = 'alt+';
    }
    if (keyboardEvent === null || keyboardEvent === void 0 ? void 0 : keyboardEvent.ctrlKey) {
        firstKey = 'ctrl+';
    }
    if (keyboardEvent === null || keyboardEvent === void 0 ? void 0 : keyboardEvent.metaKey) {
        firstKey = 'meta+';
    }
    if (keyboardEvent === null || keyboardEvent === void 0 ? void 0 : keyboardEvent.shiftKey) {
        firstKey = 'shift+';
    }
    return firstKey + (keyboardEvent === null || keyboardEvent === void 0 ? void 0 : keyboardEvent.key);
};
exports.getKeyDownCombination = getKeyDownCombination;
const getUserTypeDescription = (userType) => {
    switch (userType) {
        case globals_1.userTypes.ADMIN:
            return 'Admin';
        case globals_1.userTypes.BRANCH_MANAGER:
            return 'Branch Manager';
        case globals_1.userTypes.BRANCH_PERSONNEL:
            return 'Branch Personnel';
        case globals_1.userTypes.OFFICE_MANAGER:
            return 'Office Manager';
        default:
            return '';
    }
};
exports.getUserTypeDescription = getUserTypeDescription;
const getCashBreakdownTypeDescription = (category, type) => {
    let description = '';
    if (category === globals_1.cashBreakdownCategories.CASH_BREAKDOWN) {
        switch (type) {
            case globals_1.cashBreakdownTypes.START_SESSION:
                description = 'Opening Fund';
                break;
            case globals_1.cashBreakdownTypes.MID_SESSION:
                description = 'Cash Collection';
                break;
            case globals_1.cashBreakdownTypes.END_SESSION:
                description = 'Cash in Drawer';
                break;
            default:
                description = '';
        }
    }
    else if (category === globals_1.cashBreakdownCategories.CASH_IN) {
        description = 'Petty Cash | Cash In';
    }
    else if (category === globals_1.cashBreakdownCategories.PRINT_ONLY) {
        description = 'Cash Breakdown';
    }
    return description;
};
exports.getCashBreakdownTypeDescription = getCashBreakdownTypeDescription;
const getAttendanceLogDescription = (category, type) => {
    let description = '';
    if (category === globals_1.attendanceCategories.ATTENDANCE) {
        description = 'Clock';
    }
    else if (category === globals_1.attendanceCategories.TRACKER) {
        description = 'Time';
    }
    return `${description} ${lodash_1.default.upperFirst(type)}`;
};
exports.getAttendanceLogDescription = getAttendanceLogDescription;
const getModeOfPaymentDescription = (modeOfPayment) => {
    let description;
    if (modeOfPayment === globals_1.paymentTypes.CASH) {
        description = 'Cash';
    }
    else if (modeOfPayment === globals_1.paymentTypes.CREDIT) {
        description = 'Charge';
    }
    else if (modeOfPayment === globals_1.paymentTypes.CHECK) {
        description = 'Check';
    }
    else {
        description = 'Others';
    }
    return description;
};
exports.getModeOfPaymentDescription = getModeOfPaymentDescription;
const getInvoiceType = (invoiceType) => {
    let description;
    if (invoiceType === globals_1.invoiceTypes.SALES_INVOICE) {
        description = 'Cash';
    }
    else {
        description = 'Charge';
    }
    return description;
};
exports.getInvoiceType = getInvoiceType;
const getTaxTypeDescription = (taxType) => {
    let data = '';
    if (taxType === 'VAT') {
        data = 'VAT REG TIN';
    }
    else if (taxType === 'NVAT') {
        data = 'NON VAT REG TIN';
    }
    return data;
};
exports.getTaxTypeDescription = getTaxTypeDescription;
const getTransactionStatusDescription = (status) => {
    switch (status) {
        case globals_1.transactionStatuses.NEW: {
            return 'New';
        }
        case globals_1.transactionStatuses.FULLY_PAID: {
            return 'Fully Paid';
        }
        case globals_1.transactionStatuses.QUEUE: {
            return 'Hold';
        }
        case globals_1.transactionStatuses.VOID_CANCELLED: {
            return 'Cancelled';
        }
        case globals_1.transactionStatuses.VOID_EDITED: {
            return 'Edited';
        }
        default: {
            return globals_1.EMPTY_CELL;
        }
    }
};
exports.getTransactionStatusDescription = getTransactionStatusDescription;
const getRequestor = (requisitionSlip) => {
    const user = (requisitionSlip === null || requisitionSlip === void 0 ? void 0 : requisitionSlip.prepared_by) || {};
    const data = [];
    if (user) {
        data.push((0, exports.getFullName)(user));
    }
    if (user.branch) {
        data.push(user.branch.name);
    }
    return data.join(' - ');
};
exports.getRequestor = getRequestor;
const getProductCode = (product) => (product === null || product === void 0 ? void 0 : product.barcode) ||
    (product === null || product === void 0 ? void 0 : product.selling_barcode) ||
    (product === null || product === void 0 ? void 0 : product.textcode) ||
    globals_1.EMPTY_CELL;
exports.getProductCode = getProductCode;
const getOrderSlipStatusBranchManagerText = (status, percentage, osdrStatus) => {
    switch (status) {
        case globals_1.orderSlipStatus.PREPARING: {
            return `Preparing (${percentage}%)`;
        }
        case globals_1.orderSlipStatus.PREPARED: {
            return 'Prepared';
        }
        case globals_1.orderSlipStatus.DELIVERED: {
            return 'Delivered';
        }
        case globals_1.orderSlipStatus.RECEIVED: {
            if (osdrStatus === globals_1.OSDRStatus.DONE) {
                return 'Received (Done)';
            }
            if (osdrStatus === globals_1.OSDRStatus.ERROR) {
                return 'Received (Error)';
            }
            return 'Received';
        }
        default:
            return '';
    }
};
exports.getOrderSlipStatusBranchManagerText = getOrderSlipStatusBranchManagerText;
// Others
const filterOption = (input, option) => {
    if (option === null || option === void 0 ? void 0 : option.children) {
        return (option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0);
    }
    return false;
};
exports.filterOption = filterOption;
const authorization = ({ title = 'Authorization', description = 'Authorize', userTypes = [], onSuccess, }) => {
    let username = '';
    let password = '';
    antd_1.Modal.confirm({
        title,
        centered: true,
        className: 'Modal__hasFooter',
        okText: 'Submit',
        content: (react_1.default.createElement(antd_1.Space, { className: "w-full", direction: "vertical" },
            react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(antd_1.Typography.Text, null, "Username"),
                react_1.default.createElement(antd_1.Input, { onChange: (event) => {
                        username = event.target.value.trim();
                    } })),
            react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(antd_1.Typography.Text, null, "Password"),
                react_1.default.createElement(antd_1.Input.Password, { onChange: (event) => {
                        password = event.target.value.trim();
                    } })))),
        onOk: (close) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            try {
                if (!username || !password) {
                    throw new Error('Please input username and password.');
                }
                const response = yield services_1.UsersService.authenticateAnAction({
                    login: username,
                    password,
                    description,
                });
                if (response.status !== 200) {
                    throw new Error('Incorrect username or password.');
                }
                if (userTypes.length &&
                    !userTypes.includes(String(response.data.user_type))) {
                    throw new Error('User is not allowed.');
                }
                onSuccess();
                close();
            }
            catch (err) {
                let errorMessage = '';
                if (err instanceof Error) {
                    errorMessage = err.message;
                }
                else {
                    errorMessage = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data;
                }
                console.log(err);
                if (errorMessage) {
                    antd_1.message.error(errorMessage);
                }
                return Promise.reject(true);
            }
        }),
    });
};
exports.authorization = authorization;
const showErrorMessages = (errors) => {
    if (typeof errors === 'string' && errors.length > 0) {
        antd_1.message.error(errors);
    }
    else if (Array.isArray(errors) && errors.length > 0) {
        errors.forEach((error) => antd_1.message.error(error));
    }
};
exports.showErrorMessages = showErrorMessages;
const getDiscountFields = (discountCode, fieldsJSON) => {
    const fields = JSON.parse(fieldsJSON);
    const lowerDiscountCode = discountCode.toLowerCase();
    if (lowerDiscountCode ===
        globals_1.specialDiscountCodes.NATIONAL_ATHLETES_AND_COACHES.toLowerCase()) {
        return {
            id: (fields === null || fields === void 0 ? void 0 : fields['PNSTM ID']) || globals_1.EMPTY_CELL,
            coach: (fields === null || fields === void 0 ? void 0 : fields['Name']) || globals_1.EMPTY_CELL,
        };
    }
    else if (lowerDiscountCode === globals_1.specialDiscountCodes.SOLO_PARENTS.toLowerCase()) {
        return {
            id: (fields === null || fields === void 0 ? void 0 : fields['SPIC No.']) || globals_1.EMPTY_CELL,
            name: (fields === null || fields === void 0 ? void 0 : fields['Name of Parent']) || globals_1.EMPTY_CELL,
            childName: (fields === null || fields === void 0 ? void 0 : fields['Name of Child']) || globals_1.EMPTY_CELL,
            childBirthdate: (fields === null || fields === void 0 ? void 0 : fields['Birth Date of Child']) || globals_1.EMPTY_CELL,
            childAge: (fields === null || fields === void 0 ? void 0 : fields['Age of Child']) || globals_1.EMPTY_CELL,
        };
    }
    else if (lowerDiscountCode === globals_1.specialDiscountCodes.SENIOR_CITIZEN.toLowerCase()) {
        return {
            name: (fields === null || fields === void 0 ? void 0 : fields['Name']) || globals_1.EMPTY_CELL,
            id: (fields === null || fields === void 0 ? void 0 : fields['ID no.']) || globals_1.EMPTY_CELL,
            tin: (fields === null || fields === void 0 ? void 0 : fields['TIN']) || globals_1.EMPTY_CELL,
        };
    }
    else if (lowerDiscountCode ===
        globals_1.specialDiscountCodes.PERSONS_WITH_DISABILITY.toLowerCase()) {
        return {
            name: (fields === null || fields === void 0 ? void 0 : fields['Name']) || globals_1.EMPTY_CELL,
            id: (fields === null || fields === void 0 ? void 0 : fields['ID no.']) || globals_1.EMPTY_CELL,
            tin: (fields === null || fields === void 0 ? void 0 : fields['TIN']) || globals_1.EMPTY_CELL,
        };
    }
};
exports.getDiscountFields = getDiscountFields;
// Others
const isUserFromBranch = (userType) => [globals_1.userTypes.BRANCH_MANAGER, globals_1.userTypes.BRANCH_PERSONNEL].includes(userType);
exports.isUserFromBranch = isUserFromBranch;
const isDualType = (product) => product.barcode && product.selling_barcode;
exports.isDualType = isDualType;
