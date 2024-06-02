import { Invoice } from "./invoice";

export namespace Version1 {
    export type TaxApiInvoice = Invoice
    export interface Dictionary<T> {
        [key: string]: T;
    }
    export type InvoiceType = 1 | 2 | 3;
    export type PaymentType = 1 | 2 | 3;
    export type InvoicePattern = 1 | 2 | 3 | 4 | 5 | 6 | 7;
    export type InvoiceTopic = 1 | 2 | 3 | 4;
    export type CustomerType = 1 | 2 | 3 | 4 | 5;
    export type FlightType = 1 | 2;
    export type TaxPaymentByCustomer = 1 | 2;

    export type anyObject = {
        [key: string]: any
    }
    export type Header = {
        requestTraceId: string
        timestamp: string,
        Authorization?: string
    }
    export type Body = {
        packet?: anyObject,
    } & anyObject
    export enum Purpose {
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
    export type APIType = 'self-tsp' | 'tsp'
    export interface PublicKey {
        key: string;
        id: string;
        algorithm: string;
        purpose: number;
    }

    // ? Axios Interfaces

    export interface PacketModel<T> {
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

    export interface RequestBody<T> {
        time?: number;
        packet: PacketModel<T>;
        signature?: string;
    }
    export interface RequestBodyArray<T = SendInvoiceData> {
        time?: number;
        packets: PacketModel<T>[];
        signature?: string;
    }
    export interface TaxApiResponse<T> {
        signature: null;
        signatureKeyId: null;
        timestamp: number;
        result: T;
    }

    // ? End Axios Interfaces



    // * Axios Body Interfaces
    export interface GetTokenData {
        username: string;
    }
    export interface InquireByRangeData {
        startDate: any;
        endDate: any;
    }
    export interface InquireByUIDData {
        uid: string;
        fiscalId: string;
    }
    export type SendInvoiceData = string | Invoice
    // * End Axios Body Interfaces


    // ? TaxApi Response Result Field

    export interface ResponseResult<T> {
        uid: null;
        packetType: string;
        data: T;
        encryptionKeyId: null;
        symmetricKey: null;
        iv: null;
    }

    export interface GetTokenResult {
        token: string;
        expiresIn: number;
    }
    export interface FiscalIdResult {
        nameTrade: string;
        fiscalStatus: string;
        saleThreshold: number;
        economicCode: string;
    };
    export interface InquireResult {
        referenceNumber: string;
        uid: string;
        status: string;
        data: {
            confirmationReferenceId: string;
            taxResult: string;
        } | {
            error: {
                code: string,
                message: string
            }[],
            warning: {
                code: string,
                message: string
            }[],
            success: boolean
        };
        packetType: string;
        fiscalId: string;
    }

    export interface ServerInformationResult {
        serverTime: number;
        publicKeys: PublicKey[];
    }

    export type SendInvoiceResult = {
        "uid": string,
        "referenceNumber": string,
        "errorCode": string | null,
        "errorDetail": string | null
    }[]

    // ? End TaxApi Response Result Field


    // ! Combined Request Interfaces
    export type GetTokenBody = RequestBody<GetTokenData>;
    export type GetTokenResponse = TaxApiResponse<ResponseResult<GetTokenResult>>

    export type GetServerInformationBody = RequestBody<null>;
    export type GetServerInformationResponse = TaxApiResponse<ResponseResult<ServerInformationResult>>;

    export type GetFiscalIdBody = RequestBody<string>;
    export type GetFiscalIdResponse = TaxApiResponse<ResponseResult<FiscalIdResult>>;


    export type SendInvoiceBody = RequestBody<SendInvoiceData>;
    export type SendInvoiceResponse = TaxApiResponse<SendInvoiceResult>;

    export type InquireByUIDBody = RequestBody<InquireByUIDData[]>;
    export type InquireByRangeBody = RequestBody<InquireByRangeData>;
    export type InquireResponse = TaxApiResponse<ResponseResult<InquireResult[]>>;
}