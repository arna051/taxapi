import { Version1 } from "../version1";
export interface InvoiceHeader {
    /**
     *
     * شماره منحصر به فرد مالیاتی
     * __ 22
     */
    taxid: string;
    /**
     *
     * تاریخ و زمان صدور صورتحساب
     * __ 14
     */
    indatim: number;
    /**
     *
     * تاریخ و زمان ایجاد صورتحساب
     * __ 14
     */
    Indati2m: number;
    /**
     *
     * نوع صورتحساب
     * __ 1
     */
    inty: Version1.InvoiceType;
    /**
     *
     * سریال صورتحساب
     * __ 10
     */
    inno: string;
    /**
     *
     * شماره منحصر به فرد مالیاتی صورتحساب مرجع
     * __ 22
     */
    irtaxid: string;
    /**
     *
     * الگوی صورتحساب
     * __ 1
     */
    inp: Version1.InvoicePattern;
    /**
     *
     * موضوع صورتحساب
     * __ 1
     */
    ins: Version1.InvoiceTopic;
    /**
     *
     * شماره اقتصادی فروشنده
     * __ 10
     */
    tins: string;
    /**
     *
     * نوع شخص خریدار
     * __ 1
     */
    tob: Version1.CustomerType;
    /**
     *
     * شماره/شناسه ملی/شناسه مشاركت مدنی/كد فراگیر خریدار
     */
    bid: string;
    /**
     *
     * شماره اقتصادی خریدار
     * __ 10
     */
    tinb: string;
    /**
     *
     * كد شعبه فروشنده
     * __ x
     */
    sbc: number;
    /**
     *
     * كد پستی خریدار
     * __ 10
     */
    bpc: string;
    /**
     *
     * كد شعبه خریدار
     * __ x
     */
    bbc: number;
    /**
     *
     * نوع پرواز
     * __ 1
     */
    ft: Version1.FlightType;
    /**
     *
     * شماره گذرنامه خریدار
     * __ x
     */
    bpn: string;
    /**
     *
     * شماره پروانه گمركی فروشنده
     * __ x
     */
    scln: string;
    /**
     *
     * كد گمرک محل اظهار
     * __ x
     */
    scc: string;
    /**
     *
     * شماره کوتاژ اظهارنامه گمرکی
     * __ x
     */
    cdcn: string;
    /**
     *
     * تاریخ کوتاژ اظهارنامه گمرکی
     * __ x
     */
    cdcd: string;
    /**
     *
     * شناسه یکتای ثبت قرارداد فروشنده
     * __ x
     */
    crn: string;
    /**
     *
     * شماره اشتراک/ شناسه بهره بردار قبض
     * __ x
     */
    billid: string;
    /**
     *
     * مجموع مبلغ قبل از كسر تخفیف
     * __ x
     */
    tprdis: number;
    /**
     *
     * مجموع تخفیفات
     * __ x
     */
    tdis: number;
    /**
     *
     * مجموع مبلغ پس از كسر تخفیف
     * __ x
     */
    tadis: number;
    /**
     *
     * مجموع مالیات بر ارزش افزوده
     * __ x
     */
    tvam: number;
    /**
     *
     * مجموع سایر مالیات، عوارض و وجوه قانونی
     * __ x
     */
    todam: number;
    /**
     *
     * مجموع صورتحساب
     * __ x
     */
    tbill: number;
    /**
     *
     * مجموع وزن خالص
     * __ x
     */
    tonw: number;
    /**
     *
     * مجموع ارزش ریالی
     * __ x
     */
    torv: number;
    /**
     *
     * مجموع ارزش ارزی
     * __ x
     */
    tocv: number;
    /**
     *
     * روش تسویه
     * __ 1
     */
    setm: Version1.PaymentType;
    /**
     *
     * مبلغ پرداختی نقدی
     * __ x
     */
    cap: number;
    /**
     *
     *مبلغ پرداختی نسیه
     * __ x
     */
    insp: number;
    /**
     *
     * مجموع سهم مالیات بر ارزش افزوده از پرداخت
     * __ x
     */
    tvop: number;
    /**
     *
     * مالیات موضوع ماده 17
     * __ x
     */
    Tax17: number;
}
//# sourceMappingURL=header.d.ts.map