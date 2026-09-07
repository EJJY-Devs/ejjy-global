import { PrintCashCollection } from './types';
export declare const printCashCollectionNative: ({ cashBreakdown, siteSettings, user, }: PrintCashCollection) => string[];
export declare const generateCashCollectionContentCommands: (cashBreakdown: PrintCashCollection['cashBreakdown'], siteSettings: PrintCashCollection['siteSettings'], user: PrintCashCollection['user']) => string[];
