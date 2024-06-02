import axios, { AxiosRequestConfig } from "axios";
import { Invoice } from "../../types/invoice";
import { Version1 } from "../../types/version1";
import { normalizeJson } from "../utils/json";
import { Merge } from "../utils/merge";
import { PemReader } from "../utils/pem";
import { generateUUID } from "../utils/uid";

export const SendInvoice = async (
    type: Version1.APIType,
    invoices: {
        [uid: string]: Invoice
    },
    token: string,
    publicKey: Version1.PublicKey,
    username: string,
    pem: PemReader,
    retry: string[],
): Promise<Version1.SendInvoiceResponse> => {

    const url = `https://tp.tax.gov.ir/req/api/${type}/async/normal-enqueue`;
    const headers = {
        'requestTraceId': generateUUID(),
        'timestamp': Date.now().toString(),
        'Authorization': `Bearer ${token}`
    };

    const packets = Object.keys(invoices).map(uid => {
        const packet: Version1.PacketModel<Version1.SendInvoiceData> = {
            uid,
            packetType: "INVOICE.V01",
            retry: retry.some(item => item === uid),
            data: invoices[uid],
            encryptionKeyId: null as any,
            symmetricKey: null as any,
            iv: null as any,
            fiscalId: username,
            dataSignature: null as any,

        }

        packet.dataSignature = pem.getSignedText(
            normalizeJson(
                invoices[uid]
            )
        )

        const encrypted = pem.generateInvoiceRequest(Buffer.from(JSON.stringify(packet.data), 'utf-8'), publicKey.key, publicKey.id)

        packet.data = encrypted.data;
        packet.encryptionKeyId = encrypted.encryptionKeyId;
        packet.symmetricKey = encrypted.symmetricKey;
        packet.iv = encrypted.iv;

        const decoded = pem.decode(packet.data, encrypted.key, encrypted.iv);

        if (!decoded.verified) {
            throw new Error(decoded.error)
        }

        return packet;
    })

    const data = {
        packets,
        signature: null as any,
    };

    data.signature = pem.getSignedText(
        normalizeJson(
            Merge(headers, data)
        )
    );
    try {

        const config: AxiosRequestConfig = {
            headers,
        };

        const response = await axios.post<Version1.SendInvoiceResponse>(url, data, config);
        return response.data;

    }
    catch (err) {
        throw err
    }
}