import axios, { AxiosRequestConfig } from 'axios';
import { Merge } from '../utils/merge';
import { generateUUID } from '../utils/uid';
import { PemReader } from '../utils/pem';
import { normalizeJson } from '../utils/json';
import { Version1 } from '../../types/version1';

export async function getToken(base: string, username: string, pem: PemReader): Promise<Version1.GetTokenResponse> {
    const url = base.replace("__PURPOSE__", Version1.Purpose.GET_TOKEN);

    const headers = {
        'requestTraceId': generateUUID(),
        'timestamp': Date.now().toString()
    };

    const data: Version1.GetTokenBody = {
        time: Date.now(),
        packet: {
            uid: generateUUID(),
            packetType: Version1.Purpose.GET_TOKEN,
            retry: false,
            data: {
                username,
            },
            encryptionKeyId: '',
            symmetricKey: '',
            iv: '',
            fiscalId: username,
            dataSignature: '',
        },
        // signature: '',
    };

    data.signature = await pem.getSignedText(
        normalizeJson(
            Merge(headers, data)
        )
    )


    const config: AxiosRequestConfig = {
        headers,
    };

    const response = await axios.post<Version1.GetTokenResponse>(url, data, config);
    return response.data;
}