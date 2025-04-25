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
const formik_1 = require("formik");
const react_1 = __importStar(require("react"));
const Yup = __importStar(require("yup"));
const hooks_1 = require("../../../hooks");
const utils_1 = require("../../../utils");
const elements_1 = require("../../elements");
const RequestErrors_1 = require("../../RequestErrors");
const AuthorizationModal = ({ baseURL, title = 'Authorization', description = 'Authorize', branchMachineId, branchId, userTypes = [], onSuccess, onCancel, }) => {
    const { mutateAsync: authenticateUser, isLoading: isAuthenticating, error: authenticateUserError, } = (0, hooks_1.useUserAuthenticate)(undefined, baseURL);
    // REFS
    const usernameRef = (0, react_1.useRef)(null);
    // METHODS
    (0, react_1.useEffect)(() => {
        if (usernameRef && usernameRef.current) {
            setTimeout(() => {
                var _a;
                (_a = usernameRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            }, 500);
        }
    }, [usernameRef]);
    return (react_1.default.createElement(antd_1.Modal, { footer: null, title: title, centered: true, closable: true, open: true, width: 350, onCancel: onCancel },
        react_1.default.createElement(formik_1.Formik, { initialValues: {
                login: '',
                password: '',
                description,
                branchMachineId,
                branchId,
            }, validationSchema: Yup.object().shape({
                login: Yup.string().required().label('Username'),
                password: Yup.string().required().label('Password'),
            }), onSubmit: (values, { setFieldError }) => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield authenticateUser(values);
                if (response.status !== 200) {
                    setFieldError('password', 'Incorrect username or password.');
                    return;
                }
                if (userTypes.length &&
                    !userTypes.includes(String(response.data.user_type))) {
                    setFieldError('password', 'User is not allowed.');
                    return;
                }
                onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(response.data);
            }) }, ({ values, setFieldValue }) => (react_1.default.createElement(formik_1.Form, null,
            react_1.default.createElement(antd_1.Row, { gutter: [16, 16] },
                react_1.default.createElement(antd_1.Col, { span: 24 },
                    react_1.default.createElement(antd_1.Typography.Text, null, "Username"),
                    react_1.default.createElement(antd_1.Input, { size: "middle", ref: usernameRef, value: values['login'], onChange: (e) => setFieldValue('login', e.target.value) }),
                    react_1.default.createElement(formik_1.ErrorMessage, { name: "login", render: (error) => react_1.default.createElement(elements_1.FieldError, { message: error }) })),
                react_1.default.createElement(antd_1.Col, { span: 24 },
                    react_1.default.createElement(antd_1.Typography.Text, null, "Password"),
                    react_1.default.createElement(antd_1.Input.Password, { type: "password", size: "middle", value: values['password'], onChange: (e) => setFieldValue('password', e.target.value) }),
                    react_1.default.createElement(formik_1.ErrorMessage, { name: "password", render: (error) => react_1.default.createElement(elements_1.FieldError, { message: error }) }),
                    react_1.default.createElement(RequestErrors_1.RequestErrors, { errors: (0, utils_1.convertIntoArray)(authenticateUserError === null || authenticateUserError === void 0 ? void 0 : authenticateUserError.errors) })),
                react_1.default.createElement(antd_1.Col, { span: 24 },
                    react_1.default.createElement(antd_1.Space, { className: "w-full justify-center" },
                        react_1.default.createElement(antd_1.Button, { disabled: isAuthenticating, block: true, size: "middle", onClick: onCancel }, "Cancel"),
                        react_1.default.createElement(antd_1.Button, { htmlType: "submit", loading: isAuthenticating, type: "primary", block: true, size: "middle" }, "Submit")))))))));
};
exports.AuthorizationModal = AuthorizationModal;
