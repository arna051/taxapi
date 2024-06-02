import axios from 'axios';
import { generateUUID } from '../utils/uid';
import { Version1 } from '../../types/version1';

export const getServerInformation = async (base: string): Promise<Version1.GetServerInformationResponse> => {
    try {
        const url = base.replace("__PURPOSE__", Version1.Purpose.GET_SERVER_INFORMATION);
        const headers = {
            'requestTraceId': generateUUID(),
            'timestamp': Date.now().toString(),
            'Content-Type': 'application/json'
        };

        const data: Version1.GetServerInformationBody = {
            time: 1,
            packet: {
                uid: null as any,
                packetType: Version1.Purpose.GET_SERVER_INFORMATION,
                retry: false,
                data: null as any,
                encryptionKeyId: '',
                symmetricKey: '',
                iv: '',
                fiscalId: '',
                dataSignature: '',
            },
        };
        const res = await axios.post<Version1.GetServerInformationResponse>(url, data, { headers })
        return res.data
    }
    catch (err) {
        throw err
    }
}