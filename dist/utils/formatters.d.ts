import { Dayjs } from 'dayjs';
import { Moment } from 'moment';
import { Product } from '../types';
export declare const formatNumberWithCommas: (x: number | string) => string;
export declare const formatRemoveCommas: (x: number | string) => number;
export declare const convertIntoArray: (errors: string | string[] | Error | null | unknown, prefixMessage?: string | null) => string[];
export declare const formatDate: (datetime: string | Dayjs) => string;
export declare const formatDateTime: (datetime: string | Dayjs, withTimezone?: boolean) => string;
export declare const formatDateTime24Hour: (datetime: string | Dayjs) => string;
export declare const formatDateForAPI: (date: Dayjs | Moment) => string;
export declare const formatQuantity: (quantity: number, product: Product, type?: string | null) => string | 0;
export declare const standardRound: (value: number) => string;
export declare const formatInPeso: (value: string | number, pesoSign?: string) => string;
