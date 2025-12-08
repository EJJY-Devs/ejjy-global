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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationModal = void 0;
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const formik_1 = require("formik");
const react_1 = __importStar(require("react"));
const Yup = __importStar(require("yup"));
const hooks_1 = require("../../../hooks");
const utils_1 = require("../../../utils");
const elements_1 = require("../../elements");
const RequestErrors_1 = require("../../RequestErrors");
const AuthorizationModal = ({ baseURL, title = 'Authorization', description = 'Authorize', branchMachineId, branchId, userTypes = [], onSuccess, onCancel, }) => {
    const [usePin, setUsePin] = (0, react_1.useState)(true);
    const { mutateAsync: authenticateUser, isLoading: isAuthenticating, error: authenticateUserError, } = (0, hooks_1.useUserAuthenticate)(undefined, baseURL);
    // REFS
    const usernameRef = (0, react_1.useRef)(null);
    const pinRef = (0, react_1.useRef)(null);
    // METHODS
    (0, react_1.useEffect)(() => {
        if (usePin && pinRef && pinRef.current) {
            setTimeout(() => {
                var _a;
                (_a = pinRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            }, 500);
        }
        else if (!usePin && usernameRef && usernameRef.current) {
            setTimeout(() => {
                var _a;
                (_a = usernameRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            }, 500);
        }
    }, [usernameRef, pinRef, usePin]);
    const pinFormDetails = {
        defaultValues: {
            pin: '',
            login: '',
            password: '',
            description,
            branchMachineId,
            branchId,
        },
        schema: Yup.object().shape({
            pin: Yup.string()
                .required()
                .label('PIN')
                .min(4)
                .max(6)
                .matches(/^\d+$/, 'PIN must contain only numbers'),
        }),
    };
    const usernamePasswordFormDetails = {
        defaultValues: {
            login: '',
            password: '',
            pin: '',
            description,
            branchMachineId,
            branchId,
        },
        schema: Yup.object().shape({
            login: Yup.string().required().label('Username'),
            password: Yup.string().required().label('Password'),
        }),
    };
    const currentFormDetails = usePin
        ? pinFormDetails
        : usernamePasswordFormDetails;
    return (react_1.default.createElement(antd_1.Modal, { footer: null, title: title, centered: true, closable: true, open: true, width: 350, onCancel: onCancel },
        react_1.default.createElement(formik_1.Formik, { key: usePin ? 'pin' : 'username-password', initialValues: currentFormDetails.defaultValues, validationSchema: currentFormDetails.schema, onSubmit: (values, { setFieldError }) => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield authenticateUser(values);
                if (response.status !== 200) {
                    setFieldError(usePin ? 'pin' : 'password', 'Incorrect credentials.');
                    return;
                }
                if (userTypes.length &&
                    !userTypes.includes(String(response.data.user_type))) {
                    setFieldError(usePin ? 'pin' : 'password', 'User is not allowed.');
                    return;
                }
                onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(response.data);
            }) }, ({ values, setFieldValue }) => (react_1.default.createElement(formik_1.Form, null,
            react_1.default.createElement(antd_1.Row, { gutter: [16, 16] },
                usePin ? (react_1.default.createElement(antd_1.Col, { span: 24 },
                    react_1.default.createElement("div", { style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '8px',
                        } },
                        react_1.default.createElement(antd_1.Typography.Text, null, "PIN"),
                        react_1.default.createElement(antd_1.Tooltip, { title: "Switch to Username/Password" },
                            react_1.default.createElement(antd_1.Button, { icon: react_1.default.createElement(icons_1.SyncOutlined, null), size: "small", style: {
                                    border: '1px solid #1890ff',
                                    color: '#1890ff',
                                    borderRadius: '4px',
                                }, onClick: () => setUsePin(false) }))),
                    react_1.default.createElement(antd_1.Input.Password, { maxLength: 6, placeholder: "Enter PIN", size: "middle", ref: pinRef, value: 'pin' in values ? values.pin : '', onChange: (e) => {
                            // Only allow numbers
                            const value = e.target.value.replace(/\D/g, '');
                            setFieldValue('pin', value);
                        } }),
                    react_1.default.createElement(formik_1.ErrorMessage, { name: "pin", render: (error) => react_1.default.createElement(elements_1.FieldError, { message: error }) }),
                    react_1.default.createElement(RequestErrors_1.RequestErrors, { errors: (0, utils_1.convertIntoArray)(authenticateUserError === null || authenticateUserError === void 0 ? void 0 : authenticateUserError.errors) }))) : (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(antd_1.Col, { span: 24 },
                        react_1.default.createElement("div", { style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginBottom: '8px',
                            } },
                            react_1.default.createElement(antd_1.Typography.Text, null, "Username"),
                            react_1.default.createElement(antd_1.Tooltip, { title: "Switch to PIN" },
                                react_1.default.createElement(antd_1.Button, { icon: react_1.default.createElement(icons_1.SyncOutlined, null), size: "small", style: {
                                        border: '1px solid #1890ff',
                                        color: '#1890ff',
                                        borderRadius: '4px',
                                    }, onClick: () => setUsePin(true) }))),
                        react_1.default.createElement(antd_1.Input, { placeholder: "Enter username", size: "middle", ref: usernameRef, value: 'login' in values ? values.login : '', onChange: (e) => setFieldValue('login', e.target.value) }),
                        react_1.default.createElement(formik_1.ErrorMessage, { name: "login", render: (error) => react_1.default.createElement(elements_1.FieldError, { message: error }) })),
                    react_1.default.createElement(antd_1.Col, { span: 24 },
                        react_1.default.createElement(antd_1.Typography.Text, null, "Password"),
                        react_1.default.createElement(antd_1.Input.Password, { placeholder: "Enter password", type: "password", size: "middle", value: 'password' in values ? values.password : '', onChange: (e) => setFieldValue('password', e.target.value) }),
                        react_1.default.createElement(formik_1.ErrorMessage, { name: "password", render: (error) => react_1.default.createElement(elements_1.FieldError, { message: error }) }),
                        react_1.default.createElement(RequestErrors_1.RequestErrors, { errors: (0, utils_1.convertIntoArray)(authenticateUserError === null || authenticateUserError === void 0 ? void 0 : authenticateUserError.errors) })))),
                react_1.default.createElement(antd_1.Col, { span: 24 },
                    react_1.default.createElement(antd_1.Space, { className: "w-full justify-end" },
                        react_1.default.createElement(antd_1.Button, { disabled: isAuthenticating, size: "middle", onClick: onCancel }, "Cancel"),
                        react_1.default.createElement(antd_1.Button, { htmlType: "submit", loading: isAuthenticating, type: "primary", size: "middle" }, "Authorize")))))))));
};
exports.AuthorizationModal = AuthorizationModal;
