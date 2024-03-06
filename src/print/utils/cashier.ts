import { message } from 'antd';
import qz from 'qz-tray';
import { printerStatuses } from '../../globals';
import { PRINT_MESSAGE_KEY } from '../helper-receipt';

export const openCashDrawer = async (printerName: string) => {
	if (!qz.websocket.isActive()) {
		message.error({
			content: 'Printer is not connected or QZTray is not open.',
		});

		return;
	}

	message.loading({
		content: 'Opening cash drawer...',
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

	if (printerStatus.statusText === printerStatuses.NOT_AVAILABLE) {
		message.error({
			key: PRINT_MESSAGE_KEY,
			content:
				'Printer is not available. Make sure printer is connected to the machine.',
		});

		return;
	}

	if (printerStatuses.OK === printerStatus.statusText) {
		try {
			const config = qz.configs.create(printerName);

			await qz.print(config, [
				'\x1B' + '\x40', // init
				'\x10' + '\x14' + '\x01' + '\x00' + '\x05',
			]);

			message.success({
				content: 'Cash drawer has been opened.',
				key: PRINT_MESSAGE_KEY,
			});
		} catch (e) {
			message.error({
				content: 'An error occurred while opening cash drawer.',
				key: PRINT_MESSAGE_KEY,
			});
			console.error(e);
		}

		return;
	}

	// OTHERS
	message.error({
		key: PRINT_MESSAGE_KEY,
		content:
			'Cash drawer cannot open right now. Please contact an administrator.',
	});
};
