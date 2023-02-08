/**
 * @description 表头信息 对象或字符串
 */
export type Iheader =
  | string
  | {
      [prop: string]: any;
    };

/**
 * @description data转Cvs参数
 */
export type data2CvsOptions = {
  headers?: Iheader[];
  /**
   * 表头展示键
   * @default "label"
   */
  headDisplayKey?: string;
  /**
   * 表头取值键
   * @default "id"
   */
  headValueKey?: string;
  /**
   * 列分割符
   * @default ","
   */
  delimiter?: string;
  /**
   * 行分隔符
   * @default "\n"
   */
  rowDelimiter?: string;
};

/**
 * 数据对象
 */
export type IValue = {
  [prop: string]: any;
};

/**
 * 数据转csv字符串 原则上CVS不推荐自定义表头，不利于数据回滚
 * @param {IValue[]} values
 * @param {data2CvsOptions} option
 * @returns {string}
 */
export function data2CsvString(values: IValue[], { headers, headDisplayKey = "label", headValueKey = "id", delimiter = ",", rowDelimiter = "\n" }: data2CvsOptions = {}) {
  const getOptionValue = (option: Iheader, key: string) => {
    return typeof option === "string" ? option : option[key];
  };

  // 渲染头
  headers = headers ? headers : Object.keys(values[0]);
  let res = headers.map((item) => getOptionValue(item, headDisplayKey)).join(delimiter) + rowDelimiter;
  values.forEach((row) => {
    // 渲染单行
    let line: string[] = [];
    headers?.forEach((header) => {
      var lable = row[getOptionValue(header, headValueKey)];
      if (typeof lable === "string") {
        // 转译"
        lable.replace('"', '""');
      }
      line.push('"' + lable + '"');
    });
    res = res.concat(line.join(delimiter), rowDelimiter);
  });
  return res;
}

/**
 * 数据转csv Blob对象
 * @param values
 * @param param1
 * @returns {Blob}
 */
export function data2Csv(values: IValue[], { headers, headDisplayKey = "label", headValueKey = "id", delimiter = ",", rowDelimiter = "\n" }: data2CvsOptions) {
  let res = data2CsvString(values, { headers, headDisplayKey, headValueKey, delimiter, rowDelimiter });
  return new Blob([res], { type: "text/csv" });
}

/**
 * 不包含表头的数据转cvs 字符串
 * @param values
 */
export function data2CsvWithoutHeaderString(values: IValue[]) {
  let res = "";
  values.forEach((row) => {
    // 渲染单行
    let line: string[] = [];
    Object.keys(row).forEach((header) => {
      var lable = row[header];
      if (typeof lable === "string") {
        // 转译"
        lable = lable.replace('"', '""');
        lable = lable.replace("'", "''");
      }
      line.push('"' + lable + '"');
    });
    res = res.concat(line.join(","), "\n");
  });
  return res;
}

/**
 * 不包含表头的数据转cvs Blob对象
 * @param values
 */
export function data2CsvWithoutHeader(values: IValue[]) {
  let res = data2CsvWithoutHeaderString(values);
  return new Blob([res], { type: "text/csv" });
}

/**
 *
 * @param {string}str csv字符串
 * @param {string?}option.delimiter 列分隔符
 * @param {string?}option.rowDelimiter 列分隔符
 * @returns
 */
export function csvString2Data(str: string, { delimiter = ",", rowDelimiter = "\n" } = {}) {
  const headers = str.slice(0, str.indexOf(rowDelimiter)).split(delimiter);

  const rows = str.slice(str.indexOf(rowDelimiter) + 1).split(rowDelimiter);

  const arr = rows
    .filter((row) => row)
    .map(function (row) {
      const values = row.split(delimiter);
      const el = headers.reduce(function (object, header, index) {
        let value = values[index];
        if (/\"?\"/g.test(value)) {
          value = value.substring(1, value.length - 1);
        }
        object[header] = value;
        return object;
      }, {} as any);
      return el;
    });
  return arr;
}
