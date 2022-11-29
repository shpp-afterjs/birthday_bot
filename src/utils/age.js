"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getCurrentAge(date) {
    var d = date.split('.');
    if (typeof d[2] !== "undefined") {
        date = d[2] + '.' + d[1] + '.' + d[0];
        return ((new Date().getTime() - +new Date(date)) / (24 * 3600 * 365.25 * 1000)) | 0;
    }
    return 0;
}
exports.default = getCurrentAge;
//# sourceMappingURL=age.js.map