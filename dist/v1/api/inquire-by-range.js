"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inquireByRange = void 0;
const axios_1 = __importDefault(require("axios"));
const merge_1 = require("../utils/merge");
const uid_1 = require("../utils/uid");
const json_1 = require("../utils/json");
const version1_1 = require("../../types/version1");
function inquireByRange(base, fiscalId, token, pem, startDate, endDate) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = base.replace("__PURPOSE__", version1_1.Version1.Purpose.INQUIRY_BY_TIME_RANGE);
        const headers = {
            'requestTraceId': (0, uid_1.generateUUID)(),
            'timestamp': Date.now().toString(),
            'Authorization': `Bearer ${token}`
        };
        const data = {
            packet: {
                uid: (0, uid_1.generateUUID)(),
                packetType: version1_1.Version1.Purpose.INQUIRY_BY_TIME_RANGE,
                retry: false,
                data: {
                    startDate: startDate,
                    endDate: endDate
                },
                encryptionKeyId: '',
                symmetricKey: '',
                iv: '',
                fiscalId,
                dataSignature: '',
            },
            // signature: '',
        };
        data.signature = yield pem.getSignedText((0, json_1.normalizeJson)((0, merge_1.Merge)(headers, data)));
        const config = {
            headers,
        };
        const response = yield axios_1.default.post(url, data, config);
        return response.data;
    });
}
exports.inquireByRange = inquireByRange;
//# sourceMappingURL=inquire-by-range.js.map