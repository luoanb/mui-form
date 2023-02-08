export function data2CsvString(values, _a) {
    var _b = _a === void 0 ? {} : _a, headers = _b.headers, _c = _b.headDisplayKey, headDisplayKey = _c === void 0 ? "label" : _c, _d = _b.headValueKey, headValueKey = _d === void 0 ? "id" : _d, _e = _b.delimiter, delimiter = _e === void 0 ? "," : _e, _f = _b.rowDelimiter, rowDelimiter = _f === void 0 ? "\n" : _f;
    var getOptionValue = function (option, key) {
        return typeof option === "string" ? option : option[key];
    };
    headers = headers ? headers : Object.keys(values[0]);
    var res = headers.map(function (item) { return getOptionValue(item, headDisplayKey); }).join(delimiter) + rowDelimiter;
    values.forEach(function (row) {
        var line = [];
        headers === null || headers === void 0 ? void 0 : headers.forEach(function (header) {
            var lable = row[getOptionValue(header, headValueKey)];
            if (typeof lable === "string") {
                lable.replace('"', '""');
            }
            line.push('"' + lable + '"');
        });
        res = res.concat(line.join(delimiter), rowDelimiter);
    });
    return res;
}
export function data2Csv(values, _a) {
    var headers = _a.headers, _b = _a.headDisplayKey, headDisplayKey = _b === void 0 ? "label" : _b, _c = _a.headValueKey, headValueKey = _c === void 0 ? "id" : _c, _d = _a.delimiter, delimiter = _d === void 0 ? "," : _d, _e = _a.rowDelimiter, rowDelimiter = _e === void 0 ? "\n" : _e;
    var res = data2CsvString(values, { headers: headers, headDisplayKey: headDisplayKey, headValueKey: headValueKey, delimiter: delimiter, rowDelimiter: rowDelimiter });
    return new Blob([res], { type: "text/csv" });
}
export function data2CsvWithoutHeaderString(values) {
    var res = "";
    values.forEach(function (row) {
        var line = [];
        Object.keys(row).forEach(function (header) {
            var lable = row[header];
            if (typeof lable === "string") {
                lable = lable.replace('"', '""');
                lable = lable.replace("'", "''");
            }
            line.push('"' + lable + '"');
        });
        res = res.concat(line.join(","), "\n");
    });
    return res;
}
export function data2CsvWithoutHeader(values) {
    var res = data2CsvWithoutHeaderString(values);
    return new Blob([res], { type: "text/csv" });
}
export function csvString2Data(str, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.delimiter, delimiter = _c === void 0 ? "," : _c, _d = _b.rowDelimiter, rowDelimiter = _d === void 0 ? "\n" : _d;
    var headers = str.slice(0, str.indexOf(rowDelimiter)).split(delimiter);
    var rows = str.slice(str.indexOf(rowDelimiter) + 1).split(rowDelimiter);
    var arr = rows
        .filter(function (row) { return row; })
        .map(function (row) {
        var values = row.split(delimiter);
        var el = headers.reduce(function (object, header, index) {
            var value = values[index];
            if (/\"?\"/g.test(value)) {
                value = value.substring(1, value.length - 1);
            }
            object[header] = value;
            return object;
        }, {});
        return el;
    });
    return arr;
}
//# sourceMappingURL=main.js.map