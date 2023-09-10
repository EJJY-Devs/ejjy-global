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
exports.ViewTransactionModal = void 0;
const icons_1 = require("@ant-design/icons");
const antd_1 = require("antd");
const dayjs_1 = __importDefault(require("dayjs"));
const react_1 = __importStar(require("react"));
const globals_1 = require("../../../globals");
const hooks_1 = require("../../../hooks");
const print_1 = require("../../../print");
const utils_1 = require("../../../utils");
const Printing_1 = require("../../Printing");
const { Text } = antd_1.Typography;
const columns = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Qty', dataIndex: 'qty', align: 'center' },
    { title: 'Rate', dataIndex: 'rate', align: 'center' },
    { title: 'Subtotal', dataIndex: 'subtotal', align: 'center' },
];
const ViewTransactionModal = ({ transaction, siteSettings, onClose, }) => {
    var _a, _b, _c;
    // STATE
    const [dataSource, setDataSource] = (0, react_1.useState)([]);
    const [transactionData, setTransactionData] = (0, react_1.useState)(null);
    const [fields, setFields] = (0, react_1.useState)([]);
    const [isCreatingTxt, setIsCreatingTxt] = (0, react_1.useState)(false);
    const [title, setTitle] = (0, react_1.useState)('Invoice');
    // CUSTOM HOOKS
    const { htmlPdf, isLoadingPdf, previewPdf, downloadPdf } = (0, hooks_1.usePdf)({
        title: `SalesInvoice_${(_a = transactionData === null || transactionData === void 0 ? void 0 : transactionData.invoice) === null || _a === void 0 ? void 0 : _a.or_number}`,
        print: () => {
            if (!transactionData) {
                antd_1.message.error(globals_1.GENERIC_ERROR_MESSAGE);
                return undefined;
            }
            (0, print_1.printSalesInvoice)(transactionData, siteSettings, transactionData.branch_machine, true, true);
        },
    });
    const { data: transactionRetrieved, isFetching } = (0, hooks_1.useTransactionRetrieve)({
        id: typeof transaction === 'number' ? transaction : transaction.id,
        options: { enabled: typeof transaction === 'number' },
    });
    // METHODS
    (0, react_1.useEffect)(() => {
        let transactionProducts = [];
        if (typeof transaction !== 'number') {
            transactionProducts = transaction === null || transaction === void 0 ? void 0 : transaction.products;
        }
        if (transactionRetrieved === null || transactionRetrieved === void 0 ? void 0 : transactionRetrieved.products.length) {
            transactionProducts = transactionRetrieved === null || transactionRetrieved === void 0 ? void 0 : transactionRetrieved.products.map((tp) => (Object.assign({ product: tp.branch_product.product }, tp)));
        }
        const formattedProducts = transactionProducts.map((item) => ({
            key: item.id,
            name: `${item.branch_product.product.name} - ${item.branch_product.product.is_vat_exempted
                ? globals_1.vatTypes.VAT_EMPTY
                : globals_1.vatTypes.VATABLE}`,
            qty: item.original_quantity,
            rate: (0, utils_1.formatInPeso)(item.price_per_piece),
            subtotal: (0, utils_1.formatInPeso)(Number(item.quantity) * Number(item.price_per_piece)),
        }));
        setDataSource(formattedProducts);
    }, [transaction, transactionRetrieved]);
    (0, react_1.useEffect)(() => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        // Set transaction
        const newTransaction = typeof transaction === 'number' ? transactionRetrieved : transaction;
        setTransactionData(newTransaction);
        // Set title
        if (newTransaction === null || newTransaction === void 0 ? void 0 : newTransaction.id) {
            if (newTransaction.payment.mode === globals_1.saleTypes.CASH) {
                setTitle('CASH SALES INVOICE');
            }
            else if (newTransaction.payment.mode === globals_1.saleTypes.CREDIT) {
                setTitle('CHARGE SALES INVOICE');
            }
        }
        // Set client fields
        let newFields = [];
        if ((_a = newTransaction === null || newTransaction === void 0 ? void 0 : newTransaction.discount_option_additional_fields_values) === null || _a === void 0 ? void 0 : _a.length) {
            const discountOptionFields = JSON.parse(newTransaction.discount_option_additional_fields_values);
            newFields = Object.keys(discountOptionFields).map((key) => ({
                key,
                value: discountOptionFields[key],
            }));
        }
        else if (((_b = newTransaction === null || newTransaction === void 0 ? void 0 : newTransaction.client) === null || _b === void 0 ? void 0 : _b.name) ||
            ((_c = newTransaction === null || newTransaction === void 0 ? void 0 : newTransaction.payment) === null || _c === void 0 ? void 0 : _c.creditor_account)) {
            newFields = [
                {
                    key: 'NAME',
                    value: ((_d = newTransaction.client) === null || _d === void 0 ? void 0 : _d.name) ||
                        (0, utils_1.getFullName)((_e = newTransaction.payment) === null || _e === void 0 ? void 0 : _e.creditor_account) ||
                        globals_1.EMPTY_CELL,
                },
                {
                    key: 'TIN',
                    value: ((_f = newTransaction.client) === null || _f === void 0 ? void 0 : _f.tin) ||
                        ((_h = (_g = newTransaction.payment) === null || _g === void 0 ? void 0 : _g.creditor_account) === null || _h === void 0 ? void 0 : _h.tin) ||
                        globals_1.EMPTY_CELL,
                },
                {
                    key: 'ADDRESS',
                    value: ((_j = newTransaction.client) === null || _j === void 0 ? void 0 : _j.address) ||
                        ((_l = (_k = newTransaction.payment) === null || _k === void 0 ? void 0 : _k.creditor_account) === null || _l === void 0 ? void 0 : _l.home_address) ||
                        globals_1.EMPTY_CELL,
                },
            ];
        }
        setFields(newFields);
    }, [transactionRetrieved, transaction]);
    const handlePrint = () => {
        if (!transactionData) {
            antd_1.message.error(globals_1.GENERIC_ERROR_MESSAGE);
            return;
        }
        (0, print_1.printSalesInvoice)(transactionData, siteSettings, transactionData.branch_machine, true);
    };
    const handleCreateTxt = () => {
        if (!transactionData) {
            antd_1.message.error(globals_1.GENERIC_ERROR_MESSAGE);
            return;
        }
        setIsCreatingTxt(true);
        (0, print_1.createSalesInvoiceTxt)(transactionData, siteSettings, transactionData.branch_machine, true);
        setIsCreatingTxt(false);
    };
    return (react_1.default.createElement(antd_1.Modal, { footer: [
            react_1.default.createElement(antd_1.Button, { key: "print", disabled: isLoadingPdf || isCreatingTxt, icon: react_1.default.createElement(icons_1.PrinterOutlined, null), type: "primary", onClick: handlePrint }, "Print"),
            react_1.default.createElement(Printing_1.PdfButtons, { key: "pdf", downloadPdf: downloadPdf, isDisabled: isLoadingPdf, isLoading: isLoadingPdf, previewPdf: previewPdf }),
            react_1.default.createElement(antd_1.Button, { key: "txt", disabled: isLoadingPdf || isCreatingTxt, icon: react_1.default.createElement(icons_1.FileTextOutlined, null), loading: isCreatingTxt, type: "primary", onClick: handleCreateTxt }, "Create TXT"),
        ], title: title, width: 425, centered: true, closable: true, open: true, onCancel: onClose },
        react_1.default.createElement(antd_1.Spin, { spinning: isFetching }, (transactionData === null || transactionData === void 0 ? void 0 : transactionData.id) && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(Printing_1.ReceiptHeader, { branchMachine: transactionData.branch_machine, siteSettings: siteSettings, title: title }),
            react_1.default.createElement(antd_1.Table, { className: "mt-6", columns: columns, dataSource: dataSource, pagination: false, size: "small", bordered: true }),
            react_1.default.createElement(antd_1.Descriptions, { className: "mt-6 w-100", colon: false, column: 1, contentStyle: {
                    textAlign: 'right',
                    display: 'block',
                }, labelStyle: {
                    width: 200,
                }, size: "small" },
                transactionData.discount_option && (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(antd_1.Descriptions.Item, { label: "GROSS AMOUNT" },
                        (0, utils_1.formatInPeso)(transactionData.gross_amount),
                        "\u00A0"),
                    react_1.default.createElement(antd_1.Descriptions.Item, { label: `DISCOUNT | ${transactionData.discount_option.code}` },
                        "(",
                        (0, utils_1.formatInPeso)((0, utils_1.getComputedDiscount)(transactionData)),
                        ")"),
                    transactionData.discount_option.is_special_discount && (react_1.default.createElement(antd_1.Descriptions.Item, { label: "VAT AMOUNT" },
                        "(",
                        (0, utils_1.formatInPeso)(transactionData.invoice.vat_amount),
                        ")")))),
                react_1.default.createElement(antd_1.Descriptions.Item, { contentStyle: { fontWeight: 'bold' }, label: "TOTAL AMOUNT" },
                    (0, utils_1.formatInPeso)(transactionData.total_amount),
                    "\u00A0")),
            transactionData.payment.mode === globals_1.saleTypes.CASH && (react_1.default.createElement(antd_1.Descriptions, { className: "mt-6 w-100", colon: false, column: 1, contentStyle: {
                    textAlign: 'right',
                    display: 'block',
                }, labelStyle: {
                    width: 200,
                    paddingLeft: 30,
                }, size: "small" },
                react_1.default.createElement(antd_1.Descriptions.Item, { label: "AMOUNT RECEIVED" },
                    (0, utils_1.formatInPeso)(transactionData.payment.amount_tendered),
                    "\u00A0"),
                react_1.default.createElement(antd_1.Descriptions.Item, { label: "AMOUNT DUE" },
                    (0, utils_1.formatInPeso)(transactionData.total_amount),
                    "\u00A0"),
                react_1.default.createElement(antd_1.Descriptions.Item, { contentStyle: { fontWeight: 'bold' }, label: "CHANGE" },
                    (0, utils_1.formatInPeso)(Number(transactionData.payment.amount_tendered) -
                        Number(transactionData.total_amount)),
                    "\u00A0"))),
            react_1.default.createElement(antd_1.Descriptions, { className: "mt-6 w-100", colon: false, column: 1, contentStyle: {
                    textAlign: 'right',
                    display: 'block',
                }, labelStyle: {
                    width: 200,
                }, size: "small" },
                react_1.default.createElement(antd_1.Descriptions.Item, { label: "VAT Exempt" },
                    (0, utils_1.formatInPeso)(transactionData.invoice.vat_exempt),
                    "\u00A0"),
                react_1.default.createElement(antd_1.Descriptions.Item, { label: "VATable Sales" },
                    (0, utils_1.formatInPeso)(transactionData.invoice.vat_sales),
                    "\u00A0"),
                react_1.default.createElement(antd_1.Descriptions.Item, { label: "VAT Amount (12%)" },
                    (0, utils_1.formatInPeso)(transactionData.invoice.vat_amount),
                    "\u00A0"),
                react_1.default.createElement(antd_1.Descriptions.Item, { label: "ZERO Rated" },
                    (0, utils_1.formatInPeso)(0),
                    "\u00A0")),
            react_1.default.createElement(antd_1.Space, { className: "mt-6 w-100", direction: "vertical" },
                react_1.default.createElement(Text, null,
                    "GDT: ",
                    (0, utils_1.formatDateTime)(transactionData.invoice.datetime_created)),
                react_1.default.createElement(Text, null,
                    "PDT: ",
                    (0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)),
                react_1.default.createElement(antd_1.Space, { className: "w-100 justify-space-between" },
                    react_1.default.createElement(Text, null, transactionData.invoice.or_number),
                    react_1.default.createElement(Text, null,
                        dataSource.length,
                        " item(s)")),
                react_1.default.createElement(Text, null, transactionData.teller.employee_id)),
            ((_b = transactionData === null || transactionData === void 0 ? void 0 : transactionData.adjustment_remarks) === null || _b === void 0 ? void 0 : _b.previous_voided_transaction) && (react_1.default.createElement(antd_1.Space, { className: "w-100 justify-space-between" },
                react_1.default.createElement(Text, null,
                    "Prev Invoice #:",
                    ' ',
                    transactionData.adjustment_remarks
                        .previous_voided_transaction.invoice.or_number))),
            ((_c = transactionData === null || transactionData === void 0 ? void 0 : transactionData.adjustment_remarks) === null || _c === void 0 ? void 0 : _c.new_updated_transaction) && (react_1.default.createElement(antd_1.Space, { className: "w-100 justify-space-between" },
                react_1.default.createElement(Text, null,
                    "New Invoice #:",
                    ' ',
                    transactionData.adjustment_remarks.new_updated_transaction
                        .invoice.or_number))),
            fields.length > 0 && (react_1.default.createElement(antd_1.Descriptions, { colon: false, column: 1, labelStyle: {
                    width: 200,
                    paddingLeft: 15,
                }, size: "small" }, fields.map(({ key, value }) => (react_1.default.createElement(antd_1.Descriptions.Item, { key: key, label: key }, value))))),
            react_1.default.createElement(Printing_1.ReceiptFooter, { siteSettings: siteSettings }),
            (transactionData === null || transactionData === void 0 ? void 0 : transactionData.status) === globals_1.transactionStatuses.FULLY_PAID && (react_1.default.createElement(Text, { className: "d-block text-center", style: { whiteSpace: 'pre-line' } }, siteSettings === null || siteSettings === void 0 ? void 0 : siteSettings.invoice_last_message)),
            [
                globals_1.transactionStatuses.VOID_CANCELLED,
                globals_1.transactionStatuses.VOID_EDITED,
            ].includes(transactionData === null || transactionData === void 0 ? void 0 : transactionData.status) && (react_1.default.createElement(Text, { className: "mt-4 d-block text-center" }, "VOIDED TRANSACTION")),
            react_1.default.createElement(Text, { className: "d-block text-center" },
                "\"", siteSettings === null || siteSettings === void 0 ? void 0 :
                siteSettings.thank_you_message,
                "\"")))),
        react_1.default.createElement("div", { 
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML: { __html: htmlPdf }, style: { display: 'none' } })));
};
exports.ViewTransactionModal = ViewTransactionModal;
