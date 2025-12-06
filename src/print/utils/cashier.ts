import { message } from 'antd';
import qz from 'qz-tray';
import { PRINT_MESSAGE_KEY } from '../helper-receipt';

export const openCashDrawer = async (printerName: string) => {
	if (!qz.websocket.isActive()) {
		message.error({
			content: 'Printer is not connected or QZTray is not open.',
		});
		return;
	}

	try {
		console.log('Opening Cash Drawer.');
		const config = qz.configs.create(printerName);

		await qz.print(config, [
			'\x1B' + '\x40', // init
			'\x10' + '\x14' + '\x01' + '\x00' + '\x05',
		]);

		message.success({
			content: 'Cash drawer opened.',
			key: PRINT_MESSAGE_KEY,
			duration: 2000,
		});
	} catch (e) {
		console.error('Failed to open cash drawer:', e);
		message.error({
			content: 'Failed to open cash drawer.',
			key: PRINT_MESSAGE_KEY,
		});
	}
};
