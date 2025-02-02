import { ReceiptHeaderProps } from '../components';
import { ItemBlockItems } from '../components/Printing/ItemBlock';
import { SiteSettings } from '../types';
export declare const generateReceiptHeaderCommands: ({ branchMachine, siteSettings, title, }: ReceiptHeaderProps) => string[];
export declare const generateReceiptFooterCommands: (siteSettings: SiteSettings) => string[];
type ItemBlockItemsCommands = Omit<ItemBlockItems, 'labelStyle' | 'contentStyle'>;
export declare const generateItemBlockCommands: (items: ItemBlockItemsCommands[]) => string[];
export {};
