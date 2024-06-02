import { InvoiceBody } from "./types/invoice/body";
import { InvoiceHeader } from "./types/invoice/header";
import { InvoicePayment } from "./types/invoice/payment";
export * from "./v1/index";
export * from "./types/version1";
export * from "./v1/utils/taxid";
export type TaxApi_v1_InvoiceHeader = Partial<InvoiceHeader>;
export type TaxApi_v1_InvoiceBody = Partial<InvoiceBody>[];
export type TaxApi_v1_InvoicePayment = Partial<InvoicePayment>[];
//# sourceMappingURL=index.d.ts.map