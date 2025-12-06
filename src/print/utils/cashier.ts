import { message } from 'antd';
import qz from 'qz-tray';
import { PRINT_MESSAGE_KEY } from '../helper-receipt';

export const openCashDrawer = async (printerName: string) => {
	if (!qz.websocket.isActive()) {
		message.error({
			content: 'Printer is not connected or QZTray is not open.',
		});
		throw new Error('QZ websocket not active');
	}

	const config = qz.configs.create(printerName);

	// Common ESC/POS drawer pulse: ESC p m t1 t2
	const escpPulse = '\x1B\x70\x00\x19\xFA'; // m=0 (first connector), t1/t2 pulse widths
	// Your original DLE DC4 sequence (some models support this)
	const dlePulse = '\x10\x14\x01\x00\x05';

	try {
		console.log('Opening cash drawer (ESC p)...');
		await qz.print(config, [escpPulse]);

		message.success({
			content: 'Cash drawer opened.',
			key: PRINT_MESSAGE_KEY,
			duration: 3,
		});
		return;
	} catch (escErr) {
		console.warn('ESC p pulse failed, trying DLE DC4 fallback:', escErr);
		try {
			console.log('Opening cash drawer (DLE DC4)...');
			await qz.print(config, [dlePulse]);

			message.success({
				content: 'Cash drawer opened (fallback).',
				key: PRINT_MESSAGE_KEY,
				duration: 3,
			});
			return;
		} catch (dleErr) {
			console.error('Cash drawer open failed on both pulses:', dleErr);
			message.error({
				content: 'Failed to open cash drawer.',
				key: PRINT_MESSAGE_KEY,
			});
			throw dleErr;
		}
	}
};
