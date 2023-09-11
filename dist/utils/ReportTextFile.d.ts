declare enum ALIGNMENTS {
    LEFT = "left",
    CENTER = "center",
    RIGHT = "right"
}
interface Write {
    text?: string;
    alignment: 'left' | 'center' | 'right';
    rowNumber: number;
}
export declare class ReportTextFile {
    static ALIGNMENTS: typeof ALIGNMENTS;
    MAX_SIZE: number;
    MIDDLE_INDEX: number;
    contents: string[][];
    constructor();
    write({ text, alignment, rowNumber }: Write): void;
    get(): string;
    export(fileName: string): void;
}
export {};
