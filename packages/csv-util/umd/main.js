(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.CSVString2Data = exports.data2CsvWithoutHeader = exports.data2CsvWithoutHeaderString = exports.data2Csv = exports.data2CsvString = void 0;
    function data2CsvString(values, _a) {
        var headers = _a.headers, _b = _a.headDisplayKey, headDisplayKey = _b === void 0 ? "label" : _b, _c = _a.headValueKey, headValueKey = _c === void 0 ? "id" : _c;
        var getOptionValue = function (option, key) {
            return typeof option === "string" ? option : option[key];
        };
        headers = headers ? headers : Object.keys(values[0]);
        var res = headers.map(function (item) { return getOptionValue(item, headDisplayKey); }).join(",") + "\n";
        values.forEach(function (row) {
            var line = [];
            headers === null || headers === void 0 ? void 0 : headers.forEach(function (header) {
                var lable = row[getOptionValue(header, headValueKey)];
                if (typeof lable === "string") {
                    lable.replace('"', '""');
                    line.push('"' + lable + '"');
                }
            });
            res = res.concat(line.join(","), "\n");
        });
        return res;
    }
    exports.data2CsvString = data2CsvString;
    function data2Csv(values, _a) {
        var headers = _a.headers, _b = _a.headDisplayKey, headDisplayKey = _b === void 0 ? "label" : _b, _c = _a.headValueKey, headValueKey = _c === void 0 ? "id" : _c;
        var res = data2CsvString(values, { headers: headers, headDisplayKey: headDisplayKey, headValueKey: headValueKey });
        return new Blob([res], { type: "text/csv" });
    }
    exports.data2Csv = data2Csv;
    function data2CsvWithoutHeaderString(values) {
        var res = "";
        values.forEach(function (row) {
            var line = [];
            Object.keys(row).forEach(function (header) {
                var lable = row[header];
                if (typeof lable === "string") {
                    lable = lable.replace('"', '""');
                    lable = lable.replace("'", "''");
                    line.push('"' + lable + '"');
                }
            });
            res = res.concat(line.join(","), "\n");
        });
        return res;
    }
    exports.data2CsvWithoutHeaderString = data2CsvWithoutHeaderString;
    function data2CsvWithoutHeader(values) {
        var res = data2CsvWithoutHeaderString(values);
        return new Blob([res], { type: "text/csv" });
    }
    exports.data2CsvWithoutHeader = data2CsvWithoutHeader;
    function CSVString2Data(text) {
        var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
        var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
        if (!re_valid.test(text))
            return null;
        var a = [];
        text.replace(re_value, function (m0, m1, m2, m3) {
            if (m1 !== undefined)
                a.push(m1.replace(/\\'/g, "'"));
            else if (m2 !== undefined)
                a.push(m2.replace(/\\"/g, '"'));
            else if (m3 !== undefined)
                a.push(m3);
            return "";
        });
        if (/,\s*$/.test(text))
            a.push("");
        return a;
    }
    exports.CSVString2Data = CSVString2Data;
});
//# sourceMappingURL=main.js.map