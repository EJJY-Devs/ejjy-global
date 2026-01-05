/* eslint-disable @typescript-eslint/no-explicit-any */
import { message } from 'antd';
import qz from 'qz-tray';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ReceiptFooter, ReceiptHeader } from '../components';
import { BranchMachine, SiteSettings } from '../types';
import { authenticateQZTray, formatInPeso } from '../utils';
import { printingTypes } from '../globals';

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
				console.error('QZ Tray Error', err);
			});
	}
};

export const getHeader = (
	siteSettings: SiteSettings,
	branchMachine?: BranchMachine,
	title?: string,
) =>
	ReactDOMServer.renderToStaticMarkup(
		<ReceiptHeader branchMachine={branchMachine} title={title} />,
	);

export const getFooter = (siteSettings: SiteSettings) =>
	ReactDOMServer.renderToStaticMarkup(
		<ReceiptFooter siteSettings={siteSettings} />,
	);

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
	printData: string | string[],
	entity: string,
	onComplete?: () => void,
	type?: any,
) => {
	message.loading({
		content: `Printing ${entity.toLowerCase()}...`,
		key: PRINT_MESSAGE_KEY,
		duration: 5_000,
	});

	let printerStatus: any = null;

	// Add printer callback to capture events
	qz.printers.setPrinterCallbacks((event: any) => {
		console.log('event', event);
		printerStatus = event; // Set printer status based on event
	});

	// Register listener and get status; deregister after
	await qz.printers.startListening(printerName);

	// Wait briefly for the printer status callback to fire
	// Note: Removed qz.printers.getStatus() as it requires internet connectivity
	// The printer status callbacks will still capture events
	await new Promise((resolve) => setTimeout(resolve, 300));
	
	// Stop listening after status check
	await qz.printers.stopListening();

	// Check printer status only if it was retrieved (requires internet)
	// If offline, printerStatus will be null and we'll proceed with printing
	if (printerStatus !== null) {
		if (printerStatus.statusText === 'NOT_AVAILABLE') {
			message.error({
				key: PRINT_MESSAGE_KEY,
				content:
					'Printer is not available. Make sure the printer is connected to the machine.',
			});
			return;
		}

		if (printerStatus.statusText === 'OFFLINE') {
			message.error({
				key: PRINT_MESSAGE_KEY,
				content: 'Printer is offline.',
			});
			return;
		}
	}

	try {
		console.log('Printing receipt.');
		const config = qz.configs.create(printerName, {
			...(type !== printingTypes.NATIVE
				? {
						margins: {
							top: 0,
							right: PAPER_MARGIN_INCHES,
							bottom: 0,
							left: PAPER_MARGIN_INCHES,
						},
						scaleContent: true,
						scaling: 'shrinkToFit',
					}
				: {
						forceRaw: true,
						bounds: true,
						rasterize: true,
						scaleContent: true,
						size: true,
						spool: true,
					}),
		});

		console.log('config', config);

		if (type === printingTypes.NATIVE) {
			await qz.print(config, [
				{
					type: 'raw',
					format: 'command',
					flavor: 'plain',
					data: (printData as string[]).join(''),
					options: { language: 'ESCPOS', dotDensity: 'single' },
				},
			]);
		} else {
			await qz.print(config, [
				{
					type: 'pixel',
					format: 'html',
					flavor: 'plain',
					options: { pageWidth: PAPER_WIDTH_INCHES },
					data: printData,
				},
			]);
		}

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
};

// OTHERS
message.error({
	key: PRINT_MESSAGE_KEY,
	content: 'Printer cannot print right now. Please contact an administrator.',
});

export const formatInPesoWithUnderline = (
	value: string | number,
) => `<div style="display:inline-block">
    ${formatInPeso(value, PESO_SIGN)}
  </div>`;

export const addUnderline = (value: string | number) =>
	Number(value) > 0
		? '<div style="width: 100%; text-align: right">-----------</div>'
		: '';
