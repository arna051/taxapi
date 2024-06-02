"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
const sleep = (time) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(true);
    }, time * 1e3);
});
exports.sleep = sleep;
//# sourceMappingURL=sleep.js.map