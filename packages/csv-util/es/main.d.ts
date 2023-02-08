export declare type Iheader = string | {
    [prop: string]: any;
};
export declare type data2CvsOptions = {
    headers?: Iheader[];
    headDisplayKey?: string;
    headValueKey?: string;
    delimiter?: string;
    rowDelimiter?: string;
};
export declare type IValue = {
    [prop: string]: any;
};
export declare function data2CsvString(values: IValue[], { headers, headDisplayKey, headValueKey, delimiter, rowDelimiter }?: data2CvsOptions): string;
export declare function data2Csv(values: IValue[], { headers, headDisplayKey, headValueKey, delimiter, rowDelimiter }: data2CvsOptions): Blob;
export declare function data2CsvWithoutHeaderString(values: IValue[]): string;
export declare function data2CsvWithoutHeader(values: IValue[]): Blob;
export declare function csvString2Data(str: string, { delimiter, rowDelimiter }?: {
    delimiter?: string | undefined;
    rowDelimiter?: string | undefined;
}): any[];
//# sourceMappingURL=main.d.ts.map