enum ALIGNMENTS {
	LEFT = 'left',
	CENTER = 'center',
	RIGHT = 'right',
}

interface Write {
	text?: string;
	alignment: 'left' | 'center' | 'right';
	rowNumber: number;
}

export class ReportTextFile {
	static ALIGNMENTS = ALIGNMENTS;

	MAX_SIZE = 0;

	MIDDLE_INDEX = 0;

	contents: string[][] = [];

	constructor() {
		this.MAX_SIZE = 71;
		this.MIDDLE_INDEX = parseInt(`${this.MAX_SIZE / 2}`);
		this.contents = Array(this.MAX_SIZE)
			.fill(' ')
			.map(() => Array(this.MAX_SIZE).fill(' '));
	}

	write({ text = '', alignment, rowNumber }: Write) {
		const elements = [...text];

		if (alignment === ReportTextFile.ALIGNMENTS.LEFT) {
			elements.forEach((c, index) => {
				this.contents[rowNumber][index] = c;
			});
		} else if (alignment === ReportTextFile.ALIGNMENTS.CENTER) {
			const startIndex = this.MIDDLE_INDEX - parseInt(`${elements.length / 2}`);
			elements.forEach((c, index) => {
				this.contents[rowNumber][startIndex + index] = c;
			});
		} else if (alignment === ReportTextFile.ALIGNMENTS.RIGHT) {
			const startIndex = this.MAX_SIZE - 1 - elements.length;
			elements.forEach((c, index) => {
				this.contents[rowNumber][startIndex + index] = c;
			});
		}
	}

	get() {
		return this.contents.map((row) => row.join('')).join('\n');
	}

	export(fileName: string) {
		const content = this.contents.map((row) => row.join('')).join('\n');

		const element = document.createElement('a');
		const file = new Blob([content], {
			type: 'text/plain',
		});
		element.href = URL.createObjectURL(file);
		element.download = fileName;
		document.body.appendChild(element); // Required for this to work in FireFox
		element.click();
	}
}
