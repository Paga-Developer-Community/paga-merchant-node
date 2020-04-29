'use strict';
const PagaMerchantClient = require('../PagaMerchantClient')
const expect  = require('chai').expect;
 
const pagaMerchant = PagaMerchantClient.Builder()
.setPrincipal("98F32858-CC3B-42D4-95A3-742110A8D405")
.setCredential("rR9@f8u@bBES")
.setApiKey("d98076e2d14c4045970edc466faa2ec8cc47c9b89b654001b5e4db27179a0b9559bee92b78034c558a9d24aca2fa4135db8938a3f4a74b7da1157dee68e15213")
.setIsTest(true)
.build();

describe("#MerchantFunctionsTest", function() {

  it('Should getTransactionDetails', function (done) {
      pagaMerchant.getTransactionDetails('BP-C_20181019145215772_1486529_CM3JP').then(function(body){
        expect(body.data).to.have.property('dateTimeUTC');
        expect(body.data).to.have.property('errorMessage');
        expect(body.data).to.have.property('channel');
        expect(body.data).to.have.property('foreignCurrency');
        expect(body.data).to.have.property('foreignCurrencyAmount');
        expect(body.data).to.have.property('transactionId');
        expect(body.data).to.have.property('responseCode');
        expect(body.data).to.have.property('byAgent');
        expect(body.data).to.have.property('transactionType');
        expect(body.data).to.have.property('referenceNumber');
        expect(body.data).to.have.property('exchangeRate');
        expect(body.data).to.have.property('currency');
        expect(body.data).to.have.property('merchantReference');
        expect(body.data).to.have.property('status');
      done();
  })
})

it('Should getTransactionDetailsByInvoiceNumber', function (done) {
  pagaMerchant.getTransactionDetailsByInvoiceNumber('').then(function(body){
        expect(body.data).to.have.property('dateTimeUTC');
        expect(body.data).to.have.property('errorMessage');
        expect(body.data).to.have.property('channel');
        expect(body.data).to.have.property('foreignCurrencyAmount');
        expect(body.data).to.have.property('transactionId');
        expect(body.data).to.have.property('responseCode');
        expect(body.data).to.have.property('byAgent');
        expect(body.data).to.have.property('transactionType');
        expect(body.data).to.have.property('referenceNumber');
        expect(body.data).to.have.property('exchangeRate');
        expect(body.data).to.have.property('invoiceNumber');
        expect(body.data).to.have.property('currency');
        expect(body.data).to.have.property('merchantReference');
        expect(body.data).to.have.property('status');
      done();
  })
})

it('Should getProcessDetails', function (done) {
  pagaMerchant.getProcessDetails('1822231066919037').then(function(body){
        expect(body.data).to.have.property('amount');
        expect(body.data).to.have.property('dateTimeUTC');
        expect(body.data).to.have.property('processCode');
        expect(body.data).to.have.property('errorMessage');
        expect(body.data).to.have.property('processType');
        expect(body.data).to.have.property('customerAccount');
        expect(body.data).to.have.property('responseCode');
        expect(body.data).to.have.property('status');
      done();
  })
})

it('Should get reconciliationReport', function (done) {
  pagaMerchant.reconciliationReport('2019-01-16', '2019-05-17').then(function(body){
        expect(body.data).to.have.property('responseCode');
        expect(body.data).to.have.property('errorMessage');
        expect(body.data).to.have.property('reconciliationItems');
      done();
  })
})

it('Should getForeignExchangeRate', function (done) {
  pagaMerchant.getForeignExchangeRate('NGN', 'USD').then(function(body){
        expect(body.data).to.have.property('sellRate');
        expect(body.data).to.have.property('errorMessage');
        expect(body.data).to.have.property('foreignCurrency');
        expect(body.data).to.have.property('baseCurrency');
        expect(body.data).to.have.property('responseCode');
        expect(body.data).to.have.property('buyRate');
      done();
  })
})

it('Should get refundBillPay', function (done) {
  pagaMerchant.refundBillPay('XTF-P_20170209091737422_1380026_13QX1', false, true, '1500', 'NGN', 'reason', '08011111111').then(function(body){
        expect(body).to.have.property('errorCode')
      done();
  })
})

});
