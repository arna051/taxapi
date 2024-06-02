"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxApiV1 = void 0;
const get_fiscalId_1 = require("./api/get-fiscalId");
const get_server_information_1 = require("./api/get-server-information");
const get_token_1 = require("./api/get-token");
const inquire_by_range_1 = require("./api/inquire-by-range");
const inquire_by_uid_1 = require("./api/inquire-by-uid");
const inquiry_economic_code_1 = require("./api/inquiry-economic-code");
const send_invoice_1 = require("./api/send-invoice");
const base_1 = require("./constants/base");
const pem_1 = require("./utils/pem");
class TaxApiV1 {
    constructor(pemFile, fiscalId, economicCode, type = 'self-tsp', sandbox) {
        this.pemFile = pemFile;
        this.fiscalId = fiscalId;
        this.economicCode = economicCode;
        this.type = type;
        this.getToken = () => (0, get_token_1.getToken)(this.base, this.fiscalId, this.pem);
        this.getServerInformation = () => (0, get_server_information_1.getServerInformation)(this.base);
        this.inquiryEconomicCode = () => (0, inquiry_economic_code_1.inquiryEconomicCode)(this.base, this.economicCode);
        this.getFiscalId = (token) => (0, get_fiscalId_1.getFiscalId)(this.base, this.fiscalId, token, this.pem);
        this.inquireByRange = (token, start, end) => (0, inquire_by_range_1.inquireByRange)(this.base, this.fiscalId, token, this.pem, start, end);
        this.inquireByUID = (token, UIDs) => (0, inquire_by_uid_1.inquireByUID)(this.base, this.fiscalId, token, this.pem, UIDs);
        this.sendInvoiceNormal = (props) => (0, send_invoice_1.SendInvoice)(this.type, props.invoices, props.token, props.publicKey, this.fiscalId, this.pem, props.retry);
        this.base = (sandbox ? base_1.BASE_SANDBOX_V1 : base_1.BASE_V1).replace("__TYPE__", this.type);
        this.pem = new pem_1.PemReader(this.pemFile);
    }
}
exports.TaxApiV1 = TaxApiV1;
//# sourceMappingURL=index.js.map