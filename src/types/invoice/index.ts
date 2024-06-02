import { InvoiceBody } from "./body";
import { InvoiceHeader } from "./header";
import { InvoicePayment } from "./payment";

export interface Invoice {
    header: Partial<InvoiceHeader>
    body: Partial<InvoiceBody>[]
    payments: Partial<InvoicePayment>[]
}