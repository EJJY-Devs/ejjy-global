export enum EscPosCommands {
	INITIALIZE = '', // Initialize printer'

	ALIGN_LEFT = '', // Left align
	ALIGN_CENTER = '', // Center align
	ALIGN_RIGHT = '', // Right align

	TEXT_SMALL = '', // Small text
	TEXT_NORMAL = '', // Normal text

	LINE_BREAK = '\n', // Line break

	CUT_PAPER = '\x1D\x56\x00',
}
