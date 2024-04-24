"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSiteSettingsEdit = void 0;
const react_query_1 = require("react-query");
const services_1 = require("../services");
const helper_1 = require("./helper");
const SITE_SETTINGS_STALE_TIME = 5000;
const useSiteSettings = (data = {}) => {
    const { params, options, serviceOptions } = data;
    return (0, react_query_1.useQuery)(['useSiteSettings', params], () => (0, helper_1.wrapServiceWithCatch)(services_1.SiteSettingsService.retrieve({ branch_id: params === null || params === void 0 ? void 0 : params.branchId }, serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.baseURL, serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.type)), Object.assign({ refetchOnMount: 'always', staleTime: SITE_SETTINGS_STALE_TIME }, options));
};
const useSiteSettingsEdit = (options, baseURL) => (0, react_query_1.useMutation)(({ addressOfTaxPayer, appDescription, closeDayDeadline, closeSessionDeadline, contactNumber, id, isDiscountAllowedIfCredit, isManualInputAllowed, isMarkdownAllowedIfCredit, isTimeCheckerFeatureEnabled, logoBase64, posAccreditationDate, posAccreditationNumber, posAccreditationValidUntilDate, productVersion, proprietor, ptuDate, ptuNumber, ptuValidUntilDate, reportingPeriodDayOfMonth, resetCounterNotificationThresholdAmount, resetCounterNotificationThresholdInvoiceNumber, softwareDeveloper, softwareDeveloperAddress, softwareDeveloperTin, storeName, taxType, thankYouMessage, tin, }) => services_1.SiteSettingsService.edit(id, {
    address_of_tax_payer: addressOfTaxPayer,
    app_description: appDescription,
    close_day_deadline: closeDayDeadline,
    close_session_deadline: closeSessionDeadline,
    contact_number: contactNumber,
    is_discount_allowed_if_credit: isDiscountAllowedIfCredit,
    is_manual_input_allowed: isManualInputAllowed,
    is_markdown_allowed_if_credit: isMarkdownAllowedIfCredit,
    is_time_checker_feature_enabled: isTimeCheckerFeatureEnabled,
    logo_base64: logoBase64,
    pos_accreditation_date: posAccreditationDate,
    pos_accreditation_number: posAccreditationNumber,
    pos_accreditation_valid_until_date: posAccreditationValidUntilDate,
    product_version: productVersion,
    proprietor,
    ptu_date: ptuDate,
    ptu_number: ptuNumber,
    ptu_valid_until_date: ptuValidUntilDate,
    reporting_period_day_of_month: reportingPeriodDayOfMonth,
    reset_counter_notification_threshold_amount: resetCounterNotificationThresholdAmount,
    reset_counter_notification_threshold_invoice_number: resetCounterNotificationThresholdInvoiceNumber,
    software_developer_address: softwareDeveloperAddress,
    software_developer_tin: softwareDeveloperTin,
    software_developer: softwareDeveloper,
    store_name: storeName,
    tax_type: taxType,
    thank_you_message: thankYouMessage,
    tin,
}, baseURL), options);
exports.useSiteSettingsEdit = useSiteSettingsEdit;
exports.default = useSiteSettings;
