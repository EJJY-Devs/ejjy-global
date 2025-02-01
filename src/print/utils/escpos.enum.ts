export enum EscPosCommands {
	INITIALIZE = '\x1B\x40', // Initialize printer

	ALIGN_LEFT = '\x1B' + '\x61' + '\x30', // Left align
	ALIGN_CENTER = '\x1B' + '\x61' + '\x31', // Center align
	ALIGN_RIGHT = '\x1B' + '\x61' + '\x32', // Right align

	TEXT_SMALL = '\x1B\x4D\x31', // Small text
	TEXT_NORMAL = '\x1B\x4D\x30', // Normal text

	LINE_BREAK = '\n', // Line break

	BOLD_ON = '\x1B\x45\x01', // Bold ON
	BOLD_OFF = '\x1B\x45\x00', // Bold OFF

	UNDERLINE_ON = '\x1B\x2D\x01', // Single underline
	UNDERLINE_OFF = '\x1B\x2D\x00', // Underline OFF

	TEXT_DOUBLE = '\x1D\x21\x11', // Double width and height text
	TEXT_NORMAL_SIZE = '\x1D\x21\x00', // Normal size text

	FEED_LINES = '\x1B\x64\x05', // Feed paper 5 lines
	LINE_SPACING = '\x1B\x33\x10', // Set line spacing to 16 dots

	CUT_FULL = '\x1D\x56\x00', // Full cut (only for printers with a cutter)
	CUT_PARTIAL = '\x1D\x56\x01', // Partial cut (only for printers with a cutter)
}
