import { SiteSettings, Transaction, User } from '../../types';
export declare const printCancelledTransactions: (amount: number, filterRange: string, filterStatus: string, siteSettings: SiteSettings, transactions: Transaction[], user: User, onComplete: () => void) => void;
