import axios, { AxiosRequestConfig } from 'axios';
import { Merge } from '../utils/merge';
import { generateUUID } from '../utils/uid';
import { PemReader } from '../utils/pem';
import { normalizeJson } from '../utils/json';
import { Version1 } from '../../types/version1';

export async function getFiscalId(base: string, username: string, token: string, pem: PemReader): Promise<Version1.GetFiscalIdResponse> {
    const url = base.replace("__PURPOSE__", Version1.Purpose.GET_FISCAL_INFORMATION);

    const headers = {
        'requestTraceId': generateUUID(),
        'timestamp': Date.now().toString(),
        'Authorization': `Bearer ${token}`
    };

    const data: Version1.GetFiscalIdBody = {
        time: Date.now(),
        packet: {
            uid: generateUUID(),
            packetType: Version1.Purpose.GET_FISCAL_INFORMATION,
            retry: false,
            data: username,
            encryptionKeyId: '',
            symmetricKey: '',
            iv: '',
            fiscalId: username,
            dataSignature: '',
        },
        signature: '',
    };

    data.signature = pem.getSignedText(
        normalizeJson(
            Merge(headers, data)
        )
    )

    const config: AxiosRequestConfig = {
        headers,
    };

    const response = await axios.post<Version1.GetFiscalIdResponse>(url, data, config);
    return response.data;
}

