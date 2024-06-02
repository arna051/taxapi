import { readFileSync, existsSync } from "fs"
import * as crypto from 'crypto';

export class PemReader {
    private privateKey: string
    private keyObject?: crypto.KeyObject
    constructor(path_or_content: string) {
        if (path_or_content.includes("BEGIN PRIVATE KEY"))
            this.privateKey = path_or_content;
        else if (existsSync(path_or_content))
            this.privateKey = readFileSync(path_or_content, 'utf-8');
        else throw Error("Please provide the pem file.");


        if (!this.validatePem()) throw new Error("pem format is wrong.")
    }
    private validatePem() {
        try {
            // Check if the content is in PKCS#8 format
            if (!this.privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
                this.privateKey = `-----BEGIN PRIVATE KEY-----\n${this.privateKey}\n-----END PRIVATE KEY-----`
            }

            // Parse the private key
            const privateKey: crypto.KeyObject = crypto.createPrivateKey(this.privateKey);

            this.keyObject = privateKey

            return true;
        } catch (error) {
            return false;
        }
    }

    get(): string;
    get(format: 'string'): string;
    get(format: 'keyObject'): crypto.KeyObject;
    get(format?: 'string' | 'keyObject') {
        if (!format || format === "string") return this.privateKey;
        return this.keyObject;
    }

    private xor(b1: Buffer, b2: Buffer): Buffer {
        return b1.length < b2.length ? this.XorBlocks(b1, b2) : this.XorBlocks(b2, b1);
    }
    private XorBlocks(smallerArray: Buffer, biggerArray: Buffer): Buffer {
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

    getSignedText(
        text: string
    ): string {
        const data = Buffer.from(text, 'utf8');
        const sign = crypto.createSign('RSA-SHA256');

        sign.write(data);
        sign.end();

        const signatureBytes = sign.sign(this.privateKey, 'base64');
        return signatureBytes;
    }

    private aesEncrypt(payload: Buffer, key: Buffer, iv: Buffer): string {

        // XOR the payload with the key
        const xoredPayload = this.xor(payload, key);
        const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
        const cipherBytes: any[] = [];

        cipherBytes.push(cipher.update(xoredPayload));
        cipherBytes.push(cipher.final());
        const authTag = cipher.getAuthTag();

        // Concatenate the ciphertext and authentication tag
        const encryptedBuffer = Buffer.concat([...cipherBytes, authTag]);

        return encryptedBuffer.toString('base64');
    }

    private encryptInvoice(payload: Buffer) {
        const key = crypto.randomBytes(32); // 128 bits = 16 bytes
        const iv = crypto.randomBytes(12);  // 96 bits = 12 bytes for GCM


        const encryptedData = this.aesEncrypt(payload, key, iv);

        return {
            key, iv, encryptedData
        }
    }

    private encryptSymmetricKeyWithRsaOaepSha256(symmetricKey: string, publicKey: string): string {
        try {
            const publicKeyBuffer = Buffer.from(publicKey, 'base64');
            const rsaKey = crypto.createPublicKey({
                key: publicKeyBuffer,
                format: 'der',
                type: 'spki'
            });


            const encryptedBuffer = crypto.publicEncrypt(
                {
                    key: rsaKey,
                    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                    oaepHash: 'sha256',
                },
                Buffer.from(symmetricKey, 'utf-8')
            );

            return encryptedBuffer.toString('base64');
        } catch (error: any) {
            throw new Error(error)
        }
    }

    generateInvoiceRequest(
        invoice: Buffer,
        publicKey: string,
        encryptionKeyId: string
    ) {
        const { encryptedData, iv, key } = this.encryptInvoice(invoice);

        const encryptedKey = this.encryptSymmetricKeyWithRsaOaepSha256(key.toString("hex"), publicKey);

        return {
            encryptionKeyId,
            data: encryptedData,
            iv: iv.toString("hex"),
            symmetricKey: encryptedKey,
            key: key.toString("hex")
        }
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

            decipher.setAuthTag(authTag)
            // Perform XOR operation to get the original payload
            const decryptedBuffer = Buffer.concat([decipher.update(cipherText), decipher.final()]);

            // XOR the decrypted buffer with an empty buffer
            const originalPayload = this.rexor(decryptedBuffer, key);
            data = originalPayload.toString('utf-8');
            verified = true;
        } catch (err: any) {
            error = err.message;
        } finally {
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

