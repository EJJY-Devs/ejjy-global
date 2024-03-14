import {
	UseMutationOptions,
	UseQueryOptions,
	useMutation,
	useQuery,
} from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { SiteSettingsService } from '../services';
import { Edit, Params } from '../services/SiteSettingsService';
import { SiteSettings } from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery } from './inteface';
import { AxiosResponse } from 'axios';
import { AxiosErrorResponse } from '../services/interfaces';

const SITE_SETTINGS_STALE_TIME = 5000;

const useSiteSettings = (
	data: UseListQuery<
		SiteSettings,
		CamelCasedProperties<Params>,
		UseQueryOptions<SiteSettings>
	> = {},
) => {
	const { params, options, serviceOptions } = data;

	return useQuery<SiteSettings>(
		['useSiteSettings', params],
		() =>
			wrapServiceWithCatch(
				SiteSettingsService.retrieve(
					{ branch_id: params?.branchId },
					serviceOptions?.baseURL,
					serviceOptions?.type,
				),
			),
		{
			refetchOnMount: 'always',
			staleTime: SITE_SETTINGS_STALE_TIME,
			...options,
		},
	);
};

export const useSiteSettingsEdit = (
	options?: UseMutationOptions<
		AxiosResponse<void>,
		AxiosErrorResponse,
		CamelCasedProperties<Edit & { id: number }>
	>,
	baseURL?: string,
) =>
	useMutation<
		AxiosResponse<void>,
		AxiosErrorResponse,
		CamelCasedProperties<Edit & { id: number }>
	>(
		({
			addressOfTaxPayer,
			appDescription,
			closeDayDeadline,
			closeSessionDeadline,
			contactNumber,
			id,
			isDiscountAllowedIfCredit,
			isManualInputAllowed,
			isMarkdownAllowedIfCredit,
			isTimeCheckerFeatureEnabled,
			logoBase64,
			posAccreditationDate,
			posAccreditationNumber,
			posAccreditationValidUntilDate,
			productVersion,
			proprietor,
			ptuDate,
			ptuNumber,
			ptuValidUntilDate,
			reportingPeriodDayOfMonth,
			resetCounterNotificationThresholdAmount,
			resetCounterNotificationThresholdInvoiceNumber,
			invoiceLastMessage,
			softwareDeveloper,
			softwareDeveloperAddress,
			softwareDeveloperTin,
			storeName,
			taxType,
			thankYouMessage,
			tin,
		}) =>
			SiteSettingsService.edit(
				id,
				{
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
					reset_counter_notification_threshold_amount:
						resetCounterNotificationThresholdAmount,
					reset_counter_notification_threshold_invoice_number:
						resetCounterNotificationThresholdInvoiceNumber,
					invoice_last_message: invoiceLastMessage,
					software_developer_address: softwareDeveloperAddress,
					software_developer_tin: softwareDeveloperTin,
					software_developer: softwareDeveloper,
					store_name: storeName,
					tax_type: taxType,
					thank_you_message: thankYouMessage,
					tin,
				},
				baseURL,
			),
		options,
	);

export default useSiteSettings;
