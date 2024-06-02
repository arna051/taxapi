
  # Iranian Tax Api (Version 1 only)


[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)  

## INstall:
~~~bash
npm i taxapi
~~~

or use yarn:

~~~bash
yarn add taxapi
~~~

# Table of contents  
1. [Introduction](#introduction)  
2. [What you need?](#what-you-need)  
3. [Get Token](#get-token)  
4. [Get Server Information](#get-server-information)  
5. [Send Invoices](#send-invoices)  
6. [Inquire Invoices](#inquire-invoices)  
7. [Inquire Client Economic Code](#inquire-client-economic-code)  
8. [Inquire Fiscal ID](#inquire-fiscal-id)  


## Introduction

you need to read the full documentry of the "Modian" version 1 tax Api PDF. the pdf 
is available from [intamedia.ir](https://www.intamedia.ir/The-regulation-of-store-terminals)


### this package is only for Nodejs not Browser.
## What you need?

1. Fiscal ID
2. Private key
3. Economic ID

`also make sure that you have access to tax api from iranian ip address`

## Get Token

~~~typescript  
  import { TaxApiV1 } from "./v1";

  const api = new TaxApiV1(
    '[pem file path or content]', 
    '[fiscal id]', 
    '[economic id]', 
    'self-tsp'
  );

  const tokenResponse = await api.getToken();

  const {expiresIn, token} = tokenResponse.result.data
~~~ 

## Get Server Information

~~~typescript
  import { TaxApiV1 } from "./v1";

  const api = new TaxApiV1('[pem file path or content]', '[fiscal id]', '[economic id]', 'self-tsp');

  const serverInformation = await api.getServerInformation();

  const {publicKeys} = serverInformation.result.data;

  const publicKey = publicKeys[0]
~~~

## Send Invoices

~~~typescript
import { TaxApiV1 } from "./v1";

const api = new TaxApiV1('[pem file path or content]', '[fiscal id]', '[economic id]', 'self-tsp');

const response = await api.sendInvoiceNormal({
    invoices: {
        '[invoice-1-uid]': { ...},
        '[invoice-2-uid]': { ...},
        '[invoice-3-uid]': { ...},
        ...
    },
    publicKey,
    token
    retry: ['uid-of-retrying-invoice', ...],
});

response.result.forEach(invoiceResult => {
    const uid = invoiceResult.uid;

    // update invocie properties by uid
})
~~~

## Inquire Invoices

~~~typescript
import { TaxApiV1 } from "./v1";

const api = new TaxApiV1('[pem file path or content]', '[fiscal id]', '[economic id]', 'self-tsp');

const response = await api.inquireByUID(token, ['uid-1', 'uid-2', ...]);

response.result.data.forEach(item => {
    const status = item.status // SUCCESS | FAILED | PENDING | IN_PROGRESS
    if(status === "FAILED") {
        const errors: {code: string, message: string}[] = item.data.error
    }
    const uid = item.uid;
    //update invoices in database
})
~~~


## Inquire Client Economic Code

~~~typescript
import { TaxApiV1 } from "./v1";

const api = new TaxApiV1('[pem file path or content]', '[fiscal id]', '[economic id]', 'self-tsp');

// no token needed
const response = await api.inquiryEconomicCode()

const {nameTrade, nationalId, taxpayerStatus} = response
~~~


## Inquire Fiscal ID

~~~typescript
import { TaxApiV1 } from "./v1";

const api = new TaxApiV1('[pem file path or content]', '[fiscal id]', '[economic id]', 'self-tsp');

const response = await api.getFiscalId(token)

const {economicCode, fiscalStatus, nameTrade, saleThreshold} = response.result.data
~~~


### Need Help? or want to donate?
call us if you want to donate or need help:
~~~
09038719255
~~~


## License  

[MIT](https://choosealicense.com/licenses/mit/)
