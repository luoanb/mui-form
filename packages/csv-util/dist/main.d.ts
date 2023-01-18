export declare type Iheader = string | {
    [prop: string]: any;
};
export declare type data2CvsOptions = {
    headers: Iheader[];
    headDisplayKey?: string;
    headValueKey?: string;
};
export declare type IValue = {
    [prop: string]: any;
};
export declare function data2CsvString(values: IValue[], { headers, headDisplayKey, headValueKey }: data2CvsOptions): string;
export declare function data2Csv(values: IValue[], { headers, headDisplayKey, headValueKey }: data2CvsOptions): Blob;
export declare function data2CsvWithoutHeaderString(values: IValue[]): string;
export declare function data2CsvWithoutHeader(values: IValue[]): Blob;
//# sourceMappingURL=main.d.ts.map