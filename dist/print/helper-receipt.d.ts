import React from 'react';
import { ReceiptReportSummaryProps } from '../components';
import { ItemBlockProps } from '../components/Printing/ItemBlock';
import { BranchMachine, SiteSettings } from '../types';
export declare const PESO_SIGN = "P";
export declare const EMPTY_CELL = "";
export declare const UNDERLINE_TEXT = "---------";
export declare const PAPER_MARGIN_INCHES = 0.2;
export declare const PAPER_WIDTH_INCHES = 3;
export declare const QZ_MESSAGE_KEY = "QZ_MESSAGE_KEY";
export declare const PRINT_MESSAGE_KEY = "PRINT_MESSAGE_KEY";
export declare const configurePrinter: (appPrinterName: string, appPrinterFontSize: string, appPrinterFontFamily: string) => void;
export declare const getHeader: (siteSettings: SiteSettings, branchMachine?: BranchMachine, title?: string) => string;
export declare const getFooter: (siteSettings: SiteSettings) => string;
export declare const getPageStyle: (extraStyle?: string) => string;
export declare const getPageStyleObject: (extraStyle?: React.CSSProperties) => React.CSSProperties;
export declare const appendHtmlElement: (data: string) => string;
export declare const print: (printData: string, entity: string, onComplete?: () => void) => Promise<void>;
export declare const formatInPesoWithUnderline: (value: string | number) => string;
export declare const addUnderline: (value: string | number) => "" | "<div style=\"width: 100%; text-align: right\">-----------</div>";
export declare const ItemBlock: ({ items }: ItemBlockProps) => React.JSX.Element;
export declare const Divider: () => React.JSX.Element;
export declare const ReceiptReportSummary: ({ items }: ReceiptReportSummaryProps) => React.JSX.Element;
