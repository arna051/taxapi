import axios, { AxiosRequestConfig } from 'axios';
import { Merge } from '../utils/merge';
import { generateUUID } from '../utils/uid';
import { PemReader } from '../utils/pem';
import { normalizeJson } from '../utils/json';
import { Version1 } from '../../types/version1';

export async function inquireByRange(base: string, fiscalId: string, token: string, pem: PemReader, startDate: number, endDate: number): Promise<Version1.InquireResponse> {
    const url = base.replace("__PURPOSE__", Version1.Purpose.INQUIRY_BY_TIME_RANGE);

    const headers = {
        'requestTraceId': generateUUID(),
        'timestamp': Date.now().toString(),
        'Authorization': `Bearer ${token}`
    };

    const data: Version1.InquireByRangeBody = {
        packet: {
            uid: generateUUID(),
            packetType: Version1.Purpose.INQUIRY_BY_TIME_RANGE,
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

    data.signature = await pem.getSignedText(
        normalizeJson(
            Merge(headers, data)
        )
    )


    const config: AxiosRequestConfig = {
        headers,
    };

    const response = await axios.post<Version1.InquireResponse>(url, data, config);
    return response.data;
}

