/* eslint-disable @typescript-eslint/no-explicit-any */
import { message } from 'antd';
import qz from 'qz-tray';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ReceiptFooter, ReceiptHeader } from '../components';
import { BranchMachine, SiteSettings, Branch } from '../types';
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
	branch?: Branch,
) =>
	ReactDOMServer.renderToStaticMarkup(
		<ReceiptHeader
			branchMachine={branchMachine}
			title={title}
			branchHeader={branch}
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

	// Wait for the printer status to be retrieved
	await qz.printers.getStatus();
	// Stop listening after status check
	await qz.printers.stopListening();

	// Check if printerStatus was not set
	if (printerStatus === null) {
		message.error({
			key: PRINT_MESSAGE_KEY,
			content: 'Unable to detect the selected printer.',
		});
		return;
	}

	// Check if the printer is available
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
				: {}),
		});

		console.log('config', config);
		console.log(
			'Print data length:',
			Array.isArray(printData) ? printData.length : typeof printData,
		);

		if (type === printingTypes.NATIVE) {
			const commandString = (printData as string[]).join('');
			console.log('Total command string length:', commandString.length);

			// For large receipts, ensure all bytes are sent by using smaller chunks
			const maxChunkSize = 4096; // 4KB chunks - smaller for better reliability

			if (commandString.length > maxChunkSize) {
				console.log(
					'Large receipt detected, sending in chunks to ensure all bytes are transmitted',
				);
				console.log(`Total bytes to send: ${commandString.length}`);

				// Send content in chunks with status verification - no separate initialization
				let totalBytesSent = 0;
				for (let i = 0; i < commandString.length; i += maxChunkSize) {
					const chunk = commandString.substring(i, i + maxChunkSize);
					totalBytesSent += chunk.length;

					console.log(
						`Sending chunk ${Math.floor(i / maxChunkSize) + 1}: ${chunk.length} bytes (Total sent: ${totalBytesSent}/${commandString.length})`,
					);

					try {
						await qz.print(config, [
							{
								type: 'raw',
								format: 'command',
								flavor: 'plain',
								data: chunk,
								options: { language: 'ESCPOS', dotDensity: 'single' },
							},
						]);

						// Wait for the chunk to be processed before sending next
						if (i + maxChunkSize < commandString.length) {
							await new Promise((resolve) => setTimeout(resolve, 300)); // Increased delay for reliability
						}
					} catch (chunkError) {
						console.error(
							`Error sending chunk ${Math.floor(i / maxChunkSize) + 1}:`,
							chunkError,
						);
						// Continue trying to send remaining chunks
					}
				}

				console.log(`All ${totalBytesSent} bytes sent successfully`);
			} else {
				// For smaller receipts, send all at once with verification
				console.log(`Sending complete receipt: ${commandString.length} bytes`);

				try {
					await qz.print(config, [
						{
							type: 'raw',
							format: 'command',
							flavor: 'plain',
							data: commandString,
							options: { language: 'ESCPOS', dotDensity: 'single' },
						},
					]);
					console.log('Receipt sent successfully');
				} catch (printError) {
					console.error('Error sending receipt:', printError);
					// Try chunked approach as fallback
					console.log('Falling back to chunked sending...');
					const chunks = [];
					for (let i = 0; i < commandString.length; i += maxChunkSize) {
						chunks.push(commandString.substring(i, i + maxChunkSize));
					}

					for (let i = 0; i < chunks.length; i++) {
						await qz.print(config, [
							{
								type: 'raw',
								format: 'command',
								flavor: 'plain',
								data: chunks[i],
								options: { language: 'ESCPOS', dotDensity: 'single' },
							},
						]);

						if (i < chunks.length - 1) {
							await new Promise((resolve) => setTimeout(resolve, 300));
						}
					}
				}
			}
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
