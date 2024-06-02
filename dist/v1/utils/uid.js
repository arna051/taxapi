"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUUID = void 0;
const uuid_1 = require("uuid");
function generateUUID() {
    const uuid = (0, uuid_1.v4)();
    return uuid;
}
exports.generateUUID = generateUUID;
//# sourceMappingURL=uid.js.map