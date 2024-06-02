export interface InvoiceBody {
    /**
     *
     * شناسه کالا/خدمت
     * __ 13
     */
    sstid: string;
    /**
     *
     * شرح کالا/خدمت
     * __ x
     */
    sstt: string;
    /**
     *
     * واحد اندازهگیری
     * __ max 8
     */
    mu: string;
    /**
     *
     * تعداد/مقدار
     * __ x
     */
    am: number;
    /**
     *
     * وزن خالص
     * __ x
     */
    nw: number;
    /**
     *
     * مبلغ واحد
     * __ x
     */
    fee: number;
    /**
     *
     * میزان ارز
     * __ x
     */
    cfee: number;
    /**
     *
     * نوع ارز
     * __ x
     */
    cut: string;
    /**
     *
     * نرخ برابری ارز با ریال
     * __ x
     */
    exr: number;
    /**
     *
     * ارزش ریالی کالا
     * __ x
     */
    ssrv: number;
    /**
     *
     * ارزش ارزی کالا
     * __ x
     */
    sscv: number;
    /**
     *
     * مبلغ قبل از تخفیف
     * __ x
     */
    prdis: number;
    /**
     *
     * مبلغ تخفیف
     * __ x
     */
    dis: number;
    /**
     *
     * مبلغ بعد از تخفیف
     * __ x
     */
    adis: number;
    /**
     *
     * نرخ مالیات بر ارزش افزوده
     * __ x
     */
    vra: number;
    /**
     *
     * مبلغ مالیات بر ارزش افزوده
     * __ x
     */
    vam: number;
    /**
     *
     * موضوع سایرمالیات و عوارض
     * __ x
     */
    odt: string;
    /**
     *
     * نرخ سایرمالیات و عوارض
     * __ x
     */
    odr: number;
    /**
     *
     * مبلغ سایرمالیات و عوارض
     * __ x
     */
    odam: number;
    /**
     *
     * موضوع سایر وجوه قانونی
     * __ x
     */
    olt: string;
    /**
     *
     * نرخ سایر وجوه قانونی
     * __ x
     */
    olr: number;
    /**
     *
     * مبلغ سایر وجوه قانونی
     * __ x
     */
    olam: number;
    /**
     *
     * اجرت ساخت
     * __ x
     */
    consfee: number;
    /**
     *
     * سود فروشنده
     * __ x
     */
    spro: number;
    /**
     *
     * حق العمل
     * __ x
     */
    bros: number;
    /**
     *
     * جمع كل اجرت، حق- العمل و سود
     * __ x
     */
    tcpbs: number;
    /**
     *
     * سهم نقدی از پرداخت
     * __ x
     */
    cop: number;
    /**
     *
     * سهم ارزش افزوده از پرداخت
     * __ x
     */
    vop: number;
    /**
     *
     * شناسه یکتای ثبت قرارداد حق العمل کاری
     * __ x
     */
    bsrn: string;
    /**
     *
     * مبلغ كل کالا/خدمت
     * __ x
     */
    tsstam: number;
}
//# sourceMappingURL=body.d.ts.map