"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PemReader = void 0;
const fs_1 = require("fs");
const crypto = __importStar(require("crypto"));
class PemReader {
    constructor(path_or_content) {
        if (path_or_content.includes("BEGIN PRIVATE KEY"))
            this.privateKey = path_or_content;
        else if ((0, fs_1.existsSync)(path_or_content))
            this.privateKey = (0, fs_1.readFileSync)(path_or_content, 'utf-8');
        else
            throw Error("Please provide the pem file.");
        if (!this.validatePem())
            throw new Error("pem format is wrong.");
    }
    validatePem() {
        try {
            // Check if the content is in PKCS#8 format
            if (!this.privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
                this.privateKey = `-----BEGIN PRIVATE KEY-----\n${this.privateKey}\n-----END PRIVATE KEY-----`;
            }
            // Parse the private key
            const privateKey = crypto.createPrivateKey(this.privateKey);
            this.keyObject = privateKey;
            return true;
        }
        catch (error) {
            return false;
        }
    }
    get(format) {
        if (!format || format === "string")
            return this.privateKey;
        return this.keyObject;
    }
    xor(b1, b2) {
        return b1.length < b2.length ? this.XorBlocks(b1, b2) : this.XorBlocks(b2, b1);
    }
    XorBlocks(smallerArray, biggerArray) {
        const oneAndTwo = Buffer.alloc(biggerArray.length);
        const blockSize = Math.ceil(biggerArray.length / smallerArray.length);
        for (let i = 0; i < blockSize; i++) {
            for (let j = 0; j < smallerArray.length; j++) {
                if (i * smallerArray.length + j >= biggerArray.length) {
                    break;
                }
                oneAndTwo[i * smallerArray.length + j] = smallerArray[j] ^ biggerArray[i * smallerArray.length + j];
            }
        }
        return oneAndTwo;
    }
    getSignedText(text) {
        const data = Buffer.from(text, 'utf8');
        const sign = crypto.createSign('RSA-SHA256');
        sign.write(data);
        sign.end();
        const signatureBytes = sign.sign(this.privateKey, 'base64');
        return signatureBytes;
    }
    aesEncrypt(payload, key, iv) {
        // XOR the payload with the key
        const xoredPayload = this.xor(payload, key);
        const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
        const cipherBytes = [];
        cipherBytes.push(cipher.update(xoredPayload));
        cipherBytes.push(cipher.final());
        const authTag = cipher.getAuthTag();
        // Concatenate the ciphertext and authentication tag
        const encryptedBuffer = Buffer.concat([...cipherBytes, authTag]);
        return encryptedBuffer.toString('base64');
    }
    encryptInvoice(payload) {
        const key = crypto.randomBytes(32); // 128 bits = 16 bytes
        const iv = crypto.randomBytes(12); // 96 bits = 12 bytes for GCM
        const encryptedData = this.aesEncrypt(payload, key, iv);
        return {
            key, iv, encryptedData
        };
    }
    encryptSymmetricKeyWithRsaOaepSha256(symmetricKey, publicKey) {
        try {
            const publicKeyBuffer = Buffer.from(publicKey, 'base64');
            const rsaKey = crypto.createPublicKey({
                key: publicKeyBuffer,
                format: 'der',
                type: 'spki'
            });
            const encryptedBuffer = crypto.publicEncrypt({
                key: rsaKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: 'sha256',
            }, Buffer.from(symmetricKey, 'utf-8'));
            return encryptedBuffer.toString('base64');
        }
        catch (error) {
            throw new Error(error);
        }
    }
    generateInvoiceRequest(invoice, publicKey, encryptionKeyId) {
        const { encryptedData, iv, key } = this.encryptInvoice(invoice);
        const encryptedKey = this.encryptSymmetricKeyWithRsaOaepSha256(key.toString("hex"), publicKey);
        return {
            encryptionKeyId,
            data: encryptedData,
            iv: iv.toString("hex"),
            symmetricKey: encryptedKey,
            key: key.toString("hex")
        };
    }
    decode(encryptedString, keyHex, ivHex) {
        let data = '';
        let verified = false;
        let error = '';
        try {
            // Convert hex strings to buffers
            const key = Buffer.from(keyHex, 'hex');
            const iv = Buffer.from(ivHex, 'hex');
            // Decode Base64-encoded encrypted string to buffer
            const encryptedBuffer = Buffer.from(encryptedString, 'base64');
            const authTag = encryptedBuffer.subarray(-16);
            const cipherText = encryptedBuffer.subarray(0, -16);
            // Create decipher with the same key, iv, and algorithm
            const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
            decipher.setAuthTag(authTag);
            // Perform XOR operation to get the original payload
            const decryptedBuffer = Buffer.concat([decipher.update(cipherText), decipher.final()]);
            // XOR the decrypted buffer with an empty buffer
            const originalPayload = this.rexor(decryptedBuffer, key);
            data = originalPayload.toString('utf-8');
            verified = true;
        }
        catch (err) {
            error = err.message;
        }
        finally {
            return {
                verified,
                data,
                error,
            };
        }
    }
    rexor(buffer, key) {
        const result = Buffer.alloc(buffer.length);
        for (let i = 0; i < buffer.length; i++) {
            result[i] = buffer[i] ^ key[i % key.length];
        }
        return result;
    }
}
exports.PemReader = PemReader;
//# sourceMappingURL=pem.js.map