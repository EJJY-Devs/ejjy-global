import dayjs, { Dayjs } from 'dayjs';
import _ from 'lodash';
import { Moment } from 'moment';
import {
	DATE_FORMAT_API,
	DATE_FORMAT_UI,
	EMPTY_CELL,
	TIME_FORMAT_UI,
	unitOfMeasurementTypes,
} from '../globals';
import { Product } from '../types';

export const formatNumberWithCommas = (x: number | string) =>
	x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');

export const formatRemoveCommas = (x: number | string) =>
	Number(x?.toString()?.replace(/,/g, '') || '');

export const convertIntoArray = (
	errors: string | string[] | Error | null | unknown,
	prefixMessage: string | null = null,
) => {
	const prefix = prefixMessage ? `${prefixMessage}: ` : '';
	if (typeof errors === 'string') {
		return [prefix + errors];
	}
	if (Array.isArray(errors)) {
		return errors.map((error) => prefix + error);
	}

	return [];
};

export const formatDate = (datetime: string | Dayjs) =>
	dayjs.tz(datetime).format(DATE_FORMAT_UI);

export const formatTime = (datetime: string | Dayjs) =>
	dayjs.tz(datetime).format(TIME_FORMAT_UI);

export const formatDateTime = (
	datetime: string | Dayjs,
	withTimezone = true,
) => {
	const dt = withTimezone ? dayjs.tz(datetime, 'GMT') : dayjs(datetime);
	return dt.format(`${DATE_FORMAT_UI} - ${TIME_FORMAT_UI}`);
};

export const formatDateTime24Hour = (datetime: string | Dayjs) =>
	dayjs.tz(datetime).format(`${DATE_FORMAT_UI} HH:mm`);

export const formatDateForAPI = (date: Dayjs | Moment) => {
	return date.format(DATE_FORMAT_API);
};

export const formatQuantity = (
	quantity: number,
	product: Product,
	type: string | null = null,
) => {
	if (
		[product.unit_of_measurement, type].includes(
			unitOfMeasurementTypes.WEIGHING,
		)
	) {
		return Number(quantity).toFixed(3);
	}

	if (
		[product.unit_of_measurement, type].includes(
			unitOfMeasurementTypes.NON_WEIGHING,
		)
	) {
		return Number(quantity).toFixed(0);
	}

	return '';
};

export const standardRound = (value: number) => _.round(value, 2).toFixed(2);

export const formatInPeso = (value: string | number, pesoSign = '₱') => {
	const x = Number(value);

	return _.isNaN(x)
		? EMPTY_CELL
		: `${x < 0 ? '-' : ''}${pesoSign}${formatNumberWithCommas(
				standardRound(Math.abs(x)),
			)}`;
};

export const formatTimeOnly = (time: string) =>
	dayjs(time, 'HH:mm:ss').format(TIME_FORMAT_UI);
