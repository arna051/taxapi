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
exports.getServerInformation = void 0;
const axios_1 = __importDefault(require("axios"));
const uid_1 = require("../utils/uid");
const version1_1 = require("../../types/version1");
const getServerInformation = (base) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = base.replace("__PURPOSE__", version1_1.Version1.Purpose.GET_SERVER_INFORMATION);
        const headers = {
            'requestTraceId': (0, uid_1.generateUUID)(),
            'timestamp': Date.now().toString(),
            'Content-Type': 'application/json'
        };
        const data = {
            time: 1,
            packet: {
                uid: null,
                packetType: version1_1.Version1.Purpose.GET_SERVER_INFORMATION,
                retry: false,
                data: null,
                encryptionKeyId: '',
                symmetricKey: '',
                iv: '',
                fiscalId: '',
                dataSignature: '',
            },
        };
        const res = yield axios_1.default.post(url, data, { headers });
        return res.data;
    }
    catch (err) {
        throw err;
    }
});
exports.getServerInformation = getServerInformation;
//# sourceMappingURL=get-server-information.js.map