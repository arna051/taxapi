import { Invoice } from "../../types/invoice";
import { Version1 } from "../../types/version1";
import { PemReader } from "../utils/pem";
export declare const SendInvoice: (type: Version1.APIType, invoices: {
    [uid: string]: Invoice;
}, token: string, publicKey: Version1.PublicKey, username: string, pem: PemReader, retry: string[]) => Promise<Version1.SendInvoiceResponse>;
//# sourceMappingURL=send-invoice.d.ts.map