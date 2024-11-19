import { message } from 'antd';
import qz from 'qz-tray';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ReceiptFooter, ReceiptHeader } from '../components';
import { printerStatuses } from '../globals';
import { BranchMachine, SiteSettings } from '../types';
import { authenticateQZTray, formatInPeso } from '../utils';

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

export const getHeader = (
	siteSettings: SiteSettings,
	branchMachine?: BranchMachine,
	title?: string,
) =>
	ReactDOMServer.renderToStaticMarkup(
		<ReceiptHeader
			siteSettings={siteSettings}
			branchMachine={branchMachine}
			title={title}
		/>,
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

	qz.printers.setPrinterCallbacks((event: any) => {
		console.log('event', event);
		printerStatus = event;
	});

	try {
		await qz.printers.startListening(printerName);

		// Wait for the printer status to be updated through the callback
		const waitForStatus = new Promise<void>((resolve, reject) => {
			const timeout = setTimeout(
				() => reject(new Error('Timeout waiting for printer status update')),
				5000,
			); // 5-second timeout
			const interval = setInterval(() => {
				if (printerStatus) {
					clearInterval(interval);
					clearTimeout(timeout);
					resolve();
				}
			}, 100);
		});

		await waitForStatus;

		console.log('PrinterStatus:', printerStatus);

		if (printerStatus === null) {
			message.error({
				key: PRINT_MESSAGE_KEY,
				content: 'Unable to detect selected printer.',
			});
			return;
		}

		if (printerStatus.statusText === printerStatuses.NOT_AVAILABLE) {
			message.error({
				key: PRINT_MESSAGE_KEY,
				content:
					'Printer is not available. Make sure the printer is connected to the machine.',
			});
			return;
		}

		if (
			[printerStatuses.OK, printerStatuses.PRINTING].includes(
				printerStatus.statusText,
			)
		) {
			console.log(printData);
			console.log(printerName);

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

		message.error({
			key: PRINT_MESSAGE_KEY,
			content:
				'Printer cannot print right now. Please contact an administrator.',
		});
	} catch (error) {
		console.error('Error occurred:', error);
		message.error({
			key: PRINT_MESSAGE_KEY,
			content: 'An error occurred while checking printer status or printing.',
		});
	} finally {
		// Stop listening once you're done (clean up)
		await qz.printers.stopListening();
	}
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
