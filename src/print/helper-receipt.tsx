import { message } from 'antd';
import qz from 'qz-tray';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ReceiptReportSummaryProps } from '../components';
import { ItemBlockProps } from '../components/Printing/ItemBlock';
import { printerStatuses } from '../globals';
import { BranchMachine, SiteSettings } from '../types';
import {
	authenticateQZTray,
	formatInPeso,
	getTaxTypeDescription,
} from '../utils';

export const PESO_SIGN = 'P';
export const EMPTY_CELL = '';
export const UNDERLINE_TEXT = '---------';

export const PAPER_MARGIN_INCHES = 0.2;
export const PAPER_WIDTH_INCHES = 3;
export const QZ_MESSAGE_KEY = 'QZ_MESSAGE_KEY';
export const PRINT_MESSAGE_KEY = 'PRINT_MESSAGE_KEY';

let printerName: string;
let printerFontSize: string;
let printerFontFamily: string;

export const configurePrinter = (
	appPrinterName: string,
	appPrinterFontSize: string,
	appPrinterFontFamily: string,
) => {
	printerName = appPrinterName;
	printerFontSize = appPrinterFontSize;
	printerFontFamily = appPrinterFontFamily;

	if (!qz.websocket.isActive()) {
		authenticateQZTray(qz);

		message.loading({
			content: 'Connecting to QZTray...',
			key: QZ_MESSAGE_KEY,
			duration: 5_000,
		});

		qz.websocket
			.connect()
			.then(() => {
				message.success({
					content: 'Successfully connected to QZTray.',
					key: QZ_MESSAGE_KEY,
				});
			})
			.catch((err: Error) => {
				message.error({
					content: 'Cannot connect to QZTray.',
					key: QZ_MESSAGE_KEY,
				});
				console.error(err);
			});
	}
};

type HeaderProps = {
	siteSettings: SiteSettings;
	branchMachine?: BranchMachine;
	title?: string;
};
export const Header = ({ siteSettings, branchMachine, title }: HeaderProps) => {
	const {
		contact_number: contactNumber,
		address_of_tax_payer: location,
		proprietor,
		store_name: storeName,
		tax_type: taxType,
		tin,
	} = siteSettings;
	const {
		name,
		machine_identification_number: machineID,
		pos_terminal: posTerminal,
	} = branchMachine || {};

	React.createElement('style', {}, [
		`
    table {
      font-size: inherit;
    }

    td {
      padding: 0;
    }
    `,
	]);

	return (
		<div
			style={{
				textAlign: 'center',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<span style={{ whiteSpace: 'pre-line' }}>{storeName}</span>
			<span style={{ whiteSpace: 'pre-line' }}>{location}</span>
			<span>
				{contactNumber} {name ? '| ' + name : ''}
			</span>
			<span>{proprietor}</span>
			<span>
				{getTaxTypeDescription(taxType)} | {tin}
			</span>
			<span>MIN: {machineID}</span>
			<span>SN: {posTerminal}</span>
			{title ? <br /> : ''}
			{title}
		</div>
	);
};

export const getHeader = (
	siteSettings: SiteSettings,
	branchMachine?: BranchMachine,
	title?: string,
) =>
	ReactDOMServer.renderToStaticMarkup(
		<Header
			siteSettings={siteSettings}
			branchMachine={branchMachine}
			title={title}
		/>,
	);

type FooterProps = {
	siteSettings: SiteSettings;
};

export const Footer = ({ siteSettings }: FooterProps) => {
	const {
		software_developer: softwareDeveloper,
		software_developer_address: softwareDeveloperAddress,
		software_developer_tin: softwareDeveloperTin,
		pos_accreditation_number: posAccreditationNumber,
		pos_accreditation_date: posAccreditationDate,
		ptu_number: ptuNumber,
		ptu_date: ptuDate,
	} = siteSettings;

	return (
		<div
			style={{
				textAlign: 'center',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<span>{softwareDeveloper}</span>
			<span style={{ whiteSpace: 'pre-line' }}>{softwareDeveloperAddress}</span>
			<span>{softwareDeveloperTin}</span>
			<span>Acc No: {posAccreditationNumber}</span>
			<span>Date Issued: {posAccreditationDate}</span>
			<br />
			<span>PTU No: {ptuNumber}</span>
			<span>Date Issued: {ptuDate}</span>
			<br />
		</div>
	);
};

export const getFooter = (siteSettings: SiteSettings) =>
	ReactDOMServer.renderToStaticMarkup(<Footer siteSettings={siteSettings} />);

export const getPageStyle = (extraStyle = '') => {
	return `width: 100%; font-size: ${printerFontSize}pt; font-family: ${printerFontFamily}, monospace; line-height: 100%; position: relative; ${extraStyle}`;
};

export const getPageStyleObject = (
	extraStyle?: React.CSSProperties,
): React.CSSProperties => ({
	width: '100%',
	fontSize: `${printerFontSize}pt`,
	fontFamily: printerFontFamily,
	lineHeight: '100%',
	position: 'relative',
	...extraStyle,
});

export const appendHtmlElement = (data: string) => `
  <html lang="en">
  <head>
    <style>
      .container, .container > div, .container > table {
        width: 380px !important;
      }
    </style>
  </head>
  <body>
      ${data}
  </body>
</html>`;

export const print = async (
	printData: string,
	entity: string,
	onComplete?: () => void,
) => {
	if (!qz.websocket.isActive()) {
		message.error({
			content: 'Printer is not connected or QZTray is not open.',
		});

		return;
	}

	message.loading({
		content: `Printing ${entity.toLowerCase()}...`,
		key: PRINT_MESSAGE_KEY,
		duration: 5_000,
	});

	let printerStatus: any = null;

	// Add printer callback
	qz.printers.setPrinterCallbacks((event: any) => {
		console.log('event', event);
		printerStatus = event;
	});

	// Register listener and get status; deregister after
	await qz.printers.startListening(printerName);
	await qz.printers.getStatus();
	await qz.printers.stopListening();

	if (printerStatus === null) {
		message.error({
			key: PRINT_MESSAGE_KEY,
			content: 'Unable to detect selected printer.',
		});

		return;
	}

	// NOT_AVAILABLE: Printer is not available
	if (printerStatus.statusText === printerStatuses.NOT_AVAILABLE) {
		/*
      eventType: PRINTER
      message: NOT_AVAILABLE: Level: FATAL, From: EPSON TM-U220 Receipt, EventType: PRINTER, Code: 4096
    */
		message.error({
			key: PRINT_MESSAGE_KEY,
			content:
				'Printer is not available. Make sure printer is connected to the machine.',
		});

		return;
	}

	// OK: Ready to print
	if (
		[printerStatuses.OK, printerStatuses.PRINTING].includes(
			printerStatus.statusText,
		)
	) {
		console.log(printData);

		try {
			const config = qz.configs.create(printerName, {
				margins: {
					top: 0,
					right: PAPER_MARGIN_INCHES,
					bottom: 0,
					left: PAPER_MARGIN_INCHES,
				},
				density: 'draft',
			});

			await qz.print(config, [
				{
					type: 'pixel',
					format: 'html',
					flavor: 'plain',
					options: { pageWidth: PAPER_WIDTH_INCHES },
					data: printData,
				},
			]);

			message.success({
				content: `${entity} has been printed successfully.`,
				key: PRINT_MESSAGE_KEY,
			});
		} catch (e) {
			message.error({
				content: `Error occurred while trying to print ${entity}.`,
				key: PRINT_MESSAGE_KEY,
			});
			console.error(e);
		} finally {
			if (onComplete) {
				onComplete();
			}
		}

		return;
	}

	// OTHERS
	message.error({
		key: PRINT_MESSAGE_KEY,
		content: 'Printer cannot print right now. Please contact an administrator.',
	});
};

export const formatInPesoWithUnderline = (
	value: string | number,
) => `<div style="display:inline-block">
    ${formatInPeso(value, PESO_SIGN)}
  </div>`;

export const addUnderline = (value: string | number) =>
	Number(value) > 0
		? '<div style="width: 100%; text-align: right">-----------</div>'
		: '';

export const ItemBlock = ({ items }: ItemBlockProps) => (
	<table style={{ width: '100%' }}>
		{items.map((item) => (
			<tr>
				<td
					style={{ paddingLeft: item.isIndented ? 15 : 0, ...item.labelStyle }}
				>
					{item.label}
				</td>
				<td style={{ textAlign: 'right', ...item.contentStyle }}>
					{item.isParenthesized ? '(' : ' '}
					{item.isUnderlined ? (
						<>
							<div style={{ display: 'inline-block' }}>
								{formatInPeso(item.value as number, PESO_SIGN)}
							</div>
							{Number(item.value) > 0 && (
								<div style={{ width: '100%', textAlign: 'right' }}>
									-----------
								</div>
							)}
						</>
					) : (
						item.value
					)}
					{item.isParenthesized ? ')' : ' '}
				</td>
			</tr>
		))}
	</table>
);

export const Divider = () => (
	<div
		style={{
			width: '100%',
			marginLeft: 'auto',
			marginRight: 'auto',
			borderBottom: '1px dashed black',
		}}
	></div>
);

export const ReceiptReportSummary = ({ items }: ReceiptReportSummaryProps) => (
	<table style={{ marginLeft: 15 }}>
		{items.map((d) => (
			<tr key={d.value}>
				<td style={{ width: 120 }}>{d.label}:</td>
				<td style={{ textAlign: 'right' }}>{d.value}</td>
			</tr>
		))}
	</table>
);
