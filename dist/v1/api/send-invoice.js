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
exports.SendInvoice = void 0;
const axios_1 = __importDefault(require("axios"));
const json_1 = require("../utils/json");
const merge_1 = require("../utils/merge");
const uid_1 = require("../utils/uid");
const SendInvoice = (type, invoices, token, publicKey, username, pem, retry) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://tp.tax.gov.ir/req/api/${type}/async/normal-enqueue`;
    const headers = {
        'requestTraceId': (0, uid_1.generateUUID)(),
        'timestamp': Date.now().toString(),
        'Authorization': `Bearer ${token}`
    };
    const packets = Object.keys(invoices).map(uid => {
        const packet = {
            uid,
            packetType: "INVOICE.V01",
            retry: retry.some(item => item === uid),
            data: invoices[uid],
            encryptionKeyId: null,
            symmetricKey: null,
            iv: null,
            fiscalId: username,
            dataSignature: null,
        };
        packet.dataSignature = pem.getSignedText((0, json_1.normalizeJson)(invoices[uid]));
        const encrypted = pem.generateInvoiceRequest(Buffer.from(JSON.stringify(packet.data), 'utf-8'), publicKey.key, publicKey.id);
        packet.data = encrypted.data;
        packet.encryptionKeyId = encrypted.encryptionKeyId;
        packet.symmetricKey = encrypted.symmetricKey;
        packet.iv = encrypted.iv;
        const decoded = pem.decode(packet.data, encrypted.key, encrypted.iv);
        if (!decoded.verified) {
            throw new Error(decoded.error);
        }
        return packet;
    });
    const data = {
        packets,
        signature: null,
    };
    data.signature = pem.getSignedText((0, json_1.normalizeJson)((0, merge_1.Merge)(headers, data)));
    try {
        const config = {
            headers,
        };
        const response = yield axios_1.default.post(url, data, config);
        return response.data;
    }
    catch (err) {
        throw err;
    }
});
exports.SendInvoice = SendInvoice;
//# sourceMappingURL=send-invoice.js.map