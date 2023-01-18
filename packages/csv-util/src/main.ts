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
export function data2CsvString(values: IValue[], { headers, headDisplayKey = "label", headValueKey = "id" }: data2CvsOptions = {}) {
  const getOptionValue = (option: Iheader, key: string) => {
    return typeof option === "string" ? option : option[key];
  };

  // 渲染头
  headers = headers ? headers : Object.keys(values[0]);
  let res = headers.map((item) => getOptionValue(item, headDisplayKey)).join(",") + "\n";
  values.forEach((row) => {
    // 渲染单行
    let line: string[] = [];
    headers?.forEach((header) => {
      var lable = row[getOptionValue(header, headValueKey)];
      if (typeof lable === "string") {
        // 转译"
        lable.replace('"', '""');
        line.push('"' + lable + '"');
      }
    });
    res = res.concat(line.join(","), "\n");
  });
  return res;
}

/**
 * 数据转csv Blob对象
 * @param values
 * @param param1
 * @returns {Blob}
 */
export function data2Csv(values: IValue[], { headers, headDisplayKey = "label", headValueKey = "id" }: data2CvsOptions) {
  let res = data2CsvString(values, { headers, headDisplayKey, headValueKey });
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
        line.push('"' + lable + '"');
      }
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
 * Return array of string values, or NULL if CSV string not well formed.
 * @param {string} text
 * @returns {any[]}
 */
export function csvString2Data(text: string) {
  var re_valid =
    /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
  var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
  // Return NULL if input string is not well formed CSV string.
  if (!re_valid.test(text)) return null;
  var a: any[] = []; // Initialize array to receive values.
  text.replace(
    re_value, // "Walk" the string using replace with callback.
    function (m0, m1, m2, m3) {
      // Remove backslash from \' in single quoted values.
      if (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
      // Remove backslash from \" in double quoted values.
      else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
      else if (m3 !== undefined) a.push(m3);
      return ""; // Return empty string.
    }
  );
  // Handle special case of empty last value.
  if (/,\s*$/.test(text)) a.push("");
  return a;
}
