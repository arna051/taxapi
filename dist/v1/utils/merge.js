"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Merge = void 0;
const Merge = (headers, body) => {
    const { requestTraceId, timestamp, Authorization } = headers;
    const { packet, packets } = body;
    let merged = {
        requestTraceId,
        timestamp
    };
    if (packet) {
        merged = Object.assign(Object.assign({}, merged), packet);
    }
    if (packets) {
        merged.packets = packets;
    }
    if (Authorization && Authorization.length > 7) {
        merged.Authorization = Authorization.substring(7);
    }
    return merged;
};
exports.Merge = Merge;
//# sourceMappingURL=merge.js.map