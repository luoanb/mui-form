# Web CVS Util 
* 支持JS数组转CVS数据
* 支持CVS数据转JS数组
* 支持Typescript提示
## 使用教程
### 前端场景
1. 基础使用：数据格式转换
    ``` typescript
    import { data2CsvString, csvString2Data } from "web-csv-util";
    let data = [
        { name: "小明", age: 18, sex: "男", bool: true },
        { name: "小明", age: 18, sex: "男", bool: true },
        { name: "小明", age: 18, sex: "男", bool: true }
        ];

    // 数组转csv数据
    let csvdata = data2CsvString(data)
    // 数据内容
    // name,age,sex,bool
    // "小明","18","男","true"
    // "小明","18","男","true"
    // "小明","18","男","true"

    // csv数据转数组
    let newData = csvString2Data(csvdata);
    // 数据内容
    // [
    //     { name: '小明', age: '18', sex: '男', bool: 'true' },
    //     { name: '小明', age: '18', sex: '男', bool: 'true' },
    //     { name: '小明', age: '18', sex: '男', bool: 'true' }
    // ]
    ```
1. 基础使用：可选参数更细腻控制
    ``` typescript
    import { data2CsvString, csvString2Data } from "web-csv-util";
    let data = [
      { name: "小明", age: 18, sex: "男", bool: true },
      { name: "小明", age: 18, sex: "男", bool: true },
      { name: "小明", age: 18, sex: "男", bool: true },
    ];
    // 数组转csv数据
    let csvdata = data2CsvString(data, { delimiter: "|" });
    // 数据内容
    // "小明"|"18"|"男"|"true"
    // "小明"|"18"|"男"|"true"
    // "小明"|"18"|"男"|"true"

    // csv数据转数组
    let newData = csvString2Data(csvdata, { delimiter: "|" });
    // 数据内容
    // [
    //     { name: '小明', age: '18', sex: '男', bool: 'true' },
    //     { name: '小明', age: '18', sex: '男', bool: 'true' },
    //     { name: '小明', age: '18', sex: '男', bool: 'true' }
    // ]
    ```
    ## API
    ``` typescript
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

    ```