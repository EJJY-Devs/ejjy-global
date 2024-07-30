import { CashBreakdown, Transaction } from '../types';
export declare const calculateTableHeight: (listLength: number) => number;
export declare const countDecimals: (value: number) => number;
export declare const calculateCashBreakdownTotal: (cashBreakdown: CashBreakdown) => number;
export declare const getComputedDiscount: (transaction: Transaction) => number;
