import axios from 'axios';
import { generateUUID } from '../utils/uid';
import { Version1 } from '../../types/version1';

export const inquiryEconomicCode = async (base: string, economicCode: string) => {
    const url = base.replace("__PURPOSE__", Version1.Purpose.GET_ECONOMIC_CODE_INFORMATION);
    const headers = {
        'requestTraceId': generateUUID(),
        'timestamp': Date.now().toString()
    };

    const data = {
        time: Date.now(),
        packet: {
            uid: generateUUID(),
            packetType: Version1.Purpose.GET_ECONOMIC_CODE_INFORMATION,
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
    return (await axios.post(url, data, { headers })).data.result.data as {
        nameTrade: string,
        taxpayerStatus: 'ACTIVE' | string,
        nationalId: string
    }
}
