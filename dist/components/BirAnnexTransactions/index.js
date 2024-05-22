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
exports.BirAnnexTransactions = void 0;
const antd_1 = require("antd");
const table_1 = __importDefault(require("antd/lib/table"));
const react_1 = __importStar(require("react"));
const globals_1 = require("../../globals");
const hooks_1 = require("../../hooks");
const utils_1 = require("../../utils");
const modals_1 = require("../modals");
const data_1 = require("./data");
const BirAnnexTransactions = ({ category, discountCode, isLoading, siteSettings, transactions, transactionsTotal, }) => {
    const [dataSource, setDataSource] = (0, react_1.useState)([]);
    const [selectedTransaction, setSelectedTransaction] = (0, react_1.useState)(null);
    const { params, setQueryParams } = (0, hooks_1.useQueryParams)();
    (0, react_1.useEffect)(() => {
        if (transactions && discountCode) {
            const listPwdSc = [
                data_1.birAnnexTransactionsTabs.SENIOR_CITIZEN_SALES_REPORT,
                data_1.birAnnexTransactionsTabs.PERSONS_WITH_DISABILITY_SALES_REPORT,
            ];
            const listNaacSp = [
                data_1.birAnnexTransactionsTabs.NATIONAL_ATHLETES_AND_COACHES_SALES_REPORT,
                data_1.birAnnexTransactionsTabs.SOLO_PARENTS_SALES_REPORT,
            ];
            const data = transactions.map((transaction) => {
                const content = {
                    key: transaction.id,
                    date: (0, utils_1.formatDate)(transaction.datetime_created),
                    orNumber: (react_1.default.createElement(antd_1.Button, { type: "link", onClick: () => setSelectedTransaction(transaction) }, transaction.invoice.or_number)),
                    netSales: (0, utils_1.formatInPeso)(transaction.invoice.vat_sales),
                };
                let fields = (0, utils_1.getDiscountFields)(discountCode, transaction.discount_option_additional_fields_values || '');
                if (category ===
                    data_1.birAnnexTransactionsTabs.NATIONAL_ATHLETES_AND_COACHES_SALES_REPORT) {
                    fields = fields;
                    content['coach'] = fields.coach;
                    content['id'] = fields.id;
                }
                else if (category === data_1.birAnnexTransactionsTabs.SOLO_PARENTS_SALES_REPORT) {
                    fields = fields;
                    content['name'] = fields.name;
                    content['id'] = fields.id;
                    content['childName'] = fields.childName;
                    content['childBirthdate'] = fields.childBirthdate;
                    content['childAge'] = fields.childAge;
                }
                else if (category === data_1.birAnnexTransactionsTabs.SENIOR_CITIZEN_SALES_REPORT) {
                    fields = fields;
                    content['name'] = fields.name;
                    content['id'] = fields.id;
                    content['tin'] = fields.tin;
                }
                else if (category ===
                    data_1.birAnnexTransactionsTabs.PERSONS_WITH_DISABILITY_SALES_REPORT) {
                    fields = fields;
                    content['name'] = fields.name;
                    content['id'] = fields.id;
                    content['tin'] = fields.tin;
                }
                if (listNaacSp.includes(category)) {
                    content['gross'] = (0, utils_1.formatInPeso)(transaction.gross_amount);
                    content['salesDiscount'] = (0, utils_1.formatInPeso)(transaction.overall_discount);
                }
                if (listPwdSc.includes(category)) {
                    content['sales'] = (0, utils_1.formatInPeso)(transaction.total_amount);
                    content['vatAmount'] = (0, utils_1.formatInPeso)(transaction.invoice.vat_amount);
                    content['vatExemptSales'] = (0, utils_1.formatInPeso)(transaction.invoice.vat_exempt);
                    content['5%'] = (0, utils_1.formatInPeso)(0);
                    content['20%'] = (0, utils_1.formatInPeso)(transaction.overall_discount);
                }
                return content;
            });
            setDataSource(data);
        }
    }, [transactions, category]);
    const getColumns = (0, react_1.useCallback)(() => {
        const categoryColumnsMap = {
            [data_1.birAnnexTransactionsTabs.NATIONAL_ATHLETES_AND_COACHES_SALES_REPORT]: [
                { title: 'Name of National Athlete/Coach', dataIndex: 'coach' },
                { title: 'PNSTM ID No.', dataIndex: 'id' },
            ],
            [data_1.birAnnexTransactionsTabs.SOLO_PARENTS_SALES_REPORT]: [
                { title: 'Name of Solo Parent', dataIndex: 'name' },
                { title: 'SPIC No.', dataIndex: 'id' },
                { title: 'Name of child', dataIndex: 'childName' },
                { title: 'Birth Date of child', dataIndex: 'childBirthdate' },
                { title: 'Age of child', dataIndex: 'childAge' },
            ],
            [data_1.birAnnexTransactionsTabs.SENIOR_CITIZEN_SALES_REPORT]: [
                { title: 'Name of Senior Citizen (SC)', dataIndex: 'name' },
                { title: 'OSCA ID No./ SC ID No.', dataIndex: 'id' },
                { title: 'SC TIN', dataIndex: 'tin' },
            ],
            [data_1.birAnnexTransactionsTabs.PERSONS_WITH_DISABILITY_SALES_REPORT]: [
                { title: 'Name of Person with Disability (PWD)', dataIndex: 'name' },
                { title: 'PWD ID No.', dataIndex: 'id' },
                { title: 'PWD TIN', dataIndex: 'tin' },
            ],
        };
        const columnsNaacSp = [
            { title: 'Gross Sales/Receipts', dataIndex: 'gross' },
            { title: 'Sales Discount (VAT+Disc)', dataIndex: 'salesDiscount' },
        ];
        const columnsScPwd = [
            { title: 'Sales (inclusive of VAT)', dataIndex: 'sales' },
            { title: 'VAT Amount', dataIndex: 'vatAmount' },
            { title: 'VAT Exempt Sales', dataIndex: 'vatExemptSales' },
            {
                title: 'Discount',
                children: [
                    { title: '5%', dataIndex: '5%' },
                    { title: '20%', dataIndex: '20%' },
                ],
            },
        ];
        const salesColumnsMap = {
            [data_1.birAnnexTransactionsTabs.NATIONAL_ATHLETES_AND_COACHES_SALES_REPORT]: columnsNaacSp,
            [data_1.birAnnexTransactionsTabs.SOLO_PARENTS_SALES_REPORT]: columnsNaacSp,
            [data_1.birAnnexTransactionsTabs.SENIOR_CITIZEN_SALES_REPORT]: columnsScPwd,
            [data_1.birAnnexTransactionsTabs.PERSONS_WITH_DISABILITY_SALES_REPORT]: columnsScPwd,
        };
        return [
            { title: 'Date', dataIndex: 'date' },
            ...(categoryColumnsMap[category] || []),
            { title: 'SI / OR Number', dataIndex: 'orNumber' },
            ...(salesColumnsMap[category] || []),
            { title: 'Net Sales', dataIndex: 'netSales' },
        ];
    }, [category]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(table_1.default, { columns: getColumns(), dataSource: dataSource, loading: isLoading, pagination: {
                current: Number(params.page) || globals_1.DEFAULT_PAGE,
                total: transactionsTotal,
                pageSize: Number(params.pageSize) || globals_1.DEFAULT_PAGE_SIZE,
                onChange: (page, newPageSize) => {
                    setQueryParams({
                        page,
                        pageSize: newPageSize,
                    }, { shouldResetPage: true });
                },
                disabled: !dataSource,
                position: ['bottomCenter'],
            }, scroll: { x: 1500 }, size: "middle", bordered: true }),
        selectedTransaction && (react_1.default.createElement(modals_1.ViewTransactionModal, { siteSettings: siteSettings, transaction: selectedTransaction, onClose: () => setSelectedTransaction(null) }))));
};
exports.BirAnnexTransactions = BirAnnexTransactions;
