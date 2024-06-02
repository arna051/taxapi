/// <reference types="node" />
/// <reference types="node" />
import * as crypto from 'crypto';
export declare class PemReader {
    private privateKey;
    private keyObject?;
    constructor(path_or_content: string);
    private validatePem;
    get(): string;
    get(format: 'string'): string;
    get(format: 'keyObject'): crypto.KeyObject;
    private xor;
    private XorBlocks;
    getSignedText(text: string): string;
    private aesEncrypt;
    private encryptInvoice;
    private encryptSymmetricKeyWithRsaOaepSha256;
    generateInvoiceRequest(invoice: Buffer, publicKey: string, encryptionKeyId: string): {
        encryptionKeyId: string;
        data: string;
        iv: string;
        symmetricKey: string;
        key: string;
    };
    decode(encryptedString: string, keyHex: string, ivHex: string): {
        verified: boolean;
        data: string;
        error: string;
    };
    rexor(buffer: Buffer, key: any): Buffer;
}
//# sourceMappingURL=pem.d.ts.map