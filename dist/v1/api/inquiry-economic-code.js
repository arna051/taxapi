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
exports.inquiryEconomicCode = void 0;
const axios_1 = __importDefault(require("axios"));
const uid_1 = require("../utils/uid");
const version1_1 = require("../../types/version1");
const inquiryEconomicCode = (base, economicCode) => __awaiter(void 0, void 0, void 0, function* () {
    const url = base.replace("__PURPOSE__", version1_1.Version1.Purpose.GET_ECONOMIC_CODE_INFORMATION);
    const headers = {
        'requestTraceId': (0, uid_1.generateUUID)(),
        'timestamp': Date.now().toString()
    };
    const data = {
        time: Date.now(),
        packet: {
            uid: (0, uid_1.generateUUID)(),
            packetType: version1_1.Version1.Purpose.GET_ECONOMIC_CODE_INFORMATION,
            retry: false,
            data: {
                economicCode
            },
            encryptionKeyId: '',
            symmetricKey: '',
            iv: '',
            fiscalId: '',
            dataSignature: '',
        },
    };
    return (yield axios_1.default.post(url, data, { headers })).data.result.data;
});
exports.inquiryEconomicCode = inquiryEconomicCode;
//# sourceMappingURL=inquiry-economic-code.js.map