import { CashBreakdown, Transaction } from '../types';
export declare const calculateTableHeight: (listLength: number) => number;
export declare const countDecimals: (value: number) => number;
type CashBreakdownDenominationKey = 'coins_25' | 'coins_1' | 'coins_5' | 'coins_10' | 'coins_20' | 'bills_20' | 'bills_50' | 'bills_100' | 'bills_200' | 'bills_500' | 'bills_1000';
type CashBreakdownDenomination = {
    key: CashBreakdownDenominationKey;
    value: number;
};
export declare const CASH_BREAKDOWN_COINS: CashBreakdownDenomination[];
export declare const CASH_BREAKDOWN_BILLS: CashBreakdownDenomination[];
type CashBreakdownCounts = Pick<CashBreakdown, CashBreakdownDenominationKey>;
export declare const getCashBreakdownTotals: (cashBreakdown: CashBreakdownCounts) => {
    coinsTotal: number;
    billsTotal: number;
    total: number;
};
export declare const getCashInDrawerTotals: (cashBreakdown: {
    total_e_payments?: number;
    total_others?: number;
    total_remittance?: number;
}, cashTotal: number, summary?: {
    ePayments: number;
    others: number;
}) => {
    ePayments: number;
    others: number | undefined;
    remittance: number;
} | undefined;
export declare const calculateCashBreakdownTotal: (cashBreakdown: CashBreakdownCounts) => number;
export declare const getComputedDiscount: (transaction: Transaction) => number;
export {};
