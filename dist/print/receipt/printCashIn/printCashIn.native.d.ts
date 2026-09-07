import { PrintCashIn } from './types';
export declare const printCashInNative: ({ cashBreakdown, siteSettings, user, }: PrintCashIn) => string[];
export declare const generateCashInContentCommands: (cashBreakdown: PrintCashIn['cashBreakdown'], siteSettings: PrintCashIn['siteSettings'], user: PrintCashIn['user']) => string[];
