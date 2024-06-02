import { Invoice } from "../types/invoice";
import { Version1 } from "../types/version1";
export declare class TaxApiV1 {
    private pemFile;
    private fiscalId;
    private economicCode;
    private type;
    private base;
    private pem;
    constructor(pemFile: string, fiscalId: string, economicCode: string, type?: Version1.APIType, sandbox?: boolean);
    getToken: () => Promise<Version1.GetTokenResponse>;
    getServerInformation: () => Promise<Version1.GetServerInformationResponse>;
    inquiryEconomicCode: () => Promise<{
        nameTrade: string;
        taxpayerStatus: string;
        nationalId: string;
    }>;
    getFiscalId: (token: string) => Promise<Version1.GetFiscalIdResponse>;
    inquireByRange: (token: string, start: number, end: number) => Promise<Version1.InquireResponse>;
    inquireByUID: (token: string, UIDs: string[]) => Promise<Version1.InquireResponse>;
    sendInvoiceNormal: (props: {
        invoices: {
            [uid: string]: Invoice;
        };
        token: string;
        publicKey: Version1.PublicKey;
        retry: string[];
    }) => Promise<Version1.SendInvoiceResponse>;
}
//# sourceMappingURL=index.d.ts.map