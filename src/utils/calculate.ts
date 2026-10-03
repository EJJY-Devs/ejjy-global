import { ROW_HEIGHT } from '../globals';
import { CashBreakdown, Transaction } from '../types';

export const calculateTableHeight = (listLength: number) => {
	const MAX_ROW_COUNT = 6;
	return (
		ROW_HEIGHT * (listLength <= MAX_ROW_COUNT ? listLength : MAX_ROW_COUNT)
	);
};

export const countDecimals = (value: number) => {
	if (Math.floor(value) === value) return 0;
	return value.toString().split('.')[1].length || 0;
};

type CashBreakdownDenominationKey =
	| 'coins_25'
	| 'coins_1'
	| 'coins_5'
	| 'coins_10'
	| 'coins_20'
	| 'bills_20'
	| 'bills_50'
	| 'bills_100'
	| 'bills_200'
	| 'bills_500'
	| 'bills_1000';

type CashBreakdownDenomination = {
	key: CashBreakdownDenominationKey;
	value: number;
};

export const CASH_BREAKDOWN_COINS: CashBreakdownDenomination[] = [
	{ key: 'coins_25', value: 0.25 },
	{ key: 'coins_1', value: 1 },
	{ key: 'coins_5', value: 5 },
	{ key: 'coins_10', value: 10 },
	{ key: 'coins_20', value: 20 },
];

export const CASH_BREAKDOWN_BILLS: CashBreakdownDenomination[] = [
	{ key: 'bills_20', value: 20 },
	{ key: 'bills_50', value: 50 },
	{ key: 'bills_100', value: 100 },
	{ key: 'bills_200', value: 200 },
	{ key: 'bills_500', value: 500 },
	{ key: 'bills_1000', value: 1000 },
];

type CashBreakdownCounts = Pick<CashBreakdown, CashBreakdownDenominationKey>;

const sumDenominations = (
	cashBreakdown: CashBreakdownCounts,
	denominations: CashBreakdownDenomination[],
) =>
	// Work in centavos to avoid floating point drift (e.g. 0.25 x 3)
	denominations.reduce(
		(sum, { key, value }) =>
			sum + Math.round(value * 100) * (Number(cashBreakdown[key]) || 0),
		0,
	) / 100;

// Computed from the denomination counts (not total_amount) so print-only
// data and saved records always agree.
export const getCashBreakdownTotals = (cashBreakdown: CashBreakdownCounts) => {
	const coinsTotal = sumDenominations(cashBreakdown, CASH_BREAKDOWN_COINS);
	const billsTotal = sumDenominations(cashBreakdown, CASH_BREAKDOWN_BILLS);

	return { coinsTotal, billsTotal, total: coinsTotal + billsTotal };
};

export const calculateCashBreakdownTotal = (
	cashBreakdown: CashBreakdownCounts,
) => getCashBreakdownTotals(cashBreakdown).total;

// TODO: Remove once already implemented in backend
export const getComputedDiscount = (transaction: Transaction) => {
	return transaction.discount_option.is_special_discount
		? Number(transaction.overall_discount) -
				Number(transaction.invoice.vat_amount)
		: Number(transaction.overall_discount);
};
