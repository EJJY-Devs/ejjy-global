"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDualType = exports.isUserFromBranch = exports.showErrorMessages = exports.filterOption = exports.getAttendanceLogDescription = exports.getCashBreakdownTypeDescription = exports.getUserTypeDescription = exports.getKeyDownCombination = exports.getFullName = exports.getSubtotal = void 0;
const antd_1 = require("antd");
const globals_1 = require("../globals");
const lodash_1 = __importDefault(require("lodash"));
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
const filterOption = (input, option) => {
    if (option.children) {
        return (option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0);
    }
    return false;
};
exports.filterOption = filterOption;
// Messages
// interface Authorization {
//   title?: string;
//   onSuccess: any;
// }
// TODO: Find another way to implement
// export const authorization = ({
// 	title = 'Input Password',
// 	onSuccess,
// }: Authorization) => {
// 	let username = '';
// 	let password = '';
// 	Modal.confirm({
// 		title,
// 		centered: true,
// 		className: 'Modal__hasFooter',
// 		okText: 'Submit',
// 		content: (
// 			<Space className="w-100" direction="vertical">
// 				<div>
// 					<Label label="Username" spacing />
// 					<UncontrolledInput
// 						type="text"
// 						onChange={(value) => {
// 							username = value;
// 						}}
// 					/>
// 				</div>
// 				<div>
// 					<Label label="Password" spacing />
// 					<UncontrolledInput
// 						type="password"
// 						onChange={(value) => {
// 							password = value;
// 						}}
// 					/>
// 				</div>
// 			</Space>
// 		),
// 		onOk: (close) => {
// 			if (username === 'admin' && password === 'generic123') {
// 				onSuccess();
// 				close();
// 			} else {
// 				message.error('Incorrect username/password');
// 			}
// 		},
// 	});
// };
const showErrorMessages = (errors) => {
    if (typeof errors === 'string') {
        antd_1.message.error(errors);
    }
    else if (Array.isArray(errors)) {
        errors.forEach((error) => antd_1.message.error(error));
    }
};
exports.showErrorMessages = showErrorMessages;
// Others
const isUserFromBranch = (userType) => [globals_1.userTypes.BRANCH_MANAGER, globals_1.userTypes.BRANCH_PERSONNEL].includes(userType);
exports.isUserFromBranch = isUserFromBranch;
const isDualType = (product) => product.barcode && product.selling_barcode;
exports.isDualType = isDualType;
