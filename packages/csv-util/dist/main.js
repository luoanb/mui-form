export function data2CsvString(values, _a) {
    var headers = _a.headers, _b = _a.headDisplayKey, headDisplayKey = _b === void 0 ? "label" : _b, _c = _a.headValueKey, headValueKey = _c === void 0 ? "id" : _c;
    var getOptionValue = function (option, key) {
        return typeof option === "string" ? option : option[key];
    };
    var res = headers.map(function (item) { return getOptionValue(item, headDisplayKey); }).join(",") + "\n";
    values.forEach(function (row) {
        var line = [];
        headers.forEach(function (header) {
            var lable = row.getItemValue(getOptionValue(header, headValueKey));
            if (typeof lable === "string") {
                lable.replace('"', '""');
                line.push('"' + lable + '"');
            }
        });
        res = res.concat(line.join(","), "\n");
    });
    return res;
}
export function data2Csv(values, _a) {
    var headers = _a.headers, _b = _a.headDisplayKey, headDisplayKey = _b === void 0 ? "label" : _b, _c = _a.headValueKey, headValueKey = _c === void 0 ? "id" : _c;
    var res = data2CsvString(values, { headers: headers, headDisplayKey: headDisplayKey, headValueKey: headValueKey });
    return new Blob([res], { type: "text/csv" });
}
export function data2CsvWithoutHeaderString(values) {
    var res = "";
    values.forEach(function (row) {
        var line = [];
        Object.keys(row).forEach(function (header) {
            var lable = row[header];
            if (typeof lable === "string") {
                lable.replace('"', '""');
                line.push('"' + lable + '"');
            }
        });
        res = res.concat(line.join(","), "\n");
    });
    return res;
}
export function data2CsvWithoutHeader(values) {
    var res = data2CsvWithoutHeaderString(values);
    return new Blob([res], { type: "text/csv" });
}
//# sourceMappingURL=main.js.map