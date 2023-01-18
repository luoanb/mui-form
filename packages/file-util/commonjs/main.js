"use strict";
exports.__esModule = true;
exports.downLoadByURL = void 0;
var downLoadByURL = function (href, filename) {
    var link = document.createElement("a");
    var body = document.querySelector("body");
    link.href = href;
    link.download = filename;
    link.style.display = "none";
    body === null || body === void 0 ? void 0 : body.appendChild(link);
    link.click();
    body === null || body === void 0 ? void 0 : body.removeChild(link);
};
exports.downLoadByURL = downLoadByURL;
//# sourceMappingURL=main.js.map