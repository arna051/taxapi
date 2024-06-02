import { Invoice } from "./invoice";
export declare namespace Version1 {
    type TaxApiInvoice = Invoice;
    interface Dictionary<T> {
        [key: string]: T;
    }
    type InvoiceType = 1 | 2 | 3;
    type PaymentType = 1 | 2 | 3;
    type InvoicePattern = 1 | 2 | 3 | 4 | 5 | 6 | 7;
    type InvoiceTopic = 1 | 2 | 3 | 4;
    type CustomerType = 1 | 2 | 3 | 4 | 5;
    type FlightType = 1 | 2;
    type TaxPaymentByCustomer = 1 | 2;
    type anyObject = {
        [key: string]: any;
    };
    type Header = {
        requestTraceId: string;
        timestamp: string;
        Authorization?: string;
    };
    type Body = {
        packet?: anyObject;
    } & anyObject;
    enum Purpose {
        SEND_INVOICE_FAST = "fast-enqueue",
        SEND_INVOICE_NORMAL = "normal-enqueue",
        GET_TOKEN = "GET_TOKEN",
        GET_FISCAL_INFORMATION = "GET_FISCAL_INFORMATION",
        INQUIRY_BY_UID = "INQUIRY_BY_UID",
        INQUIRY_BY_REFERENCE_NUMBER = "INQUIRY_BY_REFERENCE_NUMBER",
        INQUIRY_BY_TIME = "INQUIRY_BY_TIME",
        INQUIRY_BY_TIME_RANGE = "INQUIRY_BY_TIME_RANGE",
        GET_SERVER_INFORMATION = "GET_SERVER_INFORMATION",
        GET_SERVICE_STUFF_LIST = "GET_SERVICE_STUFF_LIST",
        GET_ECONOMIC_CODE_INFORMATION = "GET_ECONOMIC_CODE_INFORMATION"
    }
    type APIType = 'self-tsp' | 'tsp';
    interface PublicKey {
        key: string;
        id: string;
        algorithm: string;
        purpose: number;
    }
    interface PacketModel<T> {
        uid: string;
        packetType: string;
        retry: boolean;
        data: T;
        encryptionKeyId: string;
        symmetricKey: string;
        iv: string;
        fiscalId: string;
        dataSignature: string;
    }
    interface RequestBody<T> {
        time?: number;
        packet: PacketModel<T>;
        signature?: string;
    }
    interface RequestBodyArray<T = SendInvoiceData> {
        time?: number;
        packets: PacketModel<T>[];
        signature?: string;
    }
    interface TaxApiResponse<T> {
        signature: null;
        signatureKeyId: null;
        timestamp: number;
        result: T;
    }
    interface GetTokenData {
        username: string;
    }
    interface InquireByRangeData {
        startDate: any;
        endDate: any;
    }
    interface InquireByUIDData {
        uid: string;
        fiscalId: string;
    }
    type SendInvoiceData = string | Invoice;
    interface ResponseResult<T> {
        uid: null;
        packetType: string;
        data: T;
        encryptionKeyId: null;
        symmetricKey: null;
        iv: null;
    }
    interface GetTokenResult {
        token: string;
        expiresIn: number;
    }
    interface FiscalIdResult {
        nameTrade: string;
        fiscalStatus: string;
        saleThreshold: number;
        economicCode: string;
    }
    interface InquireResult {
        referenceNumber: string;
        uid: string;
        status: string;
        data: {
            confirmationReferenceId: string;
            taxResult: string;
        } | {
            error: {
                code: string;
                message: string;
            }[];
            warning: {
                code: string;
                message: string;
            }[];
            success: boolean;
        };
        packetType: string;
        fiscalId: string;
    }
    interface ServerInformationResult {
        serverTime: number;
        publicKeys: PublicKey[];
    }
    type SendInvoiceResult = {
        "uid": string;
        "referenceNumber": string;
        "errorCode": string | null;
        "errorDetail": string | null;
    }[];
    type GetTokenBody = RequestBody<GetTokenData>;
    type GetTokenResponse = TaxApiResponse<ResponseResult<GetTokenResult>>;
    type GetServerInformationBody = RequestBody<null>;
    type GetServerInformationResponse = TaxApiResponse<ResponseResult<ServerInformationResult>>;
    type GetFiscalIdBody = RequestBody<string>;
    type GetFiscalIdResponse = TaxApiResponse<ResponseResult<FiscalIdResult>>;
    type SendInvoiceBody = RequestBody<SendInvoiceData>;
    type SendInvoiceResponse = TaxApiResponse<SendInvoiceResult>;
    type InquireByUIDBody = RequestBody<InquireByUIDData[]>;
    type InquireByRangeBody = RequestBody<InquireByRangeData>;
    type InquireResponse = TaxApiResponse<ResponseResult<InquireResult[]>>;
}
//# sourceMappingURL=version1.d.ts.map