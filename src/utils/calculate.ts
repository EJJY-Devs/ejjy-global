import { ROW_HEIGHT } from "../globals";
import { CashBreakdown, Transaction } from "../types";

export const calculateTableHeight = (listLength: number) => {
  const MAX_ROW_COUNT = 6;
  return (
    ROW_HEIGHT * (listLength <= MAX_ROW_COUNT ? listLength : MAX_ROW_COUNT)
  );
};

export const countDecimals = (value: number) => {
  if (Math.floor(value) === value) return 0;
  return value.toString().split(".")[1].length || 0;
};

export const calculateCashBreakdownTotal = (cashBreakdown: CashBreakdown) =>
  0.25 * cashBreakdown.coins_25 +
  1 * cashBreakdown.coins_1 +
  5 * cashBreakdown.coins_5 +
  10 * cashBreakdown.coins_10 +
  20 * cashBreakdown.coins_20 +
  20 * cashBreakdown.bills_20 +
  50 * cashBreakdown.bills_50 +
  100 * cashBreakdown.bills_100 +
  200 * cashBreakdown.bills_200 +
  500 * cashBreakdown.bills_500 +
  1000 * cashBreakdown.bills_1000;

// TODO: Remove once already implemented in backend
export const getComputedDiscount = (transaction: Transaction) => {
  return transaction.discount_option.is_special_discount
    ? Number(transaction.overall_discount) -
        Number(transaction.invoice.vat_amount)
    : transaction.overall_discount;
};
