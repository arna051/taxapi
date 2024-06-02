import { Version1 } from "../../types/version1";

export const Merge = (headers: Version1.Header, body: Version1.Body) => {
    const { requestTraceId, timestamp, Authorization } = headers;
    const { packet, packets } = body;
    let merged: Version1.Header & Version1.Body = {
        requestTraceId,
        timestamp
    };
    if (packet) {
        merged = {
            ...merged,
            ...packet
        }
    } if (packets) {
        merged.packets = packets
    }
    if (Authorization && Authorization.length > 7) {
        merged.Authorization = Authorization.substring(7)
    }
    return merged;
}