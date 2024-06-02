import { Invoice } from "../types/invoice";
import { Version1 } from "../types/version1";
import { getFiscalId } from "./api/get-fiscalId";
import { getServerInformation } from "./api/get-server-information";
import { getToken } from "./api/get-token";
import { inquireByRange } from "./api/inquire-by-range";
import { inquireByUID } from "./api/inquire-by-uid";
import { inquiryEconomicCode } from "./api/inquiry-economic-code";
import { SendInvoice } from "./api/send-invoice";
import { BASE_SANDBOX_V1, BASE_V1 } from "./constants/base";
import { PemReader } from "./utils/pem";

export class TaxApiV1 {
    private base: string
    private pem: PemReader
    constructor(
        private pemFile: string,
        private fiscalId: string,
        private economicCode: string,
        private type: Version1.APIType = 'self-tsp',
        sandbox?: boolean
    ) {
        this.base = (sandbox ? BASE_SANDBOX_V1 : BASE_V1).replace("__TYPE__", this.type);
        this.pem = new PemReader(this.pemFile);
    }

    getToken = () => getToken(this.base, this.fiscalId, this.pem);
    getServerInformation = () => getServerInformation(this.base);
    inquiryEconomicCode = () => inquiryEconomicCode(this.base, this.economicCode)
    getFiscalId = (token: string) => getFiscalId(this.base, this.fiscalId, token, this.pem)
    inquireByRange = (token: string, start: number, end: number) => inquireByRange(this.base, this.fiscalId, token, this.pem, start, end)
    inquireByUID = (token: string, UIDs: string[]) => inquireByUID(this.base, this.fiscalId, token, this.pem, UIDs)
    sendInvoiceNormal = (
        props: {
            invoices: {
                [uid: string]: Invoice
            },
            token: string,
            publicKey: Version1.PublicKey,
            retry: string[]
        }
    ) => SendInvoice(
        this.type,
        props.invoices,
        props.token,
        props.publicKey,
        this.fiscalId,
        this.pem,
        props.retry
    )

}
