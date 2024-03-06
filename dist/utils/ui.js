"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDualType = exports.isUserFromBranch = exports.showErrorMessages = exports.authorization = exports.filterOption = exports.getTaxTypeDescription = exports.getModeOfPaymentDescription = exports.getAttendanceLogDescription = exports.getCashBreakdownTypeDescription = exports.getUserTypeDescription = exports.getKeyDownCombination = exports.getFullName = exports.getSubtotal = void 0;
const antd_1 = require("antd");
const lodash_1 = __importDefault(require("lodash"));
const react_1 = __importStar(require("react"));
const globals_1 = require("../globals");
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
                description = 'Start Session';
                break;
            case globals_1.cashBreakdownTypes.MID_SESSION:
                description = 'Cash Collection';
                break;
            case globals_1.cashBreakdownTypes.END_SESSION:
                description = 'End Session';
                break;
            default:
                description = '';
        }
    }
    else if (category === globals_1.cashBreakdownCategories.CASH_IN) {
        description = 'Petty Cash | Cash In';
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
    else if (modeOfPayment === globals_1.paymentTypes.CHEQUE) {
        description = 'Cheque';
    }
    return description;
};
exports.getModeOfPaymentDescription = getModeOfPaymentDescription;
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
const filterOption = (input, option) => {
    if (option === null || option === void 0 ? void 0 : option.children) {
        return (option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0);
    }
    return false;
};
exports.filterOption = filterOption;
const authorization = ({ title = 'Input Password', onSuccess, }) => {
    const [username, setUsername] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    antd_1.Modal.confirm({
        title,
        centered: true,
        className: 'Modal__hasFooter',
        okText: 'Submit',
        content: (react_1.default.createElement(antd_1.Space, { className: "w-100", direction: "vertical" },
            react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(antd_1.Typography.Text, null, "Username"),
                react_1.default.createElement(antd_1.Input, { value: username, onChange: (event) => {
                        setUsername(event.target.value);
                    } })),
            react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(antd_1.Typography.Text, null, "Password"),
                react_1.default.createElement(antd_1.Input.Password, { value: password, onChange: (event) => {
                        setPassword(event.target.value);
                    } })))),
        onOk: (close) => {
            if (username === 'admin' && password === 'generic123') {
                onSuccess();
                close();
            }
            else {
                antd_1.message.error('Incorrect username/password');
            }
        },
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
// Others
const isUserFromBranch = (userType) => [globals_1.userTypes.BRANCH_MANAGER, globals_1.userTypes.BRANCH_PERSONNEL].includes(userType);
exports.isUserFromBranch = isUserFromBranch;
const isDualType = (product) => product.barcode && product.selling_barcode;
exports.isDualType = isDualType;
